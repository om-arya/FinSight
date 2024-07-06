import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

import SessionState from '../../state/SessionState';
import AssetAPI, { Asset } from '../../api/AssetAPI';

const Graph: React.FC = () => {
  ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const date = mm + '/' + dd + '/' + yyyy;

  const state = SessionState();
  const holdings = state.getHoldings();
  const assetApi = AssetAPI();

  const [dailyTotals, setDailyTotals] = useState([]);

  useEffect(() => {
    let newDailyTotals = [];
    holdings.forEach(async (holding) => {
      const asset: Asset = await assetApi.getAssetByTicker(holding.ticker);
      asset.prices.forEach((price, i) => {
        if (price > 0) {
          if (i >= newDailyTotals.length) {
            newDailyTotals.push(price);
          } else {
            newDailyTotals[i] += price;
          }
        }
      })
    })
    setDailyTotals(newDailyTotals);
  }, [])

  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
  const data = {
    labels: days.slice(0, dailyTotals.length),
    datasets: [
      {
        label: `Your holdings`,
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
        data: dailyTotals,
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
        min: Math.min(...dailyTotals) - 50,
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  )
};

export default Graph;