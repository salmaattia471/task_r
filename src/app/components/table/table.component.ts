import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/model/Customer';
import { Transaction } from 'src/app/model/Transaction';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private _CustomerService: CustomerService, private _FormBuilder: FormBuilder) {

  }
  dataSource: any = null;
  filteredDataSource: any = null;
  displayedColumns: string[] = ['id', 'name', 'transactionDate', 'transactionAmount']; // Adjust columns as per your need

  searchForm!: FormGroup;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Customer>(this._CustomerService.getcustomers());
    this.filteredDataSource=this.dataSource
    this.searchForm = this._FormBuilder.group({
      search: ['']


    });



    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });
   

  }
  applyFilter(filterValue: string) {
    if (filterValue && filterValue.trim()) {
      let customers: Customer[] = this._CustomerService.getcustomers()

      this.filteredDataSource.data = customers.filter((customer) =>
        customer.name.toLowerCase().includes(filterValue.trim().toLowerCase())
      );
    } else {
      this.filteredDataSource.data = this.dataSource.data;
    }
  }


}
