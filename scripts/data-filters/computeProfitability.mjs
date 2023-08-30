import * as fs from 'node:fs/promises';

var dataStore = {}

var averageWages = await getSimplifiedAverageWages()
// averageWages[year][degree_id] = Average Wage

var majorCompletions = await getSimplifiedMajorCompletions()
// mojorCompletions[year][university_id][degree_id] = Completions for the Degree

var tuitionFeesData = await getSimplifiedTuitionFeesData()
// tuitionFees[year][university_id] = { state_tuition_fee, university_name }

var feasibleYears = intersection(
    intersection(
        Object.keys(averageWages),
        Object.keys(majorCompletions)
    ),
    Object.keys(tuitionFeesData)
)

// profitabilities[year] = { university_id, university_name, average_wages, state_tuition_fee, ratio }
var profitabilities = feasibleYears.reduce( (accumulator, year) => {
    accumulator[year] = Object.keys(tuitionFeesData[year]).reduce( (accumulator_1, university_id) => {
        let universityCompletions = majorCompletions[year][university_id]

        if( universityCompletions ) {
            // Sum of Completions for every degree in the University
            let totalCompletions = 0

            // Sum of product of completions and average salary for every degree in the University
            let totalSalaryCompletionProduct = 0

            Object.keys(universityCompletions)
                .forEach( degree_id => {
                    if(averageWages[year][degree_id] && universityCompletions[degree_id] ) {
                        totalCompletions += universityCompletions[degree_id]
                        totalSalaryCompletionProduct += averageWages[year][degree_id] * universityCompletions[degree_id]
                    }
                })

            let average_wages = totalCompletions == 0 ? 0 : totalSalaryCompletionProduct / totalCompletions

            let ratio = average_wages / tuitionFeesData[year][university_id].state_tuition_fees

            accumulator_1.push({
                'university_id': university_id,
                'university_name': tuitionFeesData[year][university_id].university_name,
                'average_wages': average_wages,
                'state_tuition_fees': tuitionFeesData[year][university_id].state_tuition_fees,
                'ratio': ratio
            })
        }

        return accumulator_1
    }, [])
    .sort( (a, b) => b.ratio - a.ratio )

    return accumulator
}, {})

fs.writeFile("./data/filtered/profitabilities.json", JSON.stringify(profitabilities))

async function getSimplifiedAverageWages() {
    let AverageWages = JSON.parse(await fs.readFile("./data/datausa/AverageWageForEveryCIP2.json"));
    let simplifiedWages = {}

    AverageWages.data.forEach( (wageRecord) => {
        populateIfUndefined(simplifiedWages, wageRecord['ID Year'], {})
    
        if( simplifiedWages[wageRecord['ID Year']][wageRecord['ID CIP2']] != undefined ) {
            console.error(`Duplicate found for Year: ${wageRecord['ID Year']}, CIP2: ${wageRecord['ID CIP2']}.`)
            console.error(`Original Average: ${simplifiedWages[wageRecord['ID Year']][wageRecord['ID CIP2']]}`)
            console.error(`New Average: ${wageRecord['Average Wage']}`)
        }
    
        simplifiedWages[wageRecord['ID Year']][wageRecord['ID CIP2']] = wageRecord['Average Wage']
    })

    return simplifiedWages
}

async function getSimplifiedMajorCompletions() {
    let MajorCompletions = JSON.parse(await fs.readFile("./data/datausa/MajorCompletionsForEveryCIP2inEveryUniversity.json"))
    let simplified = {}

    MajorCompletions.data.forEach( (record) => {
        populateIfUndefined(simplified, record['ID Year'],{})

        populateIfUndefined(simplified[record['ID Year']], record['ID University'], {})

        if( simplified[record['ID Year']][record['ID University']][record['ID CIP2']] != undefined ) {
            console.error(`Duplicate found for Year: ${record['ID Year']}, University: ${record['ID University']} CIP2: ${record['ID CIP2']}.`)
            console.error(`Original Average: ${simplified[record['ID Year']][record['ID University']][record['ID CIP2']]}`)
            console.error(`New Average: ${record['Completions']}`)
        }
    
        simplified[record['ID Year']][record['ID University']][record['ID CIP2']] = record['Completions']  
    })

    return simplified
}

async function getSimplifiedTuitionFeesData() {
    let TuitonFees = JSON.parse(await fs.readFile("./data/datausa/StateTuitionFeesForEveryUniversity.json"))
    let simplified = {}

    TuitonFees.data.forEach( record => {
        populateIfUndefined(simplified, record['ID Year'], {})
    
        if( simplified[record['ID Year']][record['ID University']] != undefined ) {
            console.error(`Duplicate found for Year: ${record['ID Year']}, CIP2: ${record['ID University']}.`)
            console.error(`Original Average: ${simplified[record['ID Year']][record['ID University']]}`)
            console.error(`New Average: ${record['State Tuition']}`)
        }
    
        simplified[record['ID Year']][record['ID University']] = {
            state_tuition_fees: record['State Tuition'],
            university_name: record['University']
        }
    })

    return simplified;
}

function populateIfUndefined(array, key, value) {
    if( array[key] == undefined )
        array[key] = value
}

function intersection(array1, array2) {
    return array1.filter( value => array2.includes(value) )
}

