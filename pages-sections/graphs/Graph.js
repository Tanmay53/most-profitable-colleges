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
import Button from "/components/CustomButtons/Button.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const yearCount = 5

const useStyles = makeStyles(styles);

export default function Graph(props) {
    const labels = Array(yearCount).fill('')
    const years = Object.keys(props.profitabilities)
    const latestYear = Math.max(...years)

    const chartRef = useRef(null)
    const classes = useStyles();
    const [ activeYear, setActiveYear ] = useState(latestYear)
    
    const data = years.reduce( (accumulator, year) => {
        let topUniversities = props.profitabilities[year].slice(0, yearCount)
        accumulator[year] = {
            datasets: [{
                data: topUniversities.map( university => {
                    return {
                        x: university.university_name,
                        y: university.ratio,
                        university: university.university_name,
                        average_wages: university.average_wages,
                        state_tuition_fees: university.state_tuition_fees
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
                text: props.label,
            },
            tooltip: {
                callbacks: {
                    title(tooltip) {
                        return tooltip[0].raw['university']
                    },
                    afterTitle(tooltip) {
                        return `Average Salary: ${tooltip[0].raw['average_wages'].toLocaleString('en-US')} \nState Tuition Fee: ${tooltip[0].raw['state_tuition_fees']}`
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return this.getLabelForValue(value).substr(0, props.labelSize) + "..."
                    }
                }
                // title: "adff"
            }
        }
    };

    return (
        <div className={props.className}>
            <Bar ref={chartRef} options={options} data={data[activeYear]} />
            <div className={classes.flexCenter}>
                {
                    years.map( year => 
                        <Button color={ year == activeYear ? "primary" : "default" } onClick={ () => setActiveYear(year)} size={props.buttonSize}>
                            { year }
                        </Button>
                    )
                }
            </div>
        </div>
    )
}