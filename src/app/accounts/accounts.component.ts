import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  showTransferModal = false;
  transferForm: FormGroup;
  selectedAccount: any = null;
  loading = false;
  username: string | null = null;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.transferForm = this.formBuilder.group({
      toAccountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadAccounts();
    this.username = localStorage.getItem('username') || '';
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  openTransferModal(account: any) {
    this.selectedAccount = account;
    this.showTransferModal = true;
  }

  closeTransferModal() {
    this.showTransferModal = false;
    this.selectedAccount = null;
    this.transferForm.reset();
  }

  submitTransfer() {
    if (this.transferForm.valid && this.selectedAccount) {
      this.loading = true;
      const transferData = {
        fromAccountId: this.selectedAccount.id,
        toAccountId: this.transferForm.get('toAccountId')?.value,
        amount: this.transferForm.get('amount')?.value
      };

      this.accountsService.transferMoney(transferData).subscribe({
        next: () => {
          this.loading = false;
          this.closeTransferModal();
          this.loadAccounts();
          this.toastr.success('Transfer completed successfully!', 'Success');
        },
        error: (error) => {
          this.loading = false;
          this.toastr.error(error.error?.message || 'Transfer failed', 'Error');
        }
      });
    }}

}