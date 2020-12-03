
dbpath = "http://127.0.0.1:5000/description"




d3.json(dbpath).then(function (data) {
    console.log(data)
    console.log(`description data:  ${data}`)
    

    // document.getElementById("solar-def").innerText = data[0].solar_head  
    document.getElementById("solar-def").innerText = data[0].solar_desc  
    document.getElementById("solar-adv").innerText = data[0].solar_adv 
    document.getElementById("solar-lim").innerText = data[0].solar_lim 
    
    // document.getElementById("wind-def").innerText = data[0].wind_head  
    document.getElementById("wind-def").innerText = data[0].wind_desc  
    document.getElementById("wind-adv").innerText = data[0].wind_adv  
    document.getElementById("wind-lim").innerText = data[0].wind_lim  
    
    // document.getElementById("").innerText = data[0].hydro_head  
    document.getElementById("hydro-def").innerText = data[0].hydro_desc  
    document.getElementById("hydro-adv").innerText = data[0].hydro_adv  
    document.getElementById("hydro-lim").innerText = data[0].hydro_lim  
    
    // document.getElementById("ocean-head").innerText = data[0].ocean_head  
    document.getElementById("tide-def").innerText = data[0].ocean_desc  
    document.getElementById("tide-adv").innerText = data[0].ocean_adv  
    document.getElementById("tide-lim").innerText = data[0].ocean_lim  

    // document.getElementById("geo-head").innerText = data[0].geo_head  
    document.getElementById("geo-def").innerText = data[0].geo_desc  
    document.getElementById("geo-adv").innerText = data[0].geo_adv  
    document.getElementById("geo-lim").innerText = data[0].geo_lim  
    
    // document.getElementById("").innerText = data[0].hydrogen_head  
    document.getElementById("hygn-def").innerText = data[0].hydrogen_desc  
    document.getElementById("hygn-adv").innerText = data[0].hydrogen_adv  
    document.getElementById("hygn-lim").innerText = data[0].hydrogen_lim  
    
    // document.getElementById("").innerText = data[0].biomass_head  
    document.getElementById("bio-def").innerText = data[0].biomass_desc  
    document.getElementById("bio-adv").innerText = data[0].biomass_adv  
    document.getElementById("bio-lim").innerText = data[0].biomass_lim  

});