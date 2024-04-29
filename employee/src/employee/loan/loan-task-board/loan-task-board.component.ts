import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EmployeeDataService } from '../../employee.service';
import { LoanApplication } from './loan-application/loan-application.component';
import { Location } from '@angular/common';

@Component({
  selector: 'loan-task-board',
  templateUrl: './loan-task-board.component.html',
  styleUrls: ['./loan-task-board.component.css']
})
export class LoanTaskBoard implements OnInit, OnDestroy {
  displayedColumns: string[] | undefined;
  loanTaskBoardData: any;
  showOverviewData: boolean = false;
  id: any;

  constructor(private employeeDataService: EmployeeDataService, private dialog: MatDialog, private location: Location) {

  }

  ngOnInit() {
    this.displayedColumns = ['appId', 'customerName', 'mailId', 'mobile', 'city'];
    this.employeeDataService.getLoanTaskboardData().subscribe((response: HttpResponse<any>) => {
        this.loanTaskBoardData = response.body;
     })
    // this.loanTaskBoardData = [{
    //   "appId": [''],
    //   "customerName": [''],
    //   "mailId": [''],
    //   "mobile": [''],
    //   "city": ['']
    // }]
  }
  openDialog(data?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    if (data) {
      dialogConfig.data = {
        data: data,
      };
    } else {
      dialogConfig.data = {
        id: '',
      };
    }


    this.dialog.open(LoanApplication, dialogConfig);
  }
  showOverview(id: any) {
    this.showOverviewData = true;
    this.id = id;
    this.location.replaceState('/loan/overview?id=' + this.id);
  }
  ngOnDestroy() {

  }
}
