// var data_path="../static/data/energymerged.json"
// var data_path="../Resources/last_tenyear_renew_percent.csv"
data_path = "http://127.0.0.1:5000/tenyearrenewpercent"



d3.json(data_path).then(function(data){
    console.log(data);
    // var ten_year= data.filter(d=>d.year>=2010 && d.year<=2019);
    // // console.log(ten_year);
    
    year = [];
    for (var i=0;i<data.length;i++){
        year.push(data[i].Year);
    }
    console.log(year);
    // var uniqueYear = year.filter((value, index, self) => self.indexOf(value) === index);
    // // var uniqueYear = year.filter(distinct);
    // console.log(uniqueYear);
//%%%%%%%%%%%%% Solar Energy %%%%%%%%%%%%%%%%%%%%%%%%%%//
    // var solar_ten_year=ten_year.filter(d=>d.source==="Solar");
    // console.log("Solar: ", solar_ten_year);

    percent_solar=[];
    for (var i=0;i<data.length;i++){
        percent_solar.push(parseFloat(data[i].Solar_Perc).toFixed(3));
    }
    console.log(percent_solar);
//%%%%%%%%%%%%% Wind Energy %%%%%%%%%%%%%%%%%%%%%%%%%%//
// var Wind_ten_year=ten_year.filter(d=>d.source==="Wind");
    // console.log("Wind: ", Wind_ten_year);
    percent_wind=[];
    for (var i=0;i<data.length;i++){
        percent_wind.push(parseFloat(data[i].Wind_Perc).toFixed(3));
    }
    console.log(percent_wind);
//%%%%%%%%%%%%% Hydro Energy %%%%%%%%%%%%%%%%%%%%%%%%%%//
    // var Hydro_ten_year=ten_year.filter(d=>d.source==="Hydro");
    // console.log("Hydro: ", Hydro_ten_year);
    percent_hydro=[];
    for (var i=0;i<data.length;i++){
        percent_hydro.push(parseFloat(data[i].Hydro_Perc).toFixed(3));
    }
    console.log(percent_hydro);
//%%%%%%%%%%%%% BioFuels Energy %%%%%%%%%%%%%%%%%%%%%%%%%%//
    // var BioFuels_ten_year=ten_year.filter(d=>d.source==="Biofuels");
    // console.log("Biofuels: ", BioFuels_ten_year);
    percent_all=[];
    for (var i=0;i<data.length;i++){
        percent_all.push(parseFloat(data[i].Renewables_Perc).toFixed(3));
    }
    console.log(percent_all);

    var trace1 = {
        x:year,
        y:percent_all,
        name:"Renewable All",
        type:"bar",
        boxpoints:"all"
    };

    var trace2 = {
        x:year,
        y:percent_solar,
        name:"Solar",
        type:"bar",
        boxpoints:"all"
    };

    var trace3= {
        x:year,
        y:percent_wind,
        name:"Wind",
        type:"bar",
        boxpoints:"all"
    };

    var trace4 = {
        x:year,
        y:percent_hydro,
        name:"Hydro",
        type:"bar",
        boxpoints:"all"
    };

    var data = [trace1,trace2,trace3,trace4];

    var layout = { 
        title: " Renewable Energy Production by Sources(%), 2010-2019",
        yaxis:{title: "Percenrage(%)"},
        xaxis:{title: "Year"}
    };

    Plotly.newPlot("plot", data, layout);
});