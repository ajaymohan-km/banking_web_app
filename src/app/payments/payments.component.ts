import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionsService } from '../services/transactions.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  accounts: any[] = [];
  transactions: any[] = [];
  searchForm: FormGroup;
  loading = false;

  constructor(
    private transactionsService: TransactionsService,
    private accountsService: AccountsService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      accountId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  viewTransactions() {
    if (this.searchForm.valid) {
      this.loading = true;
      const accountId = this.searchForm.get('accountId')?.value;
      
      this.transactionsService.getAccountTransactions(accountId).subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
        }
      });
    }
  }
}
