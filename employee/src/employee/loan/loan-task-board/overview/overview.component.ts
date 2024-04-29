import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeDataService } from '../../../employee.service';
import { BusinessProduct } from '../business-product/business-product.component';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from "@angular/material/dialog";
import { Location } from '@angular/common';
@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class Overview implements OnInit, OnDestroy {
  loanForm: any;
  createNew: boolean = true;
  data: any = {};
  id: string | null = '';
  showLoanTaskboard: boolean = false;
  showOverviewData: boolean = false;
  constructor(private employeeDataService: EmployeeDataService,
    private formBuilder: FormBuilder, private location: Location) {
  }
  ngOnInit() {
    this.id = new URLSearchParams(window.location.search).get('id');
    this.employeeDataService.getOverviewDeatils(this.id).subscribe((response) => {
      this.data = response.body;
    })
    this.createFromGroup();

  }
  onSubmit() {
    this.employeeDataService.saveLoanApplication(this.loanForm.value).subscribe((response: HttpResponse<any>) => {
    });

  }
  hideOverview(){
   this.showOverviewData = false;
  }
  showLoanData() {
    this.showLoanTaskboard = true;
    
    this.location.replaceState('/loan');
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
