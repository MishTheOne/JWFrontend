import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TaskService} from '../../services/task.service';
import { SharedDataService } from '../../services/shared-data.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AccordionModule, ButtonModule, CalendarModule, FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  providers: [FormBuilder]
})
export class CreateTaskComponent implements OnInit{
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  taskService = inject(TaskService);
  sharedDataService = inject(SharedDataService);
  deliveries !: FormGroup;
  address : string[] = [];
  time : string[] = [];
  selectedDate !: Date;
  
  ngOnInit(): void {
    this.deliveries = this.fb.group({
      tasks: this.fb.array([])
    });
    console.log('tasks ',this.tasks);
    this.addDelivery();
    console.log('add ',this.address);

  }

  get tasks(): FormArray{
    return this.deliveries.get('tasks') as FormArray;
  }

  
  addDelivery(){
    const newDelivery = this.fb.group({
      name: [''],
      email: ['',Validators.email],
      address: ['',Validators.required],
      execTime: ['',Validators.required]
    });
    
    // const address = this.deliveries.get('address');
    this.tasks?.push(newDelivery);
  }



  removeDelivery(i:number){
    this.tasks.removeAt(i);
  }

  deliveryTabHeader(index: number): string{
    console.log(this.address.length,index);
    return this.address.length>index || this.time.length>index ? `Delivery ${this.time[index]||''} ${this.address[index]||''}`: 'Delivery' ;
  }

  addressInputEvent(i:number, event:any){
    if(this.address.length == i){
      this.address.push(event.target.value);
    }
    else{
      this.address[i] = event.target.value;
    }
  }

  timeInputEvent(i: number, event:any){
    if(this.time.length == i){
      this.time.push(event);
    }
    else{
      this.time[i] = event;
    }
  }

  closeModal(){
    console.log('close');
    this.sharedDataService.updateTaskPane(false);
    console.log(this.sharedDataService.showTasksPane);
  }

  createTask(){
    this.sharedDataService.loading = true;
    this.tasks.value.forEach((task:any) => {
      task.execTime = task.execTime.toISOString().slice(0, 19).replace("T", " ");
    });
    this.taskService.createTaskService(this.tasks.value)
    .subscribe({
      next:(res)=>{
        console.log('res',res);
      }
    });
    this.sharedDataService.refreshTaskPane();
    this.sharedDataService.updateTaskPane(false);
    this.sharedDataService.loading = false;
  }
}
