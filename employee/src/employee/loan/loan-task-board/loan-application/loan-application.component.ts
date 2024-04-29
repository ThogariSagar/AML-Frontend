import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeDataService } from '../../../employee.service';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from "@angular/material/dialog";
import { Location } from '@angular/common';
@Component({
  selector: 'loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplication implements OnInit, OnDestroy {
  loanForm: any;
  createNew: boolean = true;
  constructor(private employeeDataService: EmployeeDataService, private dialogRef: MatDialogRef<LoanApplication>,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private location: Location) {
  }
  ngOnInit() {

    this.createFromGroup();

  }
  onSubmit() {
    this.employeeDataService.saveLoanApplication(this.loanForm.value).subscribe((response: HttpResponse<any>) => {
      if (response && response.status == 200) {

      }
      this.close();

    });

  }

  close() {
    const appIframe = document.querySelector('.cdk-overlay-container');
    if (appIframe) {
      appIframe.remove();
    }
    this.dialogRef.close();
    this.loanForm.reset();
  }

  createFromGroup() {
    this.loanForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      mailId: [''],
      mobile: [''],
      city: ['']
    });
  }
  ngOnDestroy() {

  }
}
