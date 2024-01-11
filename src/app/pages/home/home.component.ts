import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../../components/header/header.component';
import { SharedDataService } from '../../services/shared-data.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  cookieService = inject(CookieService);
  sharedDataService = inject(SharedDataService);
  // router = inject(Router);

  // constructor(){
  //   const cookieName = 'user';
  //   const cookieValue = this.cookieService.get(cookieName); 
  //   console.log('cook',cookieValue);
  //   if(cookieValue){
  //     this.sharedDataService.updateSharedVariable(true);
  //   }
  //   else{
  //     this.sharedDataService.updateSharedVariable(false);
  //   }
  // }
  ngOnInit(){
    const cookieName = 'user';
    const cookieValue = this.cookieService.get(cookieName); 
    console.log('cook',cookieValue);
    if(cookieValue){
      this.sharedDataService.updateSharedVariable(true);
    }
    else{
      this.sharedDataService.updateSharedVariable(false);
    }
  }
}
