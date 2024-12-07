import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'customer_dashboard',
                loadComponent: () => import('./customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent)
            },
            {
                path: 'accounts',
                loadComponent: () => import('./accounts/accounts.component').then(m => m.AccountsComponent)
            },
            {
                path: 'payments',
                loadComponent: () => import('./payments/payments.component').then(m => m.PaymentsComponent)
            },
            {
                path: 'loans',
                loadComponent: () => import('./loans/loans.component').then(m => m.LoansComponent)
            }
        ]
    },
    {
        path: 'admin-dashboard',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    
    {
        path: 'banker-dashboard',
        loadComponent: () => import('./banker-dashboard/banker-dashboard.component').then(m => m.BankerDashboardComponent)
    },
];
