import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesSegmentationChart() {
  // Example data - replace with real data
  const series = useMemo(() => [45, 35, 20], []);

  const options = useMemo(() => ({
    chart: {
      type: 'donut' as const,
      toolbar: { show: false },
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    labels: ['Men', 'Women', 'Kids'],
    colors: ['#6366f1', '#f59e0b', '#10b981'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      y: {
        formatter: (val: number) => `${val}% of total revenue`,
        title: {
          formatter: (seriesName: string) => `${seriesName}: `
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              offsetY: 10,
              formatter: (val: string) => `${val}%`,
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              color: '#9ca3af',
              formatter: () => '100%',
            }
          }
        },
        offsetY: 0,
      },
    },
    stroke: {
      width: 0,
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.1,
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        plotOptions: {
          pie: {
            donut: {
              size: '60%',
            }
          }
        }
      }
    }]
  }), []);

  const categories = [
    { name: 'Men', percentage: 45, color: '#6366f1', revenue: '$20,354' },
    { name: 'Women', percentage: 35, color: '#f59e0b', revenue: '$15,831' },
    { name: 'Kids', percentage: 20, color: '#10b981', revenue: '$9,046' },
  ];

  return (
    <div className="bg-black rounded-lg shadow-sm p-6 w-full h-full border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white tracking-tight">Sales by Category</h3>
        <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <ReactApexChart options={options} series={series} type="donut" height={280} />
      </div>
      
      <div className="space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              ></div>
              <div>
                <p className="text-sm font-semibold text-white">{category.name}</p>
                <p className="text-xs text-gray-400">{category.revenue}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{category.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 