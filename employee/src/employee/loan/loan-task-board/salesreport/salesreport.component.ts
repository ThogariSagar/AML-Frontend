import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit {

// data: any;
data: any[] = [];

file!: File;
id: string | null = '';
//constructor(private http: HttpClient) {}
constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

// Inside your submit() method, after assigning the data:
// this.data = response;
// this.cdr.detectChanges();
onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
      this.file = target.files[0];
  }
}

submit() {
  const formData = new FormData();
  formData.append('file', this.file, this.file.name);
  this.http.post<any[]>('http://localhost:8080/loans/readExcel', formData).subscribe(
    response => {
       this.data = response;
       this.cdr.detectChanges();
       console.log(this.data);
    },
    error => {
       console.error("Error occurred: ", error);
    }
 );
 
}
saveData() {
  this.id = new URLSearchParams(window.location.search).get('id');  console.log(`http://localhost:8080/loans/saveJsonfileData/${this.id}`);

  this.http.post<any[]>(`http://localhost:8080/loans/saveSalesReport/${this.id}`, this.data).subscribe(    
  response => {
       console.log("Data saved successfully");
       this.data = response;
       this.cdr.detectChanges();
       console.log(this.data);
    },
    error => {
       console.error("Error occurred while saving: ", error);
    }
  );
}

fetchData(appId: number) {
  this.http.get<any[]>(`http://localhost:8080/loans/getSalesReportDetails/${appId}`).subscribe(
      response => {
          this.data = response;
          this.cdr.detectChanges();
          console.log("Data fetched successfully:", this.data);
      },
      error => {
          console.error("Error occurred while fetching data:", error);
      }
  );
}

ngOnInit(): void {
  // This method will be called once the component is initialized.
  // You can add any logic here that you want to execute when the component starts.
  this.id = new URLSearchParams(window.location.search).get('id');
  if (this.id) {
      this.fetchData(Number(this.id)); // Convert string to number and fetch the data
  }
}

editForm(){

}
}
