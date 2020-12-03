// var dbpath = "../static/data/energymerged.json"
dbpath = "http://127.0.0.1:5000/energymerged"


d3.json(dbpath).then(function (dataSample) {
    console.log(dataSample);
    var filteredData = dataSample.filter(data => data.source !== "Biofuels");
    var countries = filteredData.map(d => d.country)
    var uniqueNames = countries.filter((value, index, self) => self.indexOf(value) === index);
    uniqueNames.sort()
    console.log(uniqueNames)
    uniqueNames.forEach(item =>
        d3.select("#selectButton")
            .append("option")
            .text(item)
    );
});

// Function to plot line chart for deaths due to air pollution - country wise
function stackBarChart(selectedId) {
    d3.json(dbpath).then(function (dataSample) {
        selectedCountry = dataSample[0].country;
        var dataObj = dataSample.filter(data => data.country === selectedId);
        var solarObj = dataObj.filter(data => data.source === "Solar");
        var windObj = dataObj.filter(data => data.source === "Wind");
        var hydroObj = dataObj.filter(data => data.source === "Hydro");

        console.log(solarObj);
        getYears = dataObj.map(data => data.year)

        // dataObj = dataObj.reverse();
        //console.log(getYears);
        
        var trace1 = {
            x: dataObj.map(data => data.year),
            y: solarObj.map(data =>data.units),
            type:"bar",
            name:'Solar Energy'
        };

        var trace2 = {
            x: dataObj.map(data => data.year),
            y: windObj.map(data =>data.units),
            type:"bar",
            name: 'Wind Energy'
        };

        var trace3 = {
            x: dataObj.map(data => data.year),
            y: hydroObj.map(data =>data.units),
            // line: {color: "rgb(219, 64, 82)"},
            type:"bar",
            name: "Hydro Energy"
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            title: 'Renewable Energy Generation by Country (Twh)',
            xaxis: { title: "Year" },
            yaxis: { title: "Units(Twh)" },
            barmode:'stack'
        };

        Plotly.newPlot('myDiv', data, layout);
    });
}

function consumePChart(selectedId) {
    d3.json(dbpath).then(function (dataSample) {
        // selectedCountry = dataSample[0].country;
        var dataObj = dataSample.filter(data => data.country === selectedId);
        var solarObj = dataObj.filter(data => data.source === "Solar");
        var windObj = dataObj.filter(data => data.source === "Wind");
        var hydroObj = dataObj.filter(data => data.source === "Hydro");

        console.log(solarObj);
        getYears = dataObj.map(data => data.year)

        // dataObj = dataObj.reverse();
        //console.log(getYears);
        
        var trace1 = {
            x: dataObj.map(data => data.year),
            y: solarObj.map(data =>data.percent),
            type:"bar",
            name:'Solar Energy'
        };

        var trace2 = {
            x: dataObj.map(data => data.year),
            y: windObj.map(data =>data.percent),
            type:"bar",
            name: 'Wind Energy'
        };

        var trace3 = {
            x: dataObj.map(data => data.year),
            y: hydroObj.map(data =>data.percent),
            // line: {color: "rgb(219, 64, 82)"},
            type:"bar",
            name: "Hydro Energy"
        };

        var data = [trace1, trace2, trace3];

        var layout = {
            title: 'Renewable Energy Consumption by Country (Twh)',
            xaxis: { title: "Year" },
            yaxis: { title: "Consumption (Twh)" },
            barmode:'stack'
        };

        Plotly.newPlot('plot-perc', data, layout);
    });
}

function solarChart(selectedId) {
    d3.json(dbpath).then(function (dataSample) {
        // selectedCountry = dataSample[0].country;
        var dataObj = dataSample.filter(data => data.country === selectedId);
        var solarObj = dataObj.filter(data => data.source === "Solar");

        // var xConsume = solarObj.map(data =>data.percent);
        // var yConsume = dataObj.map(data => data.year);
        // var xGenerate = solarObj.map(data =>data.units);           
        // var yNetworth = dataObj.map(data => data.year);

        var xConsume = solarObj.map(data =>data.percent);
        var yConsume = dataObj.map(data => data.year);
        var xGenerate = solarObj.map(data =>data.units);           
        var yGenerate = dataObj.map(data => data.year);

        var minSolarG = d3.min(xGenerate);
        var maxSolarG = d3.max(xGenerate);
        var minSolarC = d3.min(xConsume);
        var maxSolarC = d3.max(xConsume);

        interval_1 = ((maxSolarC - minSolarC)/5).toFixed(0)
        interval_2 = ((maxSolarG - minSolarG)/5).toFixed(0)

          var trace1 = {
            x: xGenerate,
            y: yGenerate,
            xaxis: 'x1',
            yaxis: 'y1',
            type: 'bar',
            marker: {
              color: 'rgba(50,171,96,0.6)',
              line: {
                color: 'rgba(50,171,96,1.0)',
                width: 1
              }
            },
            name: 'Solar Energy Generation',
            orientation: 'h'
          };
          
          var trace2 = {
            x: xConsume,
            y: yConsume,
            xaxis: 'x2',
            yaxis: 'y1',
            mode: 'lines+markers',
            line: {
              color: 'rgb(128,0,128)'
            },
            name: 'Solar Energy Consumption'
          };
          
          var data = [trace1 ,trace2];
        //   var data = [trace2];
          
          
          var layout = {
            title: 'Solar Energy Generation vs Consumption',
            yaxis: {
                title: 'Year'
            },
            xaxis1: {
                title: 'Units (Twh)',
                range: [minSolarG, maxSolarG],
                domain: [0, 0.5],
                zeroline: false,
                showline: false,
                showticklabels: true,
                showgrid: true
            },
            xaxis2: {
              range: [minSolarC, maxSolarC],
              domain: [0.5, 1],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true,
              side: 'top',
              dtick: interval_2
            },
            legend: {
              x: 0.029,
              y: 1.238,
              font: {
                size: 10
              }
            },
            margin: {
              l: 100,
              r: 20,
              t: 200,
              b: 70
            },
            width: 500,
            height: 600,
            paper_bgcolor: 'rgb(248,248,255)',
            plot_bgcolor: 'rgb(248,248,255)',
            annotations: [
              {
                xref: 'paper',
                yref: 'paper',
                x: -0.2,
                y: -0.109,
                text: 'Solar Energy Generartion',
                showarrow: false,
                font:{
                  family: 'Arial',
                  size: 10,
                  color: 'rgb(150,150,150)'
                }
              }
            ]
          };
        Plotly.newPlot('plot-solar', data, layout);
    });
}


//***********Wind */
function windChart(selectedId) {
    d3.json(dbpath).then(function (dataSample) {
        selectedCountry = dataSample[0].country;
        var dataObj = dataSample.filter(data => data.country === selectedId);
        var windObj = dataObj.filter(data => data.source === "Wind");
        
        var xConsume = windObj.map(data =>data.percent);  //consumption
        var yConsume = dataObj.map(data => data.year);

        var xGenerate = windObj.map(data =>data.units);   //generation
        var yGenerate = dataObj.map(data => data.year);

        var minWindG = d3.min(xGenerate);
        var maxWindG = d3.max(xGenerate);
        var minWindC = d3.min(xConsume);
        var maxWindC = d3.max(xConsume);

        interval_1 = ((maxWindG - minWindG)/5).toFixed(0)
        interval_2 = ((maxWindC - minWindC)/5).toFixed(0)

          var trace1 = {
            x: xGenerate,
            y: yGenerate,
            xaxis: 'x1',
            yaxis: 'y1',
            type: 'bar',
            marker: {
              color: 'rgba(50,171,96,0.6)',
              line: {
                color: 'rgba(50,171,96,1.0)',
                width: 1
              }
            },
            name: 'Wind Energy Generation',
            orientation: 'h'
          };
          
          var trace2 = {
            x: xConsume,
            y: yConsume,
            xaxis: 'x2',
            yaxis: 'y1',
            mode: 'lines+markers',
            line: {
              color: 'rgb(128,0,128)'
            },
            name: 'Wind Energy Consumption'
          };
          
          var data = [trace1, trace2];  //trace1 - consumption,  trace2 - generation
          
          var layout = {
            title: 'Wind Energy Generation vs Consumption',
            xaxis1: {
              range: [minWindG, maxWindG],
              domain: [0, 0.5],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true
            },
            xaxis2: {
              range: [minWindC, maxWindC],
              domain: [0.5, 1],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true,
              side: 'top',
              dtick: interval_2
            },
            legend: {
              x: 0.029,
              y: 1.238,
              font: {
                size: 10
              }
            },
            margin: {
              l: 100,
              r: 20,
              t: 200,
              b: 70
            },
            width: 500,
            height: 600,
            paper_bgcolor: 'rgb(248,248,255)',
            plot_bgcolor: 'rgb(248,248,255)',
            annotations: [
              {
                xref: 'paper',
                yref: 'paper',
                x: -0.2,
                y: -0.109,
                text: 'Wind Energy Generartion',
                showarrow: false,
                font:{
                  family: 'Arial',
                  size: 10,
                  color: 'rgb(150,150,150)'
                }
              }
            ]
          };
        Plotly.newPlot('plot-wind', data, layout);
    });
}

//***********Hydro */
function hydroChart(selectedId) {
    d3.json(dbpath).then(function (dataSample) {
        selectedCountry = dataSample[0].country;
        var dataObj = dataSample.filter(data => data.country === selectedId);
        var hydroObj = dataObj.filter(data => data.source === "Hydro");
        
        var xConsume = hydroObj.map(data =>data.percent);
        var yConsume = dataObj.map(data => data.year);
        var xGenerate = hydroObj.map(data =>data.units);     
        var yGenerate = dataObj.map(data => data.year);

        var minHydroG = d3.min(xGenerate);
        var maxHydroG = d3.max(xGenerate);
        var minHydroC = d3.min(xConsume);
        var maxHydroC = d3.max(xConsume);

        interval_1 = ((maxHydroG - minHydroG)/5).toFixed(0)
        interval_2 = ((maxHydroC - minHydroC)/5).toFixed(0)

          var trace1 = {
            x: xGenerate,
            y: yGenerate,
            xaxis: 'x1',
            yaxis: 'y1',
            type: 'bar',
            marker: {
              color: 'rgba(50,171,96,0.6)',
              line: {
                color: 'rgba(50,171,96,1.0)',
                width: 1
              }
            },
            name: 'Hydro Energy Generation',
            orientation: 'h'
          };
          
          var trace2 = {
            x: xConsume,
            y: yConsume,              
            xaxis: 'x2',
            yaxis: 'y1',
            mode: 'lines+markers',
            line: {
              color: 'rgb(128,0,128)'
            },
            name: 'Hydro Energy Consumption'
          };
          
          var data = [trace1, trace2];
          
          var layout = {
            title: 'Hydro Energy Generation vs Consumption',
            xaxis1: {
              range: [minHydroG, maxHydroG],
              domain: [0, 0.5],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true
            },
            xaxis2: {
              range: [minHydroC, maxHydroC],
              domain: [0.5, 1],
              zeroline: false,
              showline: false,
              showticklabels: true,
              showgrid: true,
              side: 'top',
              dtick: interval_2
            },
            legend: {
              x: 0.029,
              y: 1.238,
              font: {
                size: 10
              }
            },
            margin: {
              l: 100,
              r: 20,
              t: 200,
              b: 70
            },
            width: 600,
            height: 600,
            paper_bgcolor: 'rgb(248,248,255)',
            plot_bgcolor: 'rgb(248,248,255)',
            annotations: [
              {
                xref: 'paper',
                yref: 'paper',
                x: -0.2,
                y: -0.109,
                text: 'Hydro Energy Generartion',
                showarrow: false,
                font:{
                  family: 'Arial',
                  size: 10,
                  color: 'rgb(150,150,150)'
                }
              }
            ]
          };
        Plotly.newPlot('plot-hydro', data, layout);
    });
}


//*********Option Change */
function optionChanged(selectItem) {
    console.log("optionChanged.......")
    stackBarChart(selectItem)
    consumePChart(selectItem)
    solarChart(selectItem)
    windChart(selectItem)
    hydroChart(selectItem)
}
function init() {
    d3.json(dbpath).then(function (dataSample) {                
        var firstItem = dataSample[0].country;
        console.log(`first item :  ${firstItem}`);
        stackBarChart(firstItem);
        consumePChart(firstItem);
        solarChart(firstItem);
        windChart(firstItem);
        hydroChart(firstItem)
    });
}
init()


