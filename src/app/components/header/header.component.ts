import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService)
  router = inject(Router);

  logout(){
    this.authService.logoutService()
    .subscribe({
      next:(res)=>{
        alert("Logged out successfully!")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
