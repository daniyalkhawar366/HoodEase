import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesChart() {
  // Example data (replace with real data as needed)
  const series = useMemo(() => [
    {
      name: 'Revenue',
      data: [12000, 15000, 11000, 18000, 22000, 20000, 25000, 23000, 27000, 30000, 32000, 35000],
    },
  ], []);

  const options = useMemo(() => ({
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: '#fff',
    },
    grid: { borderColor: '#333', strokeDashArray: 4 },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: '#6366f1', opacity: 0.5 },
          { offset: 100, color: '#6366f1', opacity: 0.1 },
        ],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: '#bbb' } },
      axisBorder: { color: '#333' },
      axisTicks: { color: '#333' },
    },
    yaxis: {
      labels: { style: { colors: '#bbb' } },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `$${val.toLocaleString()}` },
    },
    colors: ['#6366f1'],
  }), []);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-700 w-full h-full">
      <h2 className="text-lg font-bold text-white mb-4">Revenue (Last 12 Months)</h2>
      <ReactApexChart options={options} series={series} type="area" height={320} />
    </div>
  );
} 