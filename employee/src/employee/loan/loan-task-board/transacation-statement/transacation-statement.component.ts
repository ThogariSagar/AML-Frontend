import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/employee/employee.service';
import { Transaction } from './transaction.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-transacation-statement',
  templateUrl: './transacation-statement.component.html',
  styleUrls: ['./transacation-statement.component.css']
})
export class TransacationStatementComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedDuration: string = ''; // default value or could be empty string
  startDate?: string;
  endDate?: string;

  ngOnInit() {
    this.loadTransactions();
  }

  constructor(private transactionService: EmployeeDataService) {}

  onDurationChange(duration: string): void {
    this.selectedDuration = duration;
    this.fetchTransactions();
  }



  id: string | null = '';
  
  fetchTransactions(): void {
    // The formatted dates should be `undefined` if not set, to prevent sending them to the backend
    const formattedStartDate = this.startDate ? formatDate(this.startDate, 'dd-MM-yyyy', 'en-US') : undefined;
    const formattedEndDate = this.endDate ? formatDate(this.endDate, 'dd-MM-yyyy', 'en-US') : undefined;
  
    // Check if custom dates are selected and clear the selectedDuration if they are
    if (formattedStartDate && formattedEndDate) {
    //  this.selectedDuration = undefined; // Now allowed since selectedDuration can be string or undefined
    }
  
    // Now pass the properly formatted dates or undefined to your service
    this.transactionService.getTransactions(this.id, this.selectedDuration, formattedStartDate, formattedEndDate)
      .subscribe(
        transactions => this.transactions = transactions,
        error => {
          console.error('There was an error retrieving the transactions', error);
        }
      );
  }
  
  
  

  onCustomDateChange(): void {
    if (this.startDate && this.endDate) {
      this.fetchTransactions();
    }
  }
  loadTransactions() {
    this.id = new URLSearchParams(window.location.search).get('id');
    this.transactionService.getTransactions(this.id,this.selectedDuration, this.startDate, this.endDate)
      .subscribe(
        data => {
          this.transactions = data;
        },
        error => {
          // Handle errors here
          console.error('There was an error retrieving the transactions', error);
        }
      );
  }
}
