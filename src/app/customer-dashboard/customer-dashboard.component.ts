import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  accountBalance = 0;
  recentTransactions: any[] = [];
  activeLoans: any[] = [];
  notifications: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.dashboardService.getCustomerDashboard().subscribe(data => {
      this.accountBalance = data.totalBalance;
      this.recentTransactions = data.recentTransactions;
      this.activeLoans = data.activeLoans;
      this.notifications = data.notifications;
    });
  }

  getTransactionIcon(type: string): string {
    const icons = {
      'default': 'fas fa-circle text-secondary'
    };
    return  icons.default;
  }
}