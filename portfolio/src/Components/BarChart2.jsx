
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart2 = ({ xData, yData1 }) => {
  const data = {
    labels: xData,
    datasets: [
      {
        label: 'Price',
        data: yData1,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate the minimum value in yData
  const minYValue = Math.min(...yData1);

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
        beginAtZero: false, // Set to false to use custom min value
        min: minYValue-2,     // Set the min value to the minimum of yData
        ticks: {
          stepSize: 0.5,     // Optional: Set the interval between ticks
        },
      },
    },
  };

  return <Bar data={data} options={options} height={400} width={800} />;
};

export default BarChart2;