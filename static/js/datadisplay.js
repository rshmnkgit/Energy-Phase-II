
// dbpath = "../static/data/energymerged.json"

dbpath = "http://127.0.0.1:5000/energymerged"

// Convert the string to title case
function toTitleCase(getStr) {
    words = getStr.split(' ');
    // Step 3. Create the FOR loop
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(' ')
}

d3.json(dbpath).then((data) => {
    console.log(data)
    var tableData = data.filter(data => data.year > 1999);
    tableData = tableData.filter(data => data.source !== 'Total')

    

    // Read the values entered by the user in the form elements
    var button = d3.select(".btn-default");
    var tbody = d3.select("tbody");
    var form = d3.select("#ufo-form");
    console.log(form);

    // Display the table data on the html page
    function fillTheTable(dataTable) {
        tbody.html("");
        dataTable.forEach((energyData) => {
            var row = tbody.append("tr");

            var cell = row.append("td");
            cell.text(energyData.country)

            cell = row.append("td");
            cell.text(energyData.year)

            cell = row.append("td");
            cell.text(energyData.source)

            cell = row.append("td");
            cell.text(energyData.units.toFixed(4))

            cell = row.append("td");
            cell.text(energyData.percent.toFixed(4))
        });
    }

    // On form submit, filter the data based on the criteria selection
    function formSubmit() {
        console.log("Enering the function..........")
        d3.event.preventDefault();
        var getCountry = toTitleCase(d3.select("#txt-country").property("value"));
        var getYear = parseInt(d3.select("#txt-year").property("value"));
        var getSource = toTitleCase(d3.select("#txt-source").property("value"));
        console.log(typeof (getYear));
        console.log(getCountry);


        var filteredData = tableData
        if (getYear) {
            filteredData = filteredData.filter(energyData => energyData.year === getYear);
        }
        if (getSource) {
            filteredData = filteredData.filter(energyData => energyData.source === getSource);
        }
        if (getCountry) {
            filteredData = filteredData.filter(energyData => energyData.country === getCountry);
        }
        console.log(filteredData);
        fillTheTable(filteredData);
    }

    fillTheTable(tableData);
    form.on("submit", formSubmit);

    button.on("click", formSubmit);
    // form.on("change", formSubmit);

});