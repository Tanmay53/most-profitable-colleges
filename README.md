# most-profitable-colleges

## Project Setup

1. Clone the repository.
2. Run `make start`
3. Visit: localhost:3000

## Goals and Objectives:

[x] Develop a script to retrieve university data from the Data USA API.
[x] Calculate profitability scores for universities based on average salary and tuition fees.
[x] Create a sorted list of universities based on profitability scores.
[x] Present the results in an organized and user-friendly format.

## API Endpoints

Name | Endpoint
-|-
Average wage for every CIP2 | https://xenotime.datausa.io/api/data?drilldowns=CIP2&measures=Average%20Wage&Workforce%20Status=true
Major completions for every CIP2 in every University | https://xenotime.datausa.io/api/data?drilldowns=CIP2,University&measures=Completions&Degree=3
State Tuition Fees for every University | https://xenotime.datausa.io/api/data?drilldowns=University&measures=State%20Tuition

## Calculation Logics

### Average Wage for a University

$A_{U} = \frac{\sum_D (A_{D} * C_{D})}{\sum_D C_{D}}$

Where,

D = Degree

$A_{D}$ = Average Wage for the Degree

$C_{D}$ = Major Completion for the Degree in the University

$A_{U}$ = Average Wage for the University

### Profitability Ratio for a University

$P_{U} = \frac{A_{U}}{F_{U}}$

Where,

$A_{U}$ = Average Wage for the University

$F_{U}$ = State Tuition Fees for the University

$P_{U}$ = Profitability Ratio for the University