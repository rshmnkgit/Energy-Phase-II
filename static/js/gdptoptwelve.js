// var dbpath = "../static/data/gdptoptwelve.json"

var dbpath = "http://127.0.0.1:5000/gdptoptwelve"

d3.json(dbpath).then(function (data) {
    console.log(data);
    //GDP for CHINA

    var china = data.filter(d => d.country === "Macao SAR, China");
    var year = china.map(d => d.year);
    var gdp_china = china.map(d => d.gdp);

    //GDP for Luxembourg

    var luxembourg = data.filter(d => d.country === "Luxembourg");
    var gdp_lux = luxembourg.map(d => d.gdp);

    //GDP for Switzerland

    var switzerland = data.filter(d => d.country === "Switzerland");
    var gdp_switz = switzerland.map(d => d.gdp);

    //GDP for Ireland
    var ireland = data.filter(d => d.country === "Ireland");
    var gdp_ireland = ireland.map(d => d.gdp);

    //GDP for Norway
    var norway = data.filter(d => d.country === "Norway");
    var gdp_norway = norway.map(d => d.gdp);

    //GDP for Iceland
    var iceland = data.filter(d => d.country === "Iceland");
    var gdp_iceland = iceland.map(d => d.gdp);

    //GDP for Singapore
    var singapore = data.filter(d => d.country === "Singapore");
    var gdp_singa = singapore.map(d => d.gdp);

    //GDP for United States
    var us = data.filter(d => d.country === "United States");
    var gdp_us = us.map(d => d.gdp);

    //GDP for Qatar
    var qatar = data.filter(d => d.country === "Qatar");
    var gdp_qatar = qatar.map(d => d.gdp);

    //GDP for North America
    var nort_us = data.filter(d => d.country === "North America");
    var gdp_nort_us = nort_us.map(d => d.gdp);

    //GDP for Denmark
    var denmark = data.filter(d => d.country === "Denmark");
    var gdp_denmark = denmark.map(d => d.gdp);

    //GDP for Australia
    var australia = data.filter(d => d.country === "Australia");
    var gdp_aus = australia.map(d => d.gdp);


    var trace1 = {
        x: year,
        y: gdp_lux,
        mode: 'markers',
        type: 'scatter',
        name: 'Luxemburg',
        marker: { size: 18 }
    };
    var trace2 = {
        x: year,
        y: gdp_china,
        mode: 'markers',
        type: 'scatter',
        name: 'China',
        marker: { size: 18 }
    };
    var trace3 = {
        x: year,
        y: gdp_switz,
        mode: 'markers',
        type: 'scatter',
        name: 'Switzerland',
        marker: { size: 18 }
    };
    var trace4 = {
        x: year,
        y: gdp_ireland,
        mode: 'markers',
        type: 'scatter',
        name: 'Ireland',
        marker: { size: 18 }
    };
    var trace5 = {
        x: year,
        y: gdp_norway,
        mode: 'markers',
        type: 'scatter',
        name: 'Norway',
        marker: { size: 18 }
    };
    var trace6 = {
        x: year,
        y: gdp_iceland,
        mode: 'markers',
        type: 'scatter',
        name: 'Iceland',
        marker: { size: 18 }
    };
    var trace7 = {
        x: year,
        y: gdp_singa,
        mode: 'markers',
        type: 'scatter',
        name: 'Singapore',
        marker: { size: 18 }
    };
    var trace8 = {
        x: year,
        y: gdp_us,
        mode: 'markers',
        type: 'scatter',
        name: 'US',
        marker: { size: 18 }
    };
    var trace9 = {
        x: year,
        y: gdp_qatar,
        mode: 'markers',
        type: 'scatter',
        name: 'Qatar',
        marker: { size: 18 }
    };
    var trace10 = {
        x: year,
        y: gdp_nort_us,
        mode: 'markers',
        type: 'scatter',
        name: 'North America',
        marker: { size: 18 }
    };
    var trace11 = {
        x: year,
        y: gdp_denmark,
        mode: 'markers',
        type: 'scatter',
        name: 'Denmark',
        marker: { size: 18 }
    };
    var trace12 = {
        x: year,
        y: gdp_aus,
        mode: 'markers',
        type: 'scatter',
        name: 'Australia',
        marker: { size: 18 }
    };
    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8, trace9, trace10, trace11, trace12];

    var layout = {
        title: 'Top Twelve Countries GDP Per Capita',
        xaxis: {title: "Year"},
        yaxis: {
            title: "GDP Per Capita (USD)",
            autotick: true,
            ticks: 'outside',
            tick0: 0,
            dtick: 0.25,
            ticklen: 8,
            tickwidth: 4
        }
    };

    Plotly.newPlot("plot", data, layout);

    
});