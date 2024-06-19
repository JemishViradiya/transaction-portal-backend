import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  startDate: string = ''; // Initialize the property
  endDate: string = ''; // Initialize the property

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {}

  loadTransactions(): void {
    this.transactionService
      .getTransactions(this.startDate, this.endDate)
      .subscribe(
        (data: any) => {
          this.transactions = data;
        },
        (error: any) => {
          console.error('Error fetching transactions', error);
        }
      );
  }
}
