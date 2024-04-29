import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Transaction } from './loan/loan-task-board/transacation-statement/transaction.model';
@Injectable()

export class EmployeeDataService {
  constructor(private httpClient: HttpClient) {

  }
  hostUrl: string = "http://localhost:8080";
  getAllEmployeeData() {

    return this.httpClient.get(this.hostUrl + `/employee/getAll`, { observe: 'response' });

  }
  saveEmployee(empData: any) {
    return this.httpClient.post(this.hostUrl + `/employee/saveEmp`, empData, { observe: 'response' });
  }
  updateEmployee(empData: any) {
    return this.httpClient.put(this.hostUrl + `/employee/updateEmp`, empData, { observe: 'response' });
  }

  searchEmployee(searchTerm: string) {
    return this.httpClient.get(this.hostUrl + `/employee/search/${searchTerm}`, { observe: 'response' });
  }

  sortingEmployee(property: string, orderType: string) {
 // return this.httpClient.get(this.hostUrl + `/employee/dataSorting?property=${property}?orderType=${orderType}`, { observe: 'response' });
  return this.httpClient.get(this.hostUrl + `/employee/dataSorting?property=${property}&orderType=${orderType}`, { observe: 'response' }); 
}
  filterRecords(data: any) {
   // return this.httpClient.get(this.hostUrl + `/employee/dataSorting?property=${property}&orderType=${orderType}`, { observe: 'response' }); 
    return this.httpClient.get(this.hostUrl + `/employee/searchFilters?filterType=${data.type}&empCode=${data.empCode}`, { observe: 'response' });

  }
  getEployeeById(id: number) {
    return this.httpClient.get(this.hostUrl + `/employee/getByEmpId/${id}`, { observe: 'response' });

  }
  deleteEployeeById(id: number) {
    return this.httpClient.delete(this.hostUrl + `/employee/deleteEmp/${id}`, { observe: 'response' });

  }
  // ExportEmployees(type: string) {
  //   return this.httpClient.get(this.hostUrl + `/employee/factoryDesign/${type}`, { observe: 'response' });
  // }

  ExportEmployees(type: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.get<Blob>(this.hostUrl + `/employee/factoryDesign/${type}`, { 
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
  //Loan module
  getLoanTaskboardData() {
    return this.httpClient.get(this.hostUrl + `/loans/loanTaskboard`, { observe: 'response' });
  }
  saveLoanApplication(data: any) {
    // {
    //   "app_id":123,
    //   "customer_name":"ABC",
    //   "mail":"abc@gmail.com"
    //   "mobile":998988988,
    //   "city":"Hyderabad"	
    //   }
    return this.httpClient.post(this.hostUrl + `/loans/applyLoan`, data, { observe: 'response' });
  }
  getOverviewDeatils(appId: any) {
    return this.httpClient.get(this.hostUrl + `/loans/getOverviewDeatils/${appId}`, { observe: 'response' });
  }
  getProductDetails(appId: any) {
    return this.httpClient.get(this.hostUrl + `/loans/getProductDetails/${appId}`, { observe: 'response' });
  }
  getCompanyDetails(appId: any) {
    return this.httpClient.get(this.hostUrl + `/loans/getCompanyDetails/${appId}`, { observe: 'response' });
  }
  getCompanyAddress(appId: any) {
    return this.httpClient.get(this.hostUrl + `/loans/getCompanyAddress/${appId}`, { observe: 'response' });
  }


  editProductDetails(appId: any, data: any) {
    // {
    //   "appid":12
    //   "purposeOfLoan":"adopting business",
    //   "natureOfBusiness":"working capital",
    //   "tenure":35,
    //   "loanAmount":200000
    //   }
    return this.httpClient.post(this.hostUrl + `/loans/saveProductDetails/${appId}`, data, { observe: 'response' });
  }

  saveCompanyDetails(appId: any, data: any) {
    //   {
    //     "companyName":"Teja IT",
    //     "dateOfEstablish":"05/08/2021",
    //     "gstin":"ABCD123FVG",
    //     "companyPan":"PHB457GHT",
    //     "industryType":"IT",
    //     "turnover":100000
    // }
    return this.httpClient.post(this.hostUrl + `/loans/saveCompanyDetails/${appId}`, data, { observe: 'response' });
  }
  saveCompanyAddress(appId: any, data: any) {
    // {
    //   "appId":12,
    //       "building":"Dhanalakhmi towers",
    //       "line":"1-256",
    //       "state":"Telanagana",
    //       "citi":"Hyderabad",
    //       "pincode":5000036,
    //       "landmark":"police station"
    //   }
    return this.httpClient.post(this.hostUrl + `/loans/saveCompanyAddress/${appId}`, data, { observe: 'response' });
  }
  saveAssuranceDetails(appId: any, data: any) {
    // {
    //   "appId":12,
    //       "building":"Dhanalakhmi towers",
    //       "line":"1-256",
    //       "state":"Telanagana",
    //       "citi":"Hyderabad",
    //       "pincode":5000036,
    //       "landmark":"police station"
    //   }
    return this.httpClient.post(this.hostUrl + `/loans/saveJsonfileData/${appId}`, data, { observe: 'response' });
  }

  getFilteredTransactions(appid: number, statusOrInstrument: string, statusOrInstrumentTypesList: string[]): Observable<any> {
    const endpoint = `${this.hostUrl}/filtertransactions/${appid}?statusOrInstrument=${statusOrInstrument}&statusOrInstrumentTypesList=${statusOrInstrumentTypesList.join(',')}`;
    return this.httpClient.get(endpoint);
  }

  getTransactions(appId: any, duration?: string, startDate?: string, endDate?: string): Observable<Transaction[]> {
    let params = new HttpParams();
  
    // Only add the duration to params if it is provided
    if (duration) {
      params = params.set('duration', duration);
    }
  
    // Add startDate and endDate to params only if they are provided
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
  
    // The URL with the appId as a path variable
    const url = `${this.hostUrl}/loans/fetchtransactions/${appId}`;
    
    // Make an HTTP GET request with the query parameters
    return this.httpClient.get<Transaction[]>(url, { params: params });
  }
  
}