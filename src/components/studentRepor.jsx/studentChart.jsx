import React, { Component } from "react";
import Chart from "react-apexcharts";

const StudentChart = ({series, categories}) => {
    let options =  {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: categories
        },
      }
      series = [
        {
          name: "series-1",
          data: series
        }
      ]
    
  
    return (
            <Chart
            type="line"
            options={options}
            series={series}
            width={"100%"}
            />
    )
}

export {StudentChart}