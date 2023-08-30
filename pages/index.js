import React, { Component } from "react";
import Router from "next/router";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import classNames from "classnames";
import Graph from "../pages-sections/graphs/Graph";
// import AverageSalaryGraph from "../pages-sections/graphs/AverageSalaryGraph";
import profitabilities from "/data/filtered/profitabilities.json"

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
  const years = Object.keys(profitabilities)

  const heighestWageProfitabilities = years.reduce( (accumulator, year) => {
    accumulator[year] = [...profitabilities[year]].sort( (a, b) => b.average_wages - a.average_wages )
    return accumulator
  }, {})

  const lowestWageProfitabilities = years.reduce( (accumulator, year) => {
    accumulator[year] = [...profitabilities[year]].sort( (a, b) => a.average_wages - b.average_wages )
    return accumulator
  }, {})

  const heighestFeesProfitabilities = years.reduce( (accumulator, year) => {
    accumulator[year] = [...profitabilities[year]].sort( (a, b) => b.state_tuition_fees - a.state_tuition_fees )
    return accumulator
  }, {})

  const lowestFeesProfitabilities = years.reduce( (accumulator, year) => {
    accumulator[year] = [...profitabilities[year]].sort( (a, b) => a.state_tuition_fees - b.state_tuition_fees )
    return accumulator
  }, {})

  return (
    <div>
      <Header
        brand="Most Profitable Colleges"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />
      <Parallax image="/img/college.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Most Profitable Colleges</h1>
                <h3 className={classes.subtitle}>
                  A compilation of the most economical colleges in USA.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.sections}>
          <div className={classes.container}>
            <Graph
              profitabilities={profitabilities}
              label="Most profitable colleges for students"
              buttonSize="sm"
              labelSize="20"
            />
            <div className={classNames(classes.flexCenter, classes.marginY)}>
              <Graph
                profitabilities={heighestWageProfitabilities}
                label="Profitability of colleges with heighest Average Salary"
                buttonSize="xs"
                labelSize="10"
                className={classes.w50}
              />
              <Graph
                profitabilities={lowestWageProfitabilities}
                label="Profitability of colleges with lowest Average Salary"
                buttonSize="xs"
                labelSize="10"
                className={classes.w50}
              />
            </div>
            <div className={classNames(classes.flexCenter, classes.marginY)}>
              <Graph
                profitabilities={heighestFeesProfitabilities}
                label="Profitability of colleges with heighest State Tuition Fees"
                buttonSize="xs"
                labelSize="10"
                className={classes.w50}
              />
              <Graph
                profitabilities={lowestFeesProfitabilities}
                label="Profitability of colleges with lowest State Tuition Fees"
                buttonSize="xs"
                labelSize="10"
                className={classes.w50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
