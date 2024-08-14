import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { GraphWrapperComponent } from '../../components/graph-wrapper/graph-wrapper.component';
import type { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { ApiService } from '../../core/api.service';
import { Sold } from '../../core/types/api';

@Component({
  selector: 'ce-dashboard',
  standalone: true,
  imports: [
    MatGridListModule,
    InfoCardComponent,
    GraphWrapperComponent,
    NgxEchartsDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideEcharts()],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);

  options: EChartsOption = {};
  updateOptions: EChartsOption = {};

  public nuevosClientes: number = 0;
  public totalPedidos: number = 0;
  public totalProductos: number = 0;
  public ventas: Sold[] = [];
  public isLoading: boolean = false;

  private oneDay = 24 * 3600 * 1000;
  private now!: Date;
  private value!: number;
  private data!: DataT[];
  private timer: any;

  constructor() {}

  ngOnInit(): void {
    this.getClientesNuevos();
    this.getTotalPedidos();
    this.getTotalProductosVendidos();
    this.getVentas();
    // generate some random testing data:
    this.data = [];
    this.now = new Date(1997, 9, 3);
    this.value = Math.random() * 1000;

    for (let i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
    }

    // initialize chart options:
    this.options = {
      title: {
        text: 'Dynamic Data + Time Axis',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'Mocking Data',
          type: 'line',
          showSymbol: false,
          data: this.data,
        },
      ],
    };

    // Mock dynamic data:
    this.timer = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        this.data.shift();
        this.data.push(this.randomData());
      }

      // update series data:
      this.updateOptions = {
        series: [
          {
            data: this.data,
          },
        ],
      };
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  randomData(): DataT {
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [
          this.now.getFullYear(),
          this.now.getMonth() + 1,
          this.now.getDate(),
        ].join('/'),
        Math.round(this.value),
      ],
    };
  }

  getClientesNuevos(): void {
    this.apiService.getNuevosClientes().subscribe(
      (response: { count: number }) => (this.nuevosClientes = response.count),
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getTotalPedidos(): void {
    this.apiService.getTotalPedidos().subscribe(
      (response: { total: number }) => (this.totalPedidos = response.total),
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getTotalProductosVendidos(): void {
    this.apiService.getTotalProductos().subscribe(
      (response: { total: number }) => (this.totalProductos = response.total),
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getVentas(): void {
    this.isLoading = true;
    this.apiService.getPedidos().subscribe(
      (response: Sold[]) => {
        this.isLoading = false;
        this.ventas = response;
        this.initializeChart();
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching data:', error);
      }
    );
  }
  initializeChart(): void {
    const groupedData = this.groupByMonth(this.ventas);
    const chartData = Object.keys(groupedData).map((month) => ({
      name: month,
      value: groupedData[month],
    }));

    this.options = {
      title: {
        text: 'Ventas por Mes',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          return `${params.name} : $${params.value}`;
        },
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'category',
        data: chartData.map((item) => item.name),
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '10%'],
        min: 0,
        max: Math.max(...chartData.map((item) => item.value)) * 1.1,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: (value: number) => `$${value}`,
          color: '#333',
        },
      },
      series: [
        {
          name: 'Ventas',
          type: 'bar',
          data: chartData.map((item) => item.value),
        },
      ],
    };
  }

  groupByMonth(data: any[]): { [key: string]: number } {
    const grouped: { [key: string]: number } = {};

    data.forEach((item) => {
      const date = new Date(item.Fecha_Registro);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!grouped[month]) {
        grouped[month] = 0;
      }
      grouped[month] += item.Costo_total;
    });

    return grouped;
  }
}

type DataT = {
  name: string;
  value: [string, number];
};
