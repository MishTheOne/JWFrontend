import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SharedDataService } from '../../services/shared-data.service';
// import {HomeComponent} from '../../pages/home/home.component';

@Component({
  selector: 'app-show-tasks',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './show-tasks.component.html',
  styleUrl: './show-tasks.component.scss'
})
export class ShowTasksComponent{
  sharedDataService = inject(SharedDataService);
  // homeComponent = inject(HomeComponent);
  m=0;
  atBottom = false;
  mapBtn = 'Unassigned';
  tab1 : boolean = true;
  tab2 : boolean = false;
  tab3 : boolean = false;

  tabOne(){
    this.tab1 = true;
    this.tab2 = this.tab3 = false;
    console.log(this.tab1);
  }
  tabTwo(){
    this.tab2 = true;
    this.tab1 = this.tab3 = false;
  }
  tabThree(){
    this.tab3 = true;
    this.tab2 = this.tab1 = false;
  }

  enterMap(){
    this.mapBtn = 'SHOW ON MAP';
  }

  leaveMap(){
    this.mapBtn = 'Unassigned';
  }

  checkthis(e: Event) {
    if ((e.target as HTMLElement).scrollHeight < (e.target as HTMLElement).scrollTop + (e.target as HTMLElement).offsetHeight) {
      console.log('bottom');
      this.sharedDataService.refreshTaskPane();
    } 
  }

  showDeliveriesPane(index:number){
    this.sharedDataService.updateClickedTask(index);
    this.sharedDataService.loading = true;
    this.sharedDataService.updateShowDeliveries(true);
    this.sharedDataService.updateShowTasks(false);
  }

  closeShowTasks(){
    this.sharedDataService.updateShowTasks(false);
  }
}
