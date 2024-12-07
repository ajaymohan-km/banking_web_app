import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {};
  users: any[] = [];
  showBankerModal = false;
  bankerForm: FormGroup;
  loading = false;
  currentDate: Date = new Date();

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.bankerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      employeeId: ['', Validators.required],
      branch: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadDashboardData();
    this.loadUsers();
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  loadDashboardData() {
    this.adminService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully');
          this.loadUsers();
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Failed to delete user');
        }
      });
    }
  }

  openBankerModal() {
    this.showBankerModal = true;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  closeBankerModal() {
    this.showBankerModal = false;
    this.bankerForm.reset();
  }

  createBanker() {
    if (this.bankerForm.valid) {
      this.loading = true;
      this.adminService.createBanker(this.bankerForm.value).subscribe({
        next: () => {
          this.toastr.success('Banker created successfully');
          this.loading = false;
          this.closeBankerModal();
          this.loadUsers();
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Failed to create banker');
          this.loading = false;
        }
      });
    }
  }
}
