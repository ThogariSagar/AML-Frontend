// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeData } from './employee-data.component';
import { ItemDirective } from './item.directive';
import { TaskBoard } from './task-board/task-board.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDataService } from './employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from "@angular/material/dialog";
import { AddEmployee } from './add-emplyee/add-employee.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FilterData } from './filter-data/filter-data.component';
import { LoanTaskBoard } from './loan/loan-task-board/loan-task-board.component';
import { Overview } from './loan/loan-task-board/overview/overview.component';
import { BusinessProduct } from './loan/loan-task-board/business-product/business-product.component';
import { CompanyDetails } from './loan/loan-task-board/company-details/company-details.component';
import { CompanyAddress } from './loan/loan-task-board/company-address/company-address.component';
import { LoanApplication } from './loan/loan-task-board/loan-application/loan-application.component';
import { DatePipe } from '@angular/common';
import { AssurancedetailsComponent } from './loan/loan-task-board/assurancedetails/assurancedetails.component';
import { SalesreportComponent } from './loan/loan-task-board/salesreport/salesreport.component';
import { TrnsactionsComponent } from './loan/loan-task-board/trnsactions/trnsactions.component';
import { TransactionfiltersComponent } from './loan/loan-task-board/transactionfilters/transactionfilters.component';
import { TransacationStatementComponent } from './loan/loan-task-board/transacation-statement/transacation-statement.component';

const routes: Routes = [
  { path: 'employee', component: EmployeeData },
  { path: 'taskboard', component: TaskBoard },
  { path: 'filterdata', component: FilterData },
  {
    path: 'loan', component: LoanTaskBoard, children: [
      {
        path: 'overview',
        component: Overview
      },
      {
        path: 'business-product',
        component: BusinessProduct
      },
      {
        path: 'company-details',
        component: CompanyDetails
      },
      {
        path: 'company-address',
        component: CompanyAddress
      },
      {
        path: 'assurancedetails',
        component: AssurancedetailsComponent
      }
    ]
  },
];
// @NgModule decorator with its metadata
@NgModule({
  declarations: [
    EmployeeData,
    TaskBoard,
    AddEmployee,
    FilterData,
    Overview,
    BusinessProduct,
    CompanyDetails,
    CompanyAddress,
    LoanApplication,
    LoanTaskBoard,
    ItemDirective,
    AssurancedetailsComponent,
    SalesreportComponent,
    TrnsactionsComponent,
    TransactionfiltersComponent,
    TransacationStatementComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatSidenavModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule],

  providers: [EmployeeData, TaskBoard, EmployeeDataService, FormBuilder, FilterData, DatePipe],
  entryComponents: [EmployeeData],
  bootstrap: [EmployeeData, LoanTaskBoard]
})
export class AppModule { }
