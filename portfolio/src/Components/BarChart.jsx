
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ xData, yData1, yData2 }) => {
  const data = {
    labels: xData,
    datasets: [
      {
        label: 'Amount spent',
        data: yData1,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Amount received',
        data: yData2,
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate the minimum value in yData
  const minYValue = Math.min(...yData1, ...yData2);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
        x:{
            barPercentage: 0.5,
            categoryPercentage: 0.5,
        },
      y: {
        beginAtZero: true, // Set to false to use custom min value
        // min: minYValue,     // Set the min value to the minimum of yData
        // ticks: {
        //   stepSize: 100,     // Optional: Set the interval between ticks
        // },
      },
    },
  };

  return <Bar data={data} options={options} height={400} width={400} />;
};

export default BarChart;

