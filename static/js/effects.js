
// var dbpath = "http://127.0.0.1:5000/airpollution"
// var gdpdata_path = "http://127.0.0.1:5000/countrygdpdata"
// var energy_data_path = "http://127.0.0.1:5000/energysource"

var dbpath = "https://renewable-energy-herokuapp.herokuapp.com/airpollution"
var gdpdata_path = "https://renewable-energy-herokuapp.herokuapp.com/countrygdpdata"
var energy_data_path = "https://renewable-energy-herokuapp.herokuapp.com/energysource"

// var country_list_1 = []
// var country_list_2 = []
// var country_list_3 = []

d3.json(dbpath).then(function (air_dataSample) {
    console.log(air_dataSample);
    var air_countries = air_dataSample.map(d => d.country)
    var air_uniqueNames = air_countries.filter((value, index, self) => self.indexOf(value) === index);

    d3.json(gdpdata_path).then(function (gdp_dataSample) {
        var filteredArray1 = gdp_dataSample.filter( function( el ) {
            return air_uniqueNames.includes( el.country );
        });
        var gdp_countries = filteredArray1.map(d => d.country)
        var gdp_uniqueNames = gdp_countries.filter((value, index, self) => self.indexOf(value) === index);
        console.log("filtered")
        console.log(gdp_uniqueNames)

        d3.json(energy_data_path).then(function (src_dataSample) {
            var filteredArray2 = src_dataSample.filter( function( el ) {
                return gdp_uniqueNames.includes( el.country );
            });
            var src_countries = filteredArray2.map(d => d.country)
            var src_uniqueNames = src_countries.filter((value, index, self) => self.indexOf(value) === index);
            console.log("filtered")
            console.log(src_uniqueNames)

            src_uniqueNames.forEach(item =>
                d3.select("#selDataset")
                        .append("option")
                        .text(item)
                );
        });
    });
});


// d3.json(dbpath).then(function (dataSample) {
//     console.log(dataSample);
//     var countries = dataSample.map(d => d.country)
//     var uniqueNames = countries.filter((value, index, self) => self.indexOf(value) === index);
//     // console.log(uniqueNames)
//     uniqueNames.forEach(item =>
//         d3.select("#selDataset")
//             .append("option")
//             .text(item)
//     );
// });

// Function to plot line chart for deaths due to air pollution - country wise
function lineChart(selectedCountry) {
    d3.json(dbpath).then(function (dataSample) {
        
        var dataObj = dataSample.filter(data => data.country === selectedCountry && data.year >= 2000);

        // console.log(dataObj);
        getYears = dataObj.map(data => data.year)

        // dataObj = dataObj.reverse();
        // console.log(getYears);

        var trace1 = {
            x: dataObj.map(data => data.year),
            y: dataObj.map(data => data.death_under_5),
            mode: 'lines+markers',
            name: 'death under 5'
        };

        var trace2 = {
            x: dataObj.map(data => data.year),
            y: dataObj.map(data => data.death_5_14),
            marker: { type: "diamond" },
            mode: 'lines+markers',
            name: 'death 5-14 years'
        };

        var trace3 = {
            x: dataObj.map(data => data.year),
            y: dataObj.map(data => data.death_15_49),
            // line: {color: "rgb(219, 64, 82)"},
            marker: { type: "cross-dot" },
            mode: 'lines+markers',
            name: "death 15-49 years"
        };

        var trace4 = {
            x: dataObj.map(data => data.year),
            y: dataObj.map(data => data.death_50_59),
            mode: 'lines+markers',
            name: "death 50-69 years"
        };

        var trace5 = {
            x: dataObj.map(data => data.year),
            y: dataObj.map(data => data.death_over_70),
            mode: 'lines+markers',
            name: "death over 70 years"
        };

        var data = [trace1, trace2, trace3, trace4, trace5];

        var layout = {
            title: 'Deaths due to air pollution',
            xaxis: { title: "Year" },
            yaxis: { title: "Death Rate" }
        };

        Plotly.newPlot('myDiv', data, layout);
    });
}

// import Chart from 'chart.js';
function polarAreaChart(selectedCountry) {
    d3.json(gdpdata_path).then(function (dataSample) {
        console.log(dataSample)

        getCountries = (dataSample.map(d => d.gdp));
        // console.log(getCountries)

        var dataObj = dataSample.filter(data => data.country === selectedCountry);
        // dataObj = dataObj.reverse();

        var ctx = document.getElementById('myChart');
        var data = {
            datasets: [{
                data: dataObj.map(d => d.gdp.toFixed(3)),
                backgroundColor: [
                    "#RRGGBB", "#800000", "#8B0000", "#A52A2A", "#B22222",
                    "#DC143C", "#FF0000", "#FF6347", "#FF7F50", "#CD5C5C",
                    "#F08080", "#E9967A", "#FA8072", "#FFA07A", "#FF4500",
                    "#FF8C00", "#FFA500", "#FFD700", "#B8860B", "green"
                ],
            }],

            labels: dataObj.map(d => d.year)  //<-- added labels

        };
        var chartOptions = {
            startAngle: -Math.PI / 4,
            legend: {
                position: 'left'
            },
            title: {
                display: true,
                text: 'GDP Per Capita over last 20 years'
            },
            animation: {
                animateRotate: false
            }
        };
        var myChart = new Chart(ctx, {
            data: data,
            type: 'polarArea',
            options: chartOptions
        });
    });
}

function bubbleChart(selectedCountry) {
// #-------------------------------------
    d3.json(energy_data_path).then(function (dataSample) {
        console.log(dataSample);  
        console.log(selectedCountry)
        var country_us = dataSample.filter(d => d.country === selectedCountry);
        console.log(country_us);   
        var year_00_19 = country_us.filter(d => d.year >= 2000);
        // console.log(year_00_19);
        var year = year_00_19.map(d => d.year);
        // console.log(year);
        var uniqueYear = year.filter((value, index, self) => self.indexOf(value) === index);
        // var uniqueYear = year.filter(distinct);
        console.log(uniqueYear);
        var solar_en = year_00_19.filter(d => d.source === "Solar")
        //    console.log(solar_en);
        var sol_unit = solar_en.map(d => d.units);
        console.log(sol_unit);
        var wind_en = year_00_19.filter(d => d.source === "Wind")
        //    console.log(wind_en);
        var wind_unit = wind_en.map(d => d.units);
        console.log(wind_unit);
        var hydro_en = year_00_19.filter(d => d.source === "Hydro")
        //    console.log(hydro_en);
        var hydro_unit = hydro_en.map(d => d.units);
        console.log(hydro_unit);
        var trace1 = {
            x: uniqueYear,
            y: sol_unit,
            mode: 'markers',
            name: 'Solar',
            marker: {
                color: 'orange',
                size: 14,
                //   opacity: [0.6, 0.7, 0.8, 0.9],
                symbol: 'square'
            },
            type: 'scatter'
        };
        var trace2 = {
            x: uniqueYear,
            y: wind_unit,
            mode: 'markers',
            name: 'Wind',
            marker: {
                color: 'rgb(31, 119, 180)',
                size: 14,
                symbol: 'circle'
            },
            type: 'scatter'
        };

        var trace3 = {
            x: uniqueYear,
            y: hydro_unit,
            mode: 'markers',
            name: 'Hydropower',
            marker: {
                size: 14,
                //   line: {
                color: 'red',
                //     width: [2, 2, 6, 2]
                //   },
                symbol: 'diamond'
            },
            type: 'scatter'
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            showlegend: true,
            xaxis: { title: 'Year' },
            yaxis: { title: 'Units (Twh)' },
            title: 'Energy Production over last 20 years'
        };

        Plotly.newPlot('bubble', data, layout);
    });    
}
// ----------------------------------------


function optionChanged(selectItem) {
    console.log("optionChanged.......")
    polarAreaChart(selectItem)
    bubbleChart(selectItem)
    lineChart(selectItem)
}

function init() {
    d3.json(energy_data_path).then(function (dataSample) {                
        var firstItem = dataSample[0].country;
        console.log(`first item :  ${firstItem}`);
        polarAreaChart("Algeria");
        bubbleChart("Algeria");
        lineChart("Algeria");
    });
}

// init()

