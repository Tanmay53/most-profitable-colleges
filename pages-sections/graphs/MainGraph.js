import { React, useRef, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import profitabilities from "/data/filtered/profitabilities.json"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const yearCount = 5

const labels = Array(yearCount).fill('')
const years = Object.keys(profitabilities)
const latestYear = Math.max(...years)

export const data = years.reduce( (accumulator, year) => {
    let topUniversities = profitabilities[year].slice(0, yearCount)
    accumulator[year] = {
        datasets: [{
            data: topUniversities.map( university => {
                return {
                    x: university.university_name.substr(0, 20) + "...",
                    y: university.ratio,
                    university: university.university_name
                }
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 2
        }]
    }
    return accumulator
}, {})

    
const options = {
    responsive: true,
    plugins: {
    legend: {
        display: false
    },
    title: {
        display: true,
        text: 'Most Profitable Colleges for Students',
    },
    tooltip: {
        callbacks: {
            title(tooltip) {
                return tooltip[0].raw['university']
            }
        }
    }
    },
};

const useStyles = makeStyles(styles);

export default function MainGraph() {
    const classes = useStyles();

    const chartRef = useRef(null);

    const [ activeYear, setActiveYear ] = useState(latestYear)

    return (
        <div className={classes.sections}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <Bar ref={chartRef} options={options} data={data[activeYear]} />
                </div>
            </div>
        </div>
    )
}