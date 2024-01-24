import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import {SharedDataService} from '../../services/shared-data.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { enableRipple } from '@syncfusion/ej2-base';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';

enableRipple(true);
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, NgxMaterialTimepickerModule, TimePickerModule, CalendarModule, SliderModule],
  templateUrl: './header.component.html',
  // template: '<ejs-timepicker [value]="dateValue" [min]="minDate" [max]="maxDate"></ejs-timepicker>',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {

  authService = inject(AuthService)
  router = inject(Router);
  cookieService = inject(CookieService);
  sharedDataService = inject(SharedDataService);

  // constructor(private modalService: MdbModalService) { }

  savedDate: any | null = null;
  savedStartTime: any | null = null;
  savedEndTime: any | null = null;
  selectedDate!: Date;
  selectedHour: number = 12;
  selectedMinute: number = 0;
  slider: boolean = true;

  logout(){
    const cookieName = 'user';
const cookieValue = this.cookieService.get(cookieName);

if (cookieValue) {
  // The cookie exists, proceed with deletion
  this.cookieService.delete(cookieName);
  console.log('Cookie deleted successfully.');
  alert('Logged out successfully');
  this.sharedDataService.updateSharedVariable(false);
  this.sharedDataService.updateShowTasks(false);
  this.sharedDataService.updateTaskPane(false);
  this.router.navigate(['home']);
} else {
  console.log('Cookie does not exist.', cookieValue);
}

  }

  taskModal(){
    this.sharedDataService.updateTaskPane(true);
    this.sharedDataService.updateShowDeliveries(false);
    console.log('ss',this.sharedDataService.sharedVariable);
  }

  createDateObject(dateString: string, timeString: string): String {
    const combinedDateTimeString = `${dateString}T${timeString}.000Z`;
    console.log(timeString,dateString);
    // debugger;
    const dateObject = new Date(combinedDateTimeString);
    // debugger;   
    console.log(dateObject);
    return dateObject.toISOString();
  }

  resetDates(){  
      this.sharedDataService.filterStartDatetime = this.createDateObject(this.sharedDataService.filterDate,this.sharedDataService.filterStartTime);
      this.sharedDataService.filterEndDatetime = this.createDateObject(this.sharedDataService.filterDate,this.sharedDataService.filterEndTime);
  }

  saveDate(event: any): void {
    if (event && event.target) {
      this.sharedDataService.filterDate = event.target.value;
      // console.log(this.sharedDataService.filterStartTime, this.sharedDataService.filterEndTime);
      this.resetDates();
      this.sharedDataService.refreshTaskPane();
    }
  }

  saveStartTime(event: any): void {
    if (event && event.target) {
      this.sharedDataService.filterStartTime = `${event.target.value}:00`;
      this.resetDates();
      this.sharedDataService.refreshTaskPane();
    }
  }

  saveEndTime(event: any): void {
    if (event && event.target) {
      this.sharedDataService.filterEndTime = `${event.target.value}:00`;
      this.resetDates();
      this.sharedDataService.refreshTaskPane();
    }
  }
}
