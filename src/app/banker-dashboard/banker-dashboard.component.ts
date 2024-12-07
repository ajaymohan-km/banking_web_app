import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankerService } from '../services/banker.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-banker-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banker-dashboard.component.html',
  styleUrls: ['./banker-dashboard.component.css']
})
export class BankerDashboardComponent implements OnInit {
  dashboardStats: any = {};
  pendingLoans: any[] = [];
  currentDate: Date = new Date();

  constructor(
    private bankerService: BankerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
    this.loadPendingLoans();
    
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  loadDashboardData() {
    this.bankerService.getDashboardStats().subscribe(data => {
      this.dashboardStats = data;
    });
  }

  loadPendingLoans() {
    this.bankerService.getPendingLoans().subscribe(loans => {
      this.pendingLoans = loans;
    });
  }

  approveLoan(loanId: string) {
    this.bankerService.approveLoan(loanId).subscribe({
      next: () => {
        this.toastr.success('Loan approved successfully');
        this.loadDashboardData();
        this.loadPendingLoans();
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to approve loan');
      }
    });
  }

  rejectLoan(loanId: string) {
    this.bankerService.rejectLoan(loanId).subscribe({
      next: () => {
        this.toastr.success('Loan rejected successfully');
        this.loadDashboardData();
        this.loadPendingLoans();
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Failed to reject loan');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
