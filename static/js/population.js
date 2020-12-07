
// var dbpath = "http://127.0.0.1:5000/uspopulation"
var energypath = "http://127.0.0.1:5000/usgeneration"


// Energy Production and Consumption
d3.json(energypath).then(function (dataSample) {
    var filterData = dataSample.filter(d => d.year >= 2000)

    console.log(filterData)
    years = filterData.map(d => d.year)
    production =  filterData.map(d => d.production)
    consumption = filterData.map(d => d.consumption)
    totals = filterData.map(d => d.total)
    console.log(production)

    var trace1 = {
        x: years,
        y: production,
        mode: 'bar',
        type: 'bar',
        name: 'Renewable Energy Production'
        // marker: { size: 18 }
    };
    var trace2 = {
        x: years,
        y: consumption,
        mode: 'line',
        name: 'Renewable Energy Consumption'
        // marker: { size: 18 }
    };
    var trace3 = {
        x: years,
        y: totals,
        mode: 'line',
        name: 'Total Energy Consumption'
        // marker: { size: 18 }
    };
    var data = [trace1, trace2, trace3]

    var layout = {
        title: 'Energy generation and consumption over the past 20 years',
        xaxis: {title: "Year"},
        yaxis: {
            title: "Trillion Btu",
            autotick: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4,
            margin: {
                t:10
            },
        }
    }
    Plotly.newPlot('plot-energy', data, layout);
});

// Population
// d3.json(dbpath).then(function (dataSample) {
//     console.log(dataSample)
//     years = dataSample.map(d => d.year)
//     population =  dataSample.map(d => d.population)
//     console.log(population)

//     var trace = {
//         x: years,
//         y: population,
//         mode: 'line',
//         // marker: { size: 18 }
//     };
//     var data = [trace]

//     var layout = {
//         title: 'Population increase over the past 10 years',
//         xaxis: {title: "Year"},
//         yaxis: {
//             title: "Population",
//             autotick: true,
//             ticks: 'outside',
//             tick0: 0,
//             dtick: 0.25,
//             ticklen: 8,
//             tickwidth: 4
//         }
//     }
//     Plotly.newPlot('plot-pop', data, layout);
// });