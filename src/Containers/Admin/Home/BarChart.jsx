import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { Link } from "react-router-dom";



function BarChart( props) {
  const {basicCounts} = props

  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const chartInstance = useRef(null);
  const pieChartInstance = useRef(null);

  useEffect(() => {
    // Get the context of the canvas element for the first chart (Doughnut Chart)
    const ctx = chartRef.current.getContext("2d");

    const dataForm = ["Online", "Pay later"];

    const data = {
      labels: dataForm,
      datasets: [
        {
          label: "My First Dataset",
          data: [basicCounts?.data?.online_pay_count,basicCounts?.data?.pay_after_count],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            
          ],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    // Destroy existing Chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new Chart instance for the first chart
    chartInstance.current = new Chart(ctx, config);

    // Get the context of the canvas element for the second chart (Pie Chart)
    const pieCtx = pieChartRef.current.getContext("2d");

    const pieData = {
      labels: ["Today", "Yesterday"],
      datasets: [
        {
          data: [basicCounts?.data?.today_trips,basicCounts?.data?.yesterday_trips ],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverOffset: 4,
        },
      ],
    };

    const pieConfig = {
      type: "pie",
      data: pieData,
    };

    // Destroy existing Pie Chart instance before creating a new one
    if (pieChartInstance.current) {
      pieChartInstance.current.destroy();
    }

    // Create a new Pie Chart instance for the second chart
    pieChartInstance.current = new Chart(pieCtx, pieConfig);

    // Clean up the Chart instances when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
    };
  }, [basicCounts]);

  return (
    <>
      
          <div className="row mt-3">
            <div className="container flex grid grid-cols-2">
              <div
                className=" flex justify-center "
                style={{ height: "400px" }}
              >
                <canvas ref={chartRef}></canvas>
                <h6 style={{textAlign:"center"}}>Payment Mode</h6>
              </div>

              <div
                className=" flex justify-center "
                style={{ height: "400px" }}
              >
                <canvas ref={pieChartRef}></canvas>
                <h6 style={{textAlign:"center"}}>Today And Yesterday</h6>

              </div>
            </div>
          </div>
    
    </>
  );
}

export default BarChart;