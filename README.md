
# RenewableEnergy
https://renewable-energy-heroku.herokuapp.com/

### About the Project
* In this project, we analyzed 3 key points
* 1.We found that renewable energy generation is increased most of the countries during the past 20 years in the world .
* 2.We uncovered the effects of Renewable Energy on Air pollution and Death Rate 
* 3. We observed how the GDP per capita of each country would change the generation and consumption of Renewable Energy.
In conclusion, according to the article by International Renewable Energy Agency(IRENA), as populations expand, living standards improve, and consumption rises, total demand for energy is expected to increase by 21% by 2030. In addition to this, growing concerns over climate change are prompting governments worldwide to seek ways to supply energy while minimizing greenhouse gas emissions and other environmental impacts.

### Data Sources
* https://ourworldindata.org/renewable-energy
* https://www.irena.org/documentdownloads/publications/irena_measuring-the-economics_2016.pdf
* https://ourworldindata.org/air-pollution
* https://ourworldindata.org/grapher/renewable-energy-investment-of-gdp
* https://justenergy.com/blog/7-types-renewable-energy-future-of-energy/

### Technologies used
* Python: Pandas, Flask
* Javascript 
* HTML, CSS, Bootstrap
* D3, Chart-js, Plotly
* Webscraping - chromedriver version 86
* Mongo cloud

### Usage
* Make sure all the requirements from the requirements.txt are up to date.
* For Database Setup 
    - Config.py - Need to provide the Mongocloud database username and password
    - Chromedriver.exe (version 86) to be installed and provide the executable path in datascrape.py
    - Run datacleanup.py
* For running the application
    - Need to provide the Mapbox APIkey in the config.js
    - Run app.py

### Remote Acess
* Heroku
