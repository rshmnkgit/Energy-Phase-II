// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map-id", {
    center: [39.36827914916014, -6.6796875],
    zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + API_KEY, {
    id: 'mapbox/light-v9',
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    zoomOffset: -1
}).addTo(myMap);

function getColor(d) {
    return d > 1000 ? '#800026' :
            d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
            d > 100 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
            d > 20 ? '#FEB24C' :
            d > 10 ? '#FED976' :
                    '#FFEDA0';
}

// source_data_path = "../static/data/energymerged.json";
// gdp_data_path = "../static/data/countrygdp.json";

source_data_path = "http://127.0.0.1:5000/energymerged";
gdp_data_path = "http://127.0.0.1:5000/countrygdpdata";

console.log(gdp_data_path)


var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
}

//==============================================================================================
// Get top ten GDP countries
// function getCountryGDP(getCountryName, forYear) {
//     console.log("getgdp Fn:    " + getCountryName + " : " + forYear)
//     var clist = getCountryName
//     console.log(`clist :  ${clist}`)
//     d3.json(gdp_data_path, function(gdpData) {
//         console.log(gdpData);
//         // gdpObj = gdpData.filter(d => d.country === getCountryName && d.year === forYear);
        
//         // filteredArray = gdpData.filter( function( el ) {
//         //     return clist.includes( el.country );
//         //   });

//         // gdpObj = gdpData.filter(d => d.country in clist);
//         // console.log("gdpObj:  " + gdpObj[0].country + " " + gdpObj[0].year + "  " + gdpObj[0].gdp);
//         console.log(filteredArray)
//         // return (gdpObj[0].gdp);
//     });
// }
//===============================================================================================


function sumUnits(total, units) {
    return total + units;
}

function getCountryGDP(getCountryName, forYear) {
    var gdp_value = 0
    console.log("get gdp.........")
    try {
        d3.json(gdp_data_path, function(gdpData) {
            // console.log(gdpData);
            gdpObj = gdpData.filter(d => d.country === getCountryName && d.year === forYear);        
            // console.log(gdpObj)
            console.log(`${getCountryName}  GDP:  ${gdpObj[0].gdp}`)
            gdp_value = gdpObj[0].gdp
        });
    } catch(err) {
        console.log(`caught error ${err}`)
    }
    console.log(gdp_value)
    return (gdp_value);
}    

function getEnergyInfo(forData, forCountry, forYear, forSource) {
    units_rounded = 0
    try {
        console.log("In the function--------")
        filterData = forData.filter(d => d.country === forCountry 
                    && d.source === forSource && d.year === forYear); 
        console.log(filterData)
        units_rounded = filterData[0].units.toFixed(3)
    } catch(err) {
        console.log(`caught error ${err}`)
    }
    if(units_rounded === "0.000") {
        units_display = "No.data"
    }
    else {
        units_display = `${units_rounded}(Twh)`
    }
    return (units_display);
};

    

function CountryInfo(getCountryName, event) {
    console.log(getCountryName);
    // d3.json(data_path).then(function (energyData) {
    var years = [2010, 2019];
    var results = [];
    var units = []
    var total_units = []

    if (getCountryName === "United States of America") {
        getCountryName = "United States"
    }

    // function getEnergyInfo(forData, forYear) {
    //     console.log("In the function--------")
    //     filterData = forData.filter(d => d.country === getCountryName 
    //                 && d.source !== "Total" && d.year === forYear);         

    //     var mydict = {}
    //     var result_list = []
    //     for (var i=0; i < filterData.length; i++) {
    //         mydict[filterData[i].source] = filterData[i].units
    //         // result_list.push(mydict)
    //         // src_list.push(filterData[i].source)
    //         // unit_list.push(filterData[i].units)
    //     }
    //     // console.log(result_list)
    //     console.log(mydict)

    //     console.log(`mydict   ${mydict}`)
    // }

    console.log(source_data_path)
    d3.json(source_data_path, function (energyData) {
        console.log(energyData);
        
        if (event.target == modal) {
            modal.style.display = "none";
        }
        else {
            modal.style.display = "block";
            document.getElementById("description").innerText = getCountryName;
            document.getElementById("year-1").innerText = 2010

            var hydro_units_1 = getEnergyInfo(energyData, getCountryName, 2010, "Hydro");
            console.log(`hydro units:  ${hydro_units_1}`)
            document.getElementById("unit-water-1").innerText = hydro_units_1

            var wind_units_1 = getEnergyInfo(energyData, getCountryName, 2010, "Wind");
            // console.log(`wind units:  ${wind_units_1}`)
            document.getElementById("unit-wind-1").innerText = wind_units_1

            var solar_units_1 = getEnergyInfo(energyData, getCountryName, 2010, "Solar");
            // console.log(`solar units:  ${solar_units_1}`)
            document.getElementById("unit-sun-1").innerText = solar_units_1

            // bio_units = getEnergyInfo(energyData, getCountryName, 2010, "Biofuels");
            // console.log(`solar units:  ${bio_units}`)
            // document.getElementById("unit-bio-1").innerText = bio_units

            document.getElementById("year-2").innerText = 2019
            var hydro_units_2 = getEnergyInfo(energyData, getCountryName, 2019, "Hydro");
            console.log(`hydro units:  ${hydro_units_2}`)
            document.getElementById("unit-water-2").innerText = hydro_units_2

            var wind_units_2 = getEnergyInfo(energyData, getCountryName, 2019, "Wind");
            // console.log(`wind units:  ${wind_units_2}`)
            document.getElementById("unit-wind-2").innerText = wind_units_2

            var solar_units_2 = getEnergyInfo(energyData, getCountryName, 2019, "Solar");
            // console.log(`solar units:  ${solar_units_2}`)
            document.getElementById("unit-sun-2").innerText = solar_units_2
            
            var hydro_perc = (parseFloat(hydro_units_2) - parseFloat(hydro_units_1))/parseFloat(hydro_units_1) * 100           
            var solar_perc = (parseFloat(solar_units_2) - parseFloat(solar_units_1))/parseFloat(solar_units_1) * 100           
            var wind_perc = (parseFloat(wind_units_2) - parseFloat(wind_units_1))/parseFloat(wind_units_1) * 100           
            console.log(`Hydro Inc Perc:  ${hydro_perc}`)
            console.log(`Solar Inc Perc:  ${solar_perc}`)
            console.log(`Wind Inc Perc:  ${wind_perc}`)
            document.getElementById("perc-water").innerText = hydro_perc.toFixed(3)
            document.getElementById("perc-sun").innerText = solar_perc.toFixed(3)
            document.getElementById("perc-wind").innerText = wind_perc.toFixed(3)

            var isHydro = iif(hydro_perc.toFixed(3),0,1)
            var x = element.getElementsByTagName("img-hyd-perc").item(0);
            var v = x.getAttribute("src");
            if(isHydro)
                v = "../static/images/increase.jpg";
            else
                v = "../static/images/decrease.jpg";
            x.setAttribute("src", v);	


            d3.json(gdp_data_path, function(gdpData) {
                console.log(gdpData);
                gdpObj = gdpData.filter(d => d.country === getCountryName && d.year === 2010);        
                console.log(gdpObj)
                console.log(`${getCountryName}  GDP:  ${gdpObj[0].gdp}`)
                gdp_value = gdpObj[0].gdp.toFixed(3)
                if (gdp_value === "0.000") {
                    gdp_display = "No-data"
                }
                else {
                    gdp_display = "$." + gdp_value
                }
                document.getElementById("gdp-1").innerText = gdp_display

                gdpObj = gdpData.filter(d => d.country === getCountryName && d.year === 2019);        
                // console.log(gdpObj)
                console.log(`${getCountryName}  GDP:  ${gdpObj[0].gdp}`)
                gdp_value = gdpObj[0].gdp.toFixed(3)
                if (gdp_value === "0.000") {
                    gdp_display = "No.data"
                }
                else {
                    gdp_display = "$." + gdp_value
                }
                document.getElementById("gdp-2").innerText = gdp_display
            });            




            // bio_units = getEnergyInfo(energyData, getCountryName, 2019, "Biofuels");
            // console.log(`solar units:  ${bio_units}`)
            // document.getElementById("unit-bio-2").innerText = bio_units            

        }
    });
}




// // Load in geojson data
var geoData = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";
// // Grab data with d3
d3.json(geoData, function (data) {
    countryData = data
    console.log(data)

    function style(feature) {
        return {
            fillColor: '#a6bddb',   //getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.08
        };
    }
    L.geoJson(countryData, { style: style }).addTo(myMap);

    // What to do when mouse over
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillColor: '#78c679',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    // What to do when Mouse Out
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    // Click Feature
    function zoomToFeature(e) {
        CountryInfo(e.sourceTarget.feature.properties.ADMIN, e);  
    }


    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
    geojson = L.geoJson(countryData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(myMap);

});