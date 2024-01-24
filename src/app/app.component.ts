import { Component, inject, OnInit } from '@angular/core';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {SharedDataService} from './services/shared-data.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'frontend';
  sharedDataService = inject(SharedDataService);
  
  ngOnInit(){
    console.log('app com');
    // this.sharedDataService.loading = true;
  }
}
