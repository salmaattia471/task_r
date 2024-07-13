import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/model/Customer';
import { Transaction } from 'src/app/model/Transaction';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  customers: Customer[] = [
    { id: 1, name: 'Ahmed Ali' },
    { id: 2, name: 'Aya Elsayed' },
    { id: 3, name: 'Mina Adel' },
    { id: 4, name: 'Sarah Reda' },
    { id: 5, name: 'Mohamed Sayed' }
  ];

  transactions: Transaction[] = [
    { id: 1, customer_id: 1, date: '2022-01-01', amount: 1000 },
    { id: 2, customer_id: 1, date: '2022-01-02', amount: 2000 },
    { id: 3, customer_id: 2, date: '2022-01-01', amount: 550 },
    { id: 4, customer_id: 3, date: '2022-01-01', amount: 500 },
    { id: 5, customer_id: 2, date: '2022-01-02', amount: 1300 },
    { id: 6, customer_id: 4, date: '2022-01-01', amount: 750 },
    { id: 7, customer_id: 3, date: '2022-01-02', amount: 1250 },
    { id: 8, customer_id: 5, date: '2022-01-01', amount: 2500 },
    { id: 9, customer_id: 5, date: '2022-01-02', amount: 875 }
  ];

  dataSource: any = null;
  displayedColumns: string[] = ['id', 'name', 'transactionDate', 'transactionAmount']; // Adjust columns as per your need


  ngOnInit(): void {
    this.customers.forEach(customer => {
      customer.transactions = this.transactions.filter(transaction => transaction.customer_id === customer.id);
      this.dataSource = new MatTableDataSource<Customer>(this.customers);
    });


    console.log(this.customers)
  }


}
