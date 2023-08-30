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
import MainGraph from "../pages-sections/graphs/MainGraph";

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();

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
        <MainGraph />
      </div>
    </div>
  )
}
