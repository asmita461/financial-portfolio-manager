
import React, {useEffect, useRef} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ xData, yData }) => {
  const chartRef2 = useRef(null);
  const data = {
    labels: xData, // X-axis labels
    datasets: [
      {
        label: 'My Dataset',
        data: yData, // Y-axis data
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        fill: true,
        tension: 0.4, // Curved lines
      },
    ],
  };

  const minYvalue = Math.min(...yData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales:{
        y:{
            beginAtZero: false,
            min: minYvalue,
            ticks: {
                stepSize: 5,
            },
        }
    }
  };

  useEffect(()=>{
    const chartInstance = chartRef2.current;
    return () => {
    if(chartInstance && chartInstance.chart){
        chartInstance.chart.destroy();
    }
    };
  },[]);

  return <Line ref={chartRef2} data={data} options={options} height={300} width={600} />;
};

export default LineChart;

