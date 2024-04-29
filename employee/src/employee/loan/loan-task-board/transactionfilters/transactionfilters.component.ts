import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/employee/employee.service';
import { HttpClient, HttpParams } from '@angular/common/http';

interface TransactionFilters {
  success: boolean;
  pending: boolean;
  failed: boolean;
  cancelled: boolean;
}

@Component({
  selector: 'app-transactionfilters',
  templateUrl: './transactionfilters.component.html',
  styleUrls: ['./transactionfilters.component.css']
})
export class TransactionfiltersComponent implements OnInit {
    transactions!: any[];
   // transactions!: any[];
   filters = {
    success: false,
    pending: false,
    failed: false,
    cancelled: false,
    creditCard: false,
    debitCard: false,
    upi: false,
    wallet: false
};
showStatusOptions: boolean = false;
showInstrumentOptions: boolean = false;
    // Ensure this 'filters' property is added and properly initialized
    // filters = {
    //     completed: false,
    //     pending: false,
    //     failed: false,
    //     cancelled: false
    // };
    constructor(private http: HttpClient) {}

    //constructor(private transactionService: EmployeeDataService) {}

    ngOnInit(): void {}
 
  
    fetchFilteredTransactions(): void {
      const baseUrl = 'http://localhost:8080/loans/filtertransactions/1';
      let params = new HttpParams();
    
      // Define sets for status and instrument
      const statusSet = new Set(['SUCCESS', 'PENDING', 'FAILED', 'CANCELLED']);
      const instrumentSet = new Set(['CREDITCARD', 'DEBITCARD', 'UPI', 'WALLET']);
    
      // Loop over the filters object and add the selected filters to the params
      let selectedFilters: string[] = [];
      for (const key in this.filters) {
        if (this.filters.hasOwnProperty(key) && this.filters[key as keyof TransactionFilters] === true) {
          // Convert the filter key to the corresponding value expected by the backend
          const filterValue = key.toUpperCase();
          selectedFilters.push(filterValue);
        }
      }
    
      // Determine if the selected filters are related to status or instrument
      let isStatus = selectedFilters.some(filter => statusSet.has(filter));
      let isInstrument = selectedFilters.some(filter => instrumentSet.has(filter));
    
      // Set the 'statusOrInstrument' parameter accordingly
      if (isStatus) {
        params = params.set('statusOrInstrument', 'status');
      } else if (isInstrument) {
        params = params.set('statusOrInstrument', 'instrument');
      }
    
      // Append selected filters
      selectedFilters.forEach(filter => {
        params = params.append('statusOrInstrumentTypesList', filter);
      });
      
      // Send a GET request to the backend with the constructed params
      this.http.get<any[]>(baseUrl, { params: params }).subscribe(data => {
        this.transactions = data;
      }, error => {
        console.error('Error fetching transactions:', error);
      });
    }
    clearFilters(): void {
      for (const key in this.filters) {
          if (this.filters.hasOwnProperty(key)) {
              // Use the keyof keyword and type assertion here
              this.filters[key as keyof typeof this.filters] = false;
          }
      }
  }    
  
}

