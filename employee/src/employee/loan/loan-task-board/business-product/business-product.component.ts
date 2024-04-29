import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeDataService } from '../../../employee.service';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from "@angular/material/dialog";
import { Location } from '@angular/common';
@Component({
  selector: 'business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.css']
})
export class BusinessProduct implements OnInit, OnDestroy {
  businessProductForm: any;
  createNew: boolean = true;
  id: string | null = '';
  data: Object | null = {};
  loanType: string[];
  constructor(private employeeDataService: EmployeeDataService,
    private formBuilder: FormBuilder, private location: Location) {
    this.loanType = ["Adopting Business",
      "Business Expansion",
      "Company Maintenance",
      "Salaries"]
  }
  ngOnInit() {
    this.createFromGroup();
    this.id = new URLSearchParams(window.location.search).get('id');
    this.employeeDataService.getProductDetails(this.id).subscribe((response) => {
      this.data = response.body;
      this.businessProductForm.patchValue(this.data);
      // this.businessProductForm.disable();
    })
    this.data = {
    //  "purposeOfLoan": "Adopting Business",
    //  "natureOfBusiness": "working capital",
    //  "tenure": 35,
     // "loanAmount": 200000
    };
   // this.businessProductForm.patchValue(this.data);
    this.businessProductForm.disable();
  }
  saveDetails() {
    //this.employeeDataService.saveLoanApplication(this.businessProductForm.value).subscribe((response: HttpResponse<any>) => {
    //  editProductDetails(appId: any, data: any) {
      this.id = new URLSearchParams(window.location.search).get('id');
      this.employeeDataService.editProductDetails(this.id,this.businessProductForm.value).subscribe((response: HttpResponse<any>) => {
    });
    this.businessProductForm.disable();

  }

 editForm(){
  this.businessProductForm.enable();
 }
  createFromGroup() {
    this.businessProductForm = this.formBuilder.group({
      purposeOfLoan: [''],
      natureOfBusiness: [''],
      tenure: [''],
      loanAmount: ['']
    });
  }
  ngOnDestroy() {

  }
}
