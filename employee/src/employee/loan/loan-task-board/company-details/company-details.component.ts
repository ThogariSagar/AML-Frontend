import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeDataService } from '../../../employee.service';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from "@angular/material/dialog";
import { DatePipe, Location } from '@angular/common';
@Component({
  selector: 'company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetails implements OnInit, OnDestroy {
  companyDetailsForm: any;
  createNew: boolean = true;
  id: string | null = '';
  data: any = '';
  constructor(private employeeDataService: EmployeeDataService,
    private formBuilder: FormBuilder, private datepipe: DatePipe, private location: Location) {
  }
  ngOnInit() {
    this.createFromGroup();
    this.id = new URLSearchParams(window.location.search).get('id');
    this.employeeDataService.getCompanyDetails(this.id).subscribe((response) => {
      this.data = response.body;
      this.companyDetailsForm.patchValue(this.data);
      this.companyDetailsForm.get('dateOfEstablish').setValue(new Date(this.data.dateOfEstablish))
      this.companyDetailsForm.disable();
    })

    this.data = {
    //  "companyName": "Teja IT",
    //  "dateOfEstablish": "05/08/2021",
    //  "gstin": "ABCD123FVG",
    //  "companyPan": "PHB457GHT",
     // "industryType": "IT",
    //  "turnover": 100000
    };
   // this.companyDetailsForm.patchValue(this.data);
    this.companyDetailsForm.get('dateOfEstablish').setValue(new Date(this.data.dateOfEstablish))

  }
  saveDetails() {
    let saveObj = this.companyDetailsForm.value;
    saveObj.dateOfEstablish = this.datepipe.transform(saveObj.dateOfEstablish, 'MM/dd/YYYY');
    //modifeid by Teja..
    this.id = new URLSearchParams(window.location.search).get('id');
    this.employeeDataService.saveCompanyDetails(this.id,this.companyDetailsForm.value).subscribe((response: HttpResponse<any>) => {
    //this.employeeDataService.saveLoanApplication(saveObj).subscribe((response: HttpResponse<any>) => {
    });
    this.companyDetailsForm.disable();

  }
 // Teja added edit form function
 editForm(){
  this.companyDetailsForm.enable();
 }


  createFromGroup() {
    this.companyDetailsForm = this.formBuilder.group({
      companyName: [''],
      dateOfEstablish: [''],
      gstin: [''],
      companyPan: [''],
      industryType: [''],
      turnover: [''],
    });
  }

  ngOnDestroy() {

  }
}
