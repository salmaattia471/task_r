import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../model/Customer';
import * as d3 from 'd3'; // Import D3
import { ChartData } from '../model/chartdata';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  customers: Customer[] = [];
  constructor(private _CustomerService: CustomerService) {

    this.customers = this._CustomerService.getcustomers();

  }
  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    // Prepare data
    const data: ChartData[] = this.prepareChartData();
    console.log(data);

    // D3.js code to create chart
    const svg = d3.select('#chart')
                  .append('svg')
                  .attr('width', 600)
                  .attr('height', 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand<ChartData['name']>()
                .rangeRound([0, width])
                .padding(0.1)
                .domain(data.map((d: ChartData) => d.name));

    const maxAmount = d3.max(data, (d: ChartData) => d.totalAmount) ?? 0;

    const y = d3.scaleLinear()
                .rangeRound([height, 0])
                .domain([0, maxAmount]);

    const g = svg.append('g')
                 .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
     .attr('class', 'axis axis-x')
     .attr('transform', `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append('g')
     .attr('class', 'axis axis-y')
     .call(d3.axisLeft(y).ticks(10, 's'))
     .append('text')
     .attr('class', 'axis-title')
     .attr('transform', 'rotate(-90)')
     .attr('y', 6)
     .attr('dy', '0.71em')
     .attr('text-anchor', 'end')
     .text('Total Amount');

    g.selectAll('.bar')
     .data(data)
     .enter().append('rect')
     .attr('class', 'bar')
     .attr('x', (d: ChartData) => x(d.name) as number)
     .attr('y', (d: ChartData) => y(d.totalAmount))
     .attr('width', x.bandwidth())
     .attr('height', (d: ChartData) => height - y(d.totalAmount));
  }


  prepareChartData(): ChartData[] {
    const aggregatedData:any =[];
    this.customers.forEach(customer => {
      let totalAmount = 0;
      if (customer.transactions) {
        customer.transactions.forEach(transaction => {
          totalAmount += transaction.amount;
        });
      }
      aggregatedData.push({ name: customer.name, totalAmount: totalAmount });
    });
    
    return aggregatedData;
  }
}
