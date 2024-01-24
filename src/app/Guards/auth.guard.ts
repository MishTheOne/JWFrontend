import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {SharedDataService} from '../services/shared-data.service';


export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const cookieValue = cookieService.get('user');
  if(cookieValue)
  router.navigate(['home']);
  return true;
};
