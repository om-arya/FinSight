import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
  );

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'SAMPL',
        backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
  
            if (!chartArea) {
              return null;
            }
  
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(245, 162, 38, .5)');
            gradient.addColorStop(.5, 'rgba(255, 255, 255, .5)');
  
            return gradient;
        },
        borderColor: 'rgba(245, 162, 38, 1)',
        borderWidth: 2.5,
        pointRadius: 2,
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
      },
    ],
  };
  
  const options = {
    scales: {
    x: {
        grid: {
            drawOnChartArea: false,
        },
    },
      y: {
        grid: {
            drawOnChartArea: true,
        },
        beginAtZero: true,
      },
    },
  };
  
  const Graph: React.FC = () => (
    <>
      <Line data={data} options={options} />
    </>
  );
  
  export default Graph;