import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'login',
        loadComponent:()=>import('./login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'register',
        loadComponent:()=>import('./register/register.component').then(m=>m.RegisterComponent)
    },
    {
        path:'customer_dashboard',
        loadComponent:()=>import('./customer-dashboard/customer-dashboard.component').then(m=>m.CustomerDashboardComponent)
    }

];
