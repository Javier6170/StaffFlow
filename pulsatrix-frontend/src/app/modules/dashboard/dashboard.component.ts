// dashboard.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, signal, WritableSignal } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { PersonService } from '../../core/service/auth/person.service';

type ChartType = NonNullable<ApexChart['type']>;

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') pieChart!: ChartComponent;
  @ViewChild('lineChartComp') lineChartRef!: ChartComponent;

  public deptSeries:  WritableSignal<ApexNonAxisChartSeries> = signal([]);
  public deptChart:   WritableSignal<ApexChart>             = signal({ type: 'pie' as ChartType, height: 300 });
  public deptLabels:  WritableSignal<string[]>               = signal([]);
  public deptTitle:   WritableSignal<ApexTitleSubtitle>     = signal({ text: 'Personas por Departamento', align: 'center' });
  public loadingDept: WritableSignal<boolean>                = signal(true);

  public lineSeries: WritableSignal<ApexAxisChartSeries> = signal([{ name: 'Contrataciones', data: [] }]);
  public lineChart:  WritableSignal<ApexChart>           = signal({ type: 'line' as ChartType, height: 300 });
  public lineXaxis:  WritableSignal<ApexXAxis>           = signal({ categories: [] });
  public lineTitle:  WritableSignal<ApexTitleSubtitle>   = signal({ text: 'Contrataciones por Mes', align: 'center' });
  public loadingLine: WritableSignal<boolean>            = signal(true);

  constructor(private stats: PersonService) {}

  ngOnInit() {
    this.stats.byDepartment().subscribe(data => {
      const counts = data.map(d => d.count);
      const labels = data.map(d => d.department);
      this.deptSeries.set(counts);
      this.deptLabels.set(labels);
      this.loadingDept.set(false);
      // SI el chart ya existe, fuerza la actualización:
      if (this.pieChart) {
        this.pieChart.updateSeries(counts);
      }
    });

    this.stats.byMonth().subscribe(data => {
      const months = data.map(d => d.month);
      const hires  = data.map(d => d.hires);
      this.lineXaxis.set({ categories: months });
      this.lineSeries.set([{ name: 'Contrataciones', data: hires }]);
      this.loadingLine.set(false);
      if (this.lineChartRef) {
        this.lineChartRef.updateSeries([{ name: 'Contrataciones', data: hires }]);
      }
    });
  }

  ngAfterViewInit() {
    // nada aquí, sólo para que ViewChild esté listo
  }
}