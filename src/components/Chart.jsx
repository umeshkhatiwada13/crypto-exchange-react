import React from 'react';
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";


ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const Chart = ({ array = [], currency, days }) => {
    const prices = [];
    const date = [];

    for (let index = 0; index < array.length; index++) {
        //show hourly data in case of last 24 hours else show daily data
        date.push(days === "24h" ? new Date(array[index][0]).toLocaleTimeString() :
            new Date(array[index][0]).toLocaleDateString());
        prices.push(array[index][1]);
    }

    return (
        <Line options={{
            responsive: true,
        }}
            data={
                {
                    labels: date,
                    datasets: [{
                        label: `Price in ${currency}  Time Duration: ${days}`,
                        data: prices,
                        borderColor: "rgb(255,99,132)",
                        backgroundColor: "rgba(255,99,132,0.5)"
                    }]
                }
            }></Line>
    )
}

export default Chart