import { Component, inject, OnInit } from '@angular/core';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-front',
  standalone: true,
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss',
})
export default class FrontComponent {

  cookieService = inject(CookieService);
  sharedDataService = inject(SharedDataService);
  router = inject(Router);

  ngOnInit(){
    const cookieName = 'user';
    const cookieValue = this.cookieService.get(cookieName); 
    console.log('cook',cookieValue);
    if(cookieValue){
      this.sharedDataService.updateSharedVariable(true);
    }
    else{
      this.sharedDataService.updateSharedVariable(false);
      this.router.navigate(['home']);
    }
  }
}
