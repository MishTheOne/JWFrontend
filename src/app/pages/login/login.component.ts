import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit{
  fb = inject(FormBuilder);
  authService = inject(AuthService)
  router = inject(Router);
  sharedDataService = inject(SharedDataService);

  loginForm !: FormGroup

  ngOnInit(): void {
    this.sharedDataService.loading = false;
    this.loginForm = this.fb.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      password: ['',Validators.required]
    });
  }

  login(){
    // this.sharedDataService.loading = true;
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Logged in successfully!")
        this.loginForm.reset();
        this.router.navigate(['home']);
        console.log("res",res);
        let userData = '';
        if(res) userData = 'user='+JSON.stringify(res);
        userData !== '' ? this.sharedDataService.updateSharedVariable(true) : this.sharedDataService.updateSharedVariable(false);
        document.cookie = userData;
        // this.sharedDataService.loading = false;
      },
      error:(err)=>{
        console.log(err.message);
        this.loginForm.setErrors({unauthenticated:true});
        console.log('err',this.loginForm.errors?.['unauthenticated'])
      }
    })
  }
}
