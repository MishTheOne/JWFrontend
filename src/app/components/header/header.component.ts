import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import {SharedDataService} from '../../services/shared-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService)
  router = inject(Router);
  cookieService = inject(CookieService);
  sharedDataService = inject(SharedDataService);

  logout(){
    const cookieName = 'user';
const cookieValue = this.cookieService.get(cookieName);

if (cookieValue) {
  // The cookie exists, proceed with deletion
  this.cookieService.delete(cookieName);
  console.log('Cookie deleted successfully.');
} else {
  console.log('Cookie does not exist.', cookieValue);
}

    alert('Logged out successfully');
    this.sharedDataService.updateSharedVariable(false);
    this.router.navigate(['home']);
  }
}
