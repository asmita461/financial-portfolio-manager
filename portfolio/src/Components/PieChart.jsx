
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ labels, dataValues }) => {
    const total = dataValues.reduce((acc,value)=> acc+value,0);
  const data = {
    labels: labels, // Labels for each segment of the pie chart
    datasets: [
      {
        label: 'My Dataset',
        data: dataValues, // Data for each segment of the pie chart
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
      },
      tooltip: {
        callbacks: {
            label: function (tooltipItem){
                const value = dataValues[tooltipItem.dataIndex];
                const percentage = ((value/total)*100).toFixed(2);
                return `${percentage}%`;
            }
        }
      },
      datalabels:{
        formatter: (value,ctx)=>{
            const percentage =((value/total)*100).toFixed(2);
            return `${percentage}%`
        },
        color: '#fff',
        labels: {
            title: {
                font: {
                    size:'14'
                }
            }
        }
      }
    },
  };

  return <Pie data={data} options={options} height={400} width={800} />;
};

export default PieChart;

