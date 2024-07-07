import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState';
import { Asset } from '../../api/AssetAPI';

const Graph: React.FC = () => {
  ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

  const state = SessionState();

  const [data, setData] = useState({labels: [], datasets: [{label: "", borderColor: "", borderWidth: 0, pointRadius: 0, data: []}]});

  let topAssets = [];
  useEffect(() => {
    const datasets = [];
    const holdingAssets = state.getHoldingAssets() as Asset[];
    topAssets = holdingAssets.sort((a1: Asset, a2: Asset) => {
      return a2.prices[a2.prices.length - 1] - a1.prices[a1.prices.length - 1];
    }).slice(0,5);

    topAssets.forEach((asset) => {
        datasets.push({
          label: asset.ticker,
          borderColor: asset.sector === "Consumer Discretionary" ? "blue" : "red",
          borderWidth: 2.5,
          pointRadius: 2,
          data: asset.prices,
          fill: true,
          backgroundColor: 'rgba(255, 0, 0, .1)',
          backgroundOpacity: .1,
        })
    })

    setData({
      labels: new Array(topAssets[0].prices.length).fill(""),
      datasets: datasets,
    });
  }, [])

  const options = {
    aspectRatio: 11/4,
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
      },
    },
  };

  return (
    <div className="dashboard-container graph-container">
      <Line data={data} options={options} />
    </div>
  )
};

export default Graph;