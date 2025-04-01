import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Paper } from '../../services/core-api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {
  @Input() papers: Paper[] = [];
  
  chart: any;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['papers'] && this.papers) {
      this.createChart();
    }
  }
  
  createChart() {
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }
    
    if (this.papers.length === 0) {
      return;
    }
    
    // Group papers by publication year
    const yearCounts: { [key: number]: number } = {};
    
    this.papers.forEach(paper => {
      if (paper.yearPublished) {
        yearCounts[paper.yearPublished] = (yearCounts[paper.yearPublished] || 0) + 1;
      }
    });
    
    if (Object.keys(yearCounts).length === 0) {
      return;
    }
    
    // Sort years
    const years = Object.keys(yearCounts).map(Number).sort();
    
    const data = years.map(year => ({
      year,
      count: yearCounts[year]
    }));
    
    // Create chart
    const canvas = document.getElementById('yearChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: data.map(d => d.year.toString()),
          datasets: [{
            label: 'Papers Published',
            data: data.map(d => d.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Papers'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Publication Year'
              }
            }
          }
        }
      });
    }
  }
}