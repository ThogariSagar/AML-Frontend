import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddEmployee } from './add-emplyee/add-employee.component';
import { EmployeeDataService } from './employee.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeData implements OnInit, OnDestroy {
  title = "write employee list and add employee html here";
  showTaskboard: boolean = false;
  showLoanboard: boolean = false;
  employeeData: any;
  employeeForm: any;
  displayedColumns: string[] | undefined;
  createNew: boolean = false;
  reverse = true;
  showFilterData: boolean = false;
  id: string | null = '';
  constructor(private employeeDataService: EmployeeDataService,
    private formBuilder: FormBuilder, private dialog: MatDialog) {

  }
  ngOnInit() {
    this.id = new URLSearchParams(window.location.search).get('id');

    this.displayedColumns = ['id',
      'fullname',
      'dept',
      'age',
      'salary', 'operation'];
    if (!this.id) {
      this.employeeDataService.getAllEmployeeData().subscribe((response: HttpResponse<any>) => {
        this.employeeData = response.body;
      });
    }

  }

  showFilterdataScreen() {
    this.showFilterData = true;
  }
  showTaskboardData() {
    this.showTaskboard = true;
  }
  showloanData() {
    this.showLoanboard = true;
    this.showTaskboard = false;
    this.showFilterData = false;
  }
  showEmployeeData() {
    this.showLoanboard = false;
    this.showTaskboard = true;
    this.showFilterData = true;
  }
  back() {
    this.showTaskboard = false;
    this.showFilterData = false;
    this.showLoanboard = false;
  }
  addNew() {
    this.employeeForm.reset();
    this.createNew = true;
  }
  saveNewEmployee() {

  }
  updateEmployee(employee: any) {
    this.createNew = true;
    this.employeeForm.patchValue(employee);
  }
  openDialog(data?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (data) {
      dialogConfig.data = {
        data: data,
      };
    } else {
      dialogConfig.data = {
        id: '',
      };
    }


    this.dialog.open(AddEmployee, dialogConfig);
  }

  deleteEmployee(id: any) {
    this.employeeDataService.deleteEployeeById(id).subscribe((response: HttpResponse<any>) => {
    });
  }
  sortData(property: any, orderType: string) {

    this.employeeDataService.sortingEmployee(property, orderType).subscribe((response: HttpResponse<any>) => {
      this.employeeData = response.body;
    })

  }
  ngOnDestroy() {

  }
}
