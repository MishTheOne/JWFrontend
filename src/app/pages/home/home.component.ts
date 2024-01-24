import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../../components/header/header.component';
import { SharedDataService } from '../../services/shared-data.service';
import {CreateTaskComponent} from '../../components/create-task/create-task.component';
import { CommonModule } from '@angular/common';
import {ShowTasksComponent} from '../../components/show-tasks/show-tasks.component';
import {TaskService} from '../../services/task.service';
import { ShowDeliveriesComponent } from '../../components/show-deliveries/show-deliveries.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CreateTaskComponent, CommonModule, ShowTasksComponent, ShowDeliveriesComponent, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent implements OnInit, AfterViewInit{
  cookieService = inject(CookieService);
  sharedDataService = inject(SharedDataService);
  taskService = inject(TaskService);

  ngOnInit(){
    this.getCookie(); 
  }

  ngAfterViewInit(){
    this.sharedDataService.loading = true;
  }

  getCookie = async ()=>{
    const cookieName = 'user';
    const cookieValue = this.cookieService.get(cookieName);
    // debugger
    console.log('cook',cookieValue);
    if(cookieValue){
      this.sharedDataService.updateSharedVariable(true);
    }
    else{
      this.sharedDataService.updateSharedVariable(false);
    }
    console.log('jj',this.sharedDataService.sharedVariable);
    // this.sharedDataService.loading = true;
    this.sharedDataService.updateShowTasks(true);  
    this.sharedDataService.refreshTaskPane();
  }

  taskPane(){
    this.sharedDataService.updateShowTasks(true);
    console.log(this.sharedDataService.sharedVariable);
  }
}
