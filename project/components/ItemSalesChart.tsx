import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ItemSalesChart() {
  // Example data - replace with real data
  const series = useMemo(() => [
    {
      name: 'Units Sold',
      data: [45, 38, 32, 28, 25, 22, 20, 18, 15, 12],
    },
  ], []);

  const options = useMemo(() => ({
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#ffffff',
    },
    grid: { 
      borderColor: '#333333', 
      strokeDashArray: 4,
      xaxis: { lines: { show: false } }
    },
    dataLabels: { 
      enabled: true,
      style: {
        colors: ['#ffffff'],
        fontSize: '12px',
        fontWeight: 600,
      }
    },
    stroke: { 
      curve: 'straight' as const, 
      width: 2,
      colors: ['#3b82f6']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.4,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: '#3b82f6', opacity: 0.8 },
          { offset: 100, color: '#3b82f6', opacity: 0.4 },
        ],
      },
    },
    xaxis: {
      categories: [
        'Hoodie Classic', 'T-Shirt Basic', 'Sweatpants', 'Jacket Denim', 
        'Cap Snapback', 'Sneakers', 'Backpack', 'Socks Pack', 'Beanie', 'Shorts'
      ],
      labels: { 
        style: { 
          colors: '#ffffff',
          fontSize: '11px'
        },
        rotate: -45,
        rotateAlways: false,
        maxHeight: 60,
      },
      axisBorder: { color: '#333333' },
      axisTicks: { color: '#333333' },
    },
    yaxis: {
      labels: { 
        style: { colors: '#ffffff' },
        formatter: (val: number) => Math.floor(val).toString()
      },
      title: {
        text: 'Units Sold',
        style: { color: '#ffffff', fontSize: '14px' }
      }
    },
    tooltip: {
      theme: 'dark',
      y: { 
        formatter: (val: number) => `${Math.floor(val)} units sold`,
        title: { formatter: () => 'Units Sold: ' }
      },
    },
    colors: ['#3b82f6'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
        distributed: false,
      }
    },
  }), []);

  return (
    <div className="bg-black rounded-lg shadow-sm p-6 w-full h-full border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Top Items Sold This Month</h3>
      <ReactApexChart options={options} series={series} type="bar" height={320} />
    </div>
  );
} 