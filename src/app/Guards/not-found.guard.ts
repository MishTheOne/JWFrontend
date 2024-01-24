import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise, take } from 'rxjs';

export const notFoundGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const location = inject(Location);
  // router.events.pipe(filter(event=>event instanceof NavigationEnd), pairwise())
  // .subscribe((event: any)=>{
  // })
  router.navigate(['home']);
  // console.log(location);
  return true;
};
