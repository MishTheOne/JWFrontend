import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import {notFoundGuard} from './Guards/not-found.guard';

export const routes: Routes = [
    {path:'',redirectTo: 'home', pathMatch: 'full'},
    {path:'login', loadComponent: ()=> import('./pages/login/login.component'), canActivate: [authGuard]},
    {path:'register', loadComponent: ()=> import('./pages/register/register.component'), canActivate: [authGuard]},
    {path:'home', loadComponent: ()=> import('./pages/home/home.component')},
    {path:'**', loadComponent: ()=> import('./pages/home/home.component'), canActivate: [notFoundGuard]},
];
    