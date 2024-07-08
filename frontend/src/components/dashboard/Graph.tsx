import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';
import '../../static/dashboard.css';

import SessionState from '../../state/SessionState';
import { Asset } from '../../api/AssetAPI';

const Graph: React.FC = () => {
  ChartJS.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

  const state = SessionState();

  const [data, setData] = useState({labels: [], datasets: [{data: []}]});
  let topAssets = [];
  
  useEffect(() => {
    const datasets = [];
    const holdingAssets = state.getHoldingAssets() as Asset[];

    topAssets = holdingAssets.sort((a1: Asset, a2: Asset) => {
      return a2.prices[a2.prices.length - 1] - a1.prices[a1.prices.length - 1];
    }).slice(0,5);

    topAssets.forEach((asset, i) => {
        datasets.push({
          label: asset.ticker,
          borderColor: i === 0 ? "rgb(200, 7, 7)" :
                       i === 1 ? "rgb(245, 162, 38)" :
                       i === 2 ? "rgb(4, 138, 4)" :
                       i === 3 ? "rgb(0, 115, 255)" :
                       i === 4 ? "rgb(177, 79, 255)" : "rgb(200, 7, 7)",
          borderWidth: 2.5,
          pointRadius: 2,
          data: asset.prices,
          fill: true,
          backgroundColor: i === 0 ? "rgba(200, 7, 7, .1)" :
                           i === 1 ? "rgba(245, 162, 38, .1)" :
                           i === 2 ? "rgba(4, 138, 4, .1)" :
                           i === 3 ? "rgba(0, 115, 255, .1)" :
                           i === 4 ? "rgba(177, 79, 255, .1)" : "rgba(200, 7, 7, .1)",
          backgroundOpacity: .1,
        })
    })

    setData({
      labels: topAssets.length > 0 ? new Array(topAssets[0].prices.length).fill("") : [""],
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
      <h2>Top Holdings by Price</h2>
      <Line data={data} options={options} />
    </div>
  )
};

export default Graph;