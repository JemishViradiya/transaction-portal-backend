import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:3100/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(
    startDate: string,
    endDate: string
  ): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`
    );
  }
}
