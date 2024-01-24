import { Time } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  taskService = inject(TaskService);

  sharedVariable: boolean = false;
  createTaskPane: boolean = false;
  showTasksPane: boolean = true;
  showDeliveries: boolean = false;
  tasks : any = [];
  deliveries: Map<any,any> = new Map();
  clickedTask:number = 0;
  filterDate : string = new Date().toISOString().split('T')[0];
  filterEndTime : string = '19:00:00';
  filterStartTime : string = '10:00:00';
  taskOffset!:number;
  filterStartDatetime:String = `${this.filterDate}T${this.filterStartTime}.000Z`;
  filterEndDatetime:String = `${this.filterDate}T${this.filterEndTime}.000Z`;
  loading:boolean = true;
  selectedDeliveryDetails !: any;

  updateSharedVariable(newValue: boolean) {
    this.sharedVariable = newValue;
  }

  updateTaskPane(newValue: boolean){
    this.createTaskPane = newValue;
  }

  updateShowTasks(newValue: boolean){
    this.showTasksPane = newValue;
  }

  updateShowDeliveries(newValue: boolean){
    this.showDeliveries = newValue;
  }

  updateClickedTask(newValue:number){
    this.clickedTask = newValue
  }

  refreshTaskPane(){
    // this.filterStartDatetime = new Date(this.filterDate,this.filterStarTime)
    interface taskObj{
      filterEndDatetime: string;
      filterStartDatetime: string;
      taskOffset: number;
    }
    const obj: taskObj = {
      filterEndDatetime: this.filterEndDatetime.slice(0, 19).replace("T", " "),
      filterStartDatetime: this.filterStartDatetime.slice(0, 19).replace("T", " "),
      taskOffset: this.taskOffset,
    }
    this.taskService.fetchFilteredTasksService(obj).
    
    subscribe({
      next:(res:any) => {
        let i = 0;
        let prevTask !: any;
            for(let task of res[0]){
              if(prevTask === undefined || task.task_id !== prevTask.task_id){
                this.tasks.push(task);
              }
              if(this.deliveries.has(task.task_id)){
                const arr = this.deliveries.get(task.task_id) || [];
                arr.push(task);
                this.deliveries.set(task.task_id,arr);
              }
              else{
                this.deliveries.set(task.task_id,[task]);
              }
              prevTask = task;
            }
            this.loading = false;
          },
          error:(err)=>{
            this.loading = false;
            throw(err);
          }
        })
  }
}



