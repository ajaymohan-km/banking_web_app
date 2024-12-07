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
  dashboardData: DashboardData | null = null;
  accounts: Account[] = [];
  accountBalance = 0;
  recentTransactions: Transaction[] = [];
  activeLoans: Loan[] = [];
  username: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.username = localStorage.getItem('username') || '';
  }

  private loadDashboardData() {
    this.dashboardService.getCustomerDashboard().subscribe(data => {
      this.dashboardData = data;
      this.accountBalance = data.totalBalance;
      this.accounts = data.accounts;
      this.recentTransactions = data.recentTransactions;
      this.activeLoans = data.activeLoans;
    });
  }

  getTransactionIcon(amount: number): string {
    return amount > 0 ? 'fas fa-arrow-up text-success' : 'fas fa-arrow-down text-danger';
  }
}


interface Account {
  accountId: string;
  accountNumber: string;
  accountType: string;
  currentBalance: number;
  active: boolean;
}

interface Transaction {
  transactionId: string;
  amount: number;
  timestamp: string;
}

interface Loan {
  loanId: string;
  loanType: string | null;
  principalAmount: number;
  remainingAmount: number;
  interestRate: number;
  status: string;
  startDate: string;
}

interface DashboardData {
  totalBalance: number;
  accounts: Account[];
  recentTransactions: Transaction[];
  activeLoans: Loan[];
  notifications: any[];
}
