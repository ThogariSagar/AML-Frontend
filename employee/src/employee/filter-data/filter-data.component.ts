import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDataService } from '../employee.service';

@Component({
  selector: 'filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterData implements OnInit, OnDestroy {
  title = "filter list here";
  displayedColumns: string[] | undefined;
  taskBoardData: any;
  types: any;
  docType: string[] = [];
  searchTerm: any;
  dialogRef: any;
  @ViewChild('myCityDialog') cityDialog = {} as TemplateRef<any>;
  employeeForm: any;
  filterTypes: string[] = [];
  constructor(private employeeDataService: EmployeeDataService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      type: [''],
      empCode: [''],

    });
  }

  typeList: any[] = [{ 'value': 'employee.pdf', 'key': 'pdf' }, { 'value': 'employee.docx', 'key': 'docx' }, { 'value': 'employee.txt', 'key': 'txt' }, { 'value': 'employee.xlsx', 'key': 'xlsx' }];
  ngOnInit() {
    this.displayedColumns = ['sno', 'empCode','fullname', 'dept', 'salary', 'age'];
    this.employeeDataService.getAllEmployeeData().subscribe((response: HttpResponse<any>) => {
      this.taskBoardData = response.body;
    });
    this.filterTypes = ['startsWith',
      'endsWith',
      'contains',
      'notContains',
      'equals',
      'notEquals'];
  }
  openCityDialog() {
    this.dialogRef = this.dialog.open(this.cityDialog,
      { data: 'test', height: '350px', width: '400px' });

    this.dialogRef.afterClosed().subscribe((result: any) => {

    });
  }
  onSubmit() {
    let data = this.employeeForm.value;
    this.employeeDataService.filterRecords(data).subscribe((response: HttpResponse<any>) => {
      this.taskBoardData = response.body;
    })
  }
  close() {
    this.dialogRef.close();
  }
  filter(event: any) {
    this.docType.push(event.source.value);
  }
  downloadData() {
    this.employeeDataService.ExportEmployees(this.docType.toString()).subscribe((response: HttpResponse<any>) => {
    })

  }
  createFromGroup() {

  }
  searchEmployee(data: string) {
    if (data == '') {
      this.employeeDataService.getAllEmployeeData().subscribe((response: HttpResponse<any>) => {
        this.taskBoardData = response.body;
      })
    } else {
      this.employeeDataService.searchEmployee(data).subscribe((response: HttpResponse<any>) => {
        this.taskBoardData = response.body;
      })
    }
  }
  filterEmployee(data: string) {
    if (data == '') {
      this.employeeDataService.getAllEmployeeData().subscribe((response: HttpResponse<any>) => {
        this.taskBoardData = response.body;
      })
    } else {
      this.employeeDataService.searchEmployee(data).subscribe((response: HttpResponse<any>) => {
        this.taskBoardData = response.body;
      })
    }

  }
  ngOnDestroy() {

  }
}
