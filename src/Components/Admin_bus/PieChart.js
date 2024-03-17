// Assuming this is inside your ChartComponent in PieChart.js or a similar file

import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({ chartData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Check if there is an existing chart instance
      if (chartInstance.current) {
        // Destroy the existing chart before creating a new one
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar', // or any other chart type
        data: chartData,
        options: {
          // your chart options
        },
      });
    }

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} width="400" height="200" style={{ width: '400px', aspectRatio: 'unset !important', height: '100px' }} />;

}

export default ChartComponent;
