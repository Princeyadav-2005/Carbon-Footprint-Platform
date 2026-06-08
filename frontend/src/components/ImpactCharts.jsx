import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ImpactCharts = ({ breakdown }) => {
  const data = {
    labels: ['Electricity Metric', 'Transport Metric'],
    datasets: [
      {
        data: [breakdown.electricity, breakdown.transport],
        backgroundColor: ['#f59e0b', '#3b82f6'],
        borderColor: ['#d97706', '#2563eb'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
          font: { size: 13, weight: '500' }
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col items-center">
      <h3 className="text-lg font-bold mb-4 self-start">CO₂ Emission Allocation</h3>
      <div className="w-full max-w-[260px] md:max-w-[280px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};