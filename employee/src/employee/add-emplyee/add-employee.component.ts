import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeDataService } from '../employee.service';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from "@angular/material/dialog";
import { Location } from '@angular/common';
@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployee implements OnInit, OnDestroy {
  employeeForm: any;
  createNew: boolean = true;
  constructor(private employeeDataService: EmployeeDataService, private dialogRef: MatDialogRef<AddEmployee>,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private location: Location) {
  }
  ngOnInit() {
    if (this.data && this.data.data) {
      this.createFromGroup();
      this.employeeForm.patchValue(this.data.data);
    } else {
      this.createFromGroup();
    }
  }
  onSubmit() {
    this.createNew = false;
    this.employeeDataService.saveEmployee(this.employeeForm.value).subscribe((response: HttpResponse<any>) => {
    });
    this.close();

  }

  close() {
    const appIframe = document.querySelector('.cdk-overlay-container');
    if (appIframe) {
      appIframe.remove();
    }
    this.dialogRef.close();
  }

  createFromGroup() {
    this.employeeForm = this.formBuilder.group({
      fname: [''],
      id: [''],
      lname: [''],
      fullname: [''],
      dept: [''],
      age: [''],
     // mobile: [''],
      salary: [''],
      empCode: [''],
    });
  }
  ngOnDestroy() {

  }
}
