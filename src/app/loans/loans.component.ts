import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoansService } from '../services/loans.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  loans: any[] = [];
  loading = false;
  showLoanModal = false;
  loanForm: FormGroup;

  constructor(
    private loansService: LoansService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loanForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      purpose: ['', Validators.required],
      termInMonths: ['', [Validators.required, Validators.min(1)]],
      employmentStatus: ['', Validators.required],
      monthlyIncome: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.loading = true;
    this.loansService.getMyLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  openLoanModal() {
    this.showLoanModal = true;
  }

  closeLoanModal() {
    this.showLoanModal = false;
    this.loanForm.reset();
  }

  submitLoanApplication() {
    if (this.loanForm.valid) {
      this.loading = true;
      this.loansService.applyLoan(this.loanForm.value).subscribe({
        next: () => {
          this.toastr.success('Loan application submitted successfully!');
          this.loading = false;
          this.closeLoanModal();
          this.loadLoans();
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Failed to submit loan application');
          this.loading = false;
        }
      });
    }
  }
}