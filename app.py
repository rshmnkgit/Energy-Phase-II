# Import dependencies
from flask import Flask, render_template
from flask import jsonify, json
from flask import request
from pymongo import MongoClient
from config import username, password, dbname

# Initialize Flask main app
app = Flask(__name__)

# Initialize Mongo Database Connection
# dbpath = "static/data/"
# https://renewable-energy-prj2.herokuapp.com/

client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.zdhdq.mongodb.net/{dbname}?retryWrites=true&w=majority")
# client = MongoClient('mongodb://localhost:27017')
print(username)
print(password)
print(dbname)
db = client["renewable_energy"]

#----------------------------------------------------------------------------
def saveAsJsonFile(fileName, dictName):
    dbpath = "static/data/"
    with open(dbpath+fileName, 'w') as fp:
        json.dump(dictName, fp, sort_keys=True, indent=4)

# Read energy source mongo collection and convert into json
@app.route('/energygeneration')
def getData_energygeneration():
    esource = db['energysource']
    output = []
    rowno = 0
    for row in esource.find():
        output.append({'rowid': rowno,
                        'country': row['Country'],
                        'code' : row['Code'],
                        'year': row['Year'],
                        'units': row['Units(Twh)'],
                        'source': row['Source']
                       })
        rowno = rowno + 1          
    esourcegen_json = jsonify(output)
    return esourcegen_json

#----------------------------------------------------------------------------

# Read energy source mongo collection and convert into json
@app.route('/energysource')
def getData_energysource():
    esource = db['energysource']
    output = []
    for row in esource.find():
        output.append({'country': row['Country'],
                       'year': row['Year'],
                       'units': row['Units(Twh)'],
                       'source': row['Source']
                       })                          
    # esource_json = jsonify({'result': output})
    esource_json = jsonify(output)
    return esource_json

# Read energy share mongo collection and convert into json
# Data with sources as a single column
@app.route("/energyshare")
def getData_energyshare():
    energyshare = db['energyshare']
    output = []
    for row in energyshare.find():
        output.append({'country': row['Country'],
                       'year': row['Year'],
                       'energy': row['Consumption_Units(Twh)'],
                       'source' : row["Source"]
                       })
    share_json = jsonify(output)
    return share_json

			
# Read energy share mongo collection and convert into json
# Data with sources in diffr=erent columns
@app.route("/tenyearrenewpercent")
def getData_lastTenYearRenewPercent():
    energysharepercent = db['lasttenyearrenewpercent']
    output = []
    for row in energysharepercent.find():
        output.append({'Year': row['Year'],
                       'Renewables_Perc': row['Renewables_Perc'],
                       'Solar_Perc' : row["Solar_Perc"],
                       'Wind_Perc' : row['Wind_Perc'],
                       'Hydro_Perc': row['Hydro_Perc']
                       })
    renew_json = jsonify(output)
    return renew_json


# Tables energysource and energyshare merged for data display
@app.route("/energymerged")
def getData_energymerged():
    energymerged = db['energymerged']
    output = []
    for row in energymerged.find():
        output.append({'country': row['Country'],
                       'year': row['Year'],
                       'source': row['Source'],
                        'units' : row["Units(Twh)"],
                        'percent' : row['Consumption_Units(Twh)']
                    #    'units' : row["Units (Twh)"],
                    #    'percent' : row['Energy(%)']
                       })
    merged_json = jsonify(output)
    return merged_json


# Read Country GDP mongo collection and convert into json
@app.route("/countrygdpdata")
def getData_countryGDP():
    gdp = db['countrygdp']
    output = []
    for row in gdp.find():
        output.append({'country': row['Country'],
                       'year': row['Year'],
                       'gdp':row['GDP']
                       })
    gdp_json = jsonify(output)
    return gdp_json


# Get the air pollution data to be passed on to the javascript file
@app.route("/airpollution")
def getData_airpollution():
    pollution = db['airpollution']
    output = []
    for row in pollution.find():
        output.append({'country': row['Country'],
                       'year': row['Year'],
                       'death_under_5': row["Death_Rate_Under_5"],
                       'death_5_14' : row["Death_Rate_5_14_Years"],
                       'death_15_49' : row["Death_Rate_15_49_Years"],
                       'death_50_59': row["Death_Rate_50_69_Years"],
                       'death_over_70': row["Death_Rate_Over_70"]
                       })
    pollution_json = jsonify(output)
    return pollution_json


# Get the air pollution data to be passed on to the javascript file
@app.route("/description")
def getData_description():
    energydesc = db['Webscrapedata']
    output = []
    for row in energydesc.find():        
        output.append({"solar_head" :  row['Solar_Head'],
                "solar_desc" :  row['Solar_Desc'],
                "solar_adv" : row['Solar_Adv'],
                "solar_lim" : row['Solar_Lim'],
                "wind_head" :  row['Wind_Head'],
                "wind_desc" :  row['Wind_Desc'],
                "wind_adv" :  row['Wind_Adv'],
                "wind_lim" :  row['Wind_Lim'],
                "hydro_head" :  row['Hydro_Head'],
                "hydro_desc" :  row['Hydro_Desc'],
                "hydro_adv" :  row['Hydro_Adv'],
                "hydro_lim" :  row['Hydro_Lim'],
                "ocean_head" :  row['Ocean_Head'],
                "ocean_desc" :  row['Ocean_Desc'],
                "ocean_adv" :  row['Ocean_Adv'],
                "ocean_lim" :  row['Ocean_Lim'],
                "hydrogen_head" :  row['Hydrogen_Head'],
                "hydrogen_desc" :  row['Hydrogen_Desc'],
                "hydrogen_adv" :  row['Hydrogen_Adv'],
                "hydrogen_lim" :  row['Hydrogen_Lim'],
                "biomass_head" :  row['Biomass_Head'],
                "biomass_desc" :  row['Biomass_Desc'],
                "biomass_adv" :  row['Biomass_Adv'],
                "biomass_lim" :  row['Biomass_Lim'],
                "geo_head" :  row['Geo_Head'],
                "geo_desc" :  row['Geo_Desc'],
                "geo_adv" :  row['Geo_Adv'],
                "geo_lim" :  row['Geo_Lim']
            })
    energydesc_json = jsonify(output)
    return energydesc_json

#---------------------------------------------------------------------------
# Top Twelve Country GDP per Capita
@app.route('/gdptoptwelve')
def getData_gdptoptwelve():
    gdp = db['top_twelve_gdp']
    output = []
    for row in gdp.find():
        output.append({'country' : row['Country'],
                       'year' : row['Year'],
                       'gdp' : row['GDP']
                       })
    # with open(dbpath+'gdptoptwelve.json','w') as outfile:
    #     json.dump(output, outfile)
    # # gdp_json = jsonify({‘result’: output})
    gdp_json = jsonify(output)
    return gdp_json



#----------------------------------------------------------------------------
# Read energy source mongo collection and convert into json
@app.route('/energysunburst')
def getData_energysunburst():
    esource = db['energysource']
    output = []
    counter = 1
    for row in esource.find():
        output.append({'id' : counter,
                       'country': row['Country'],
                       'year': row['Year'],
                       'units': row['Units (Twh)'],
                       'source': row['Source']
                       })
        counter = counter + 1        
    esunburst_json = jsonify(output)
    return esunburst_json
#----------------------------------------------------------------------------


#=================================================================================
# @app.route('/uspopulation')
# def getData_Population():
#     uspop = db['USPopulation']
#     output = []
#     for row in uspop.find():
#         output.append({ 'year': row['Year'],
#                         'population': row['Population']
#                        })  
#     uspop_json = jsonify(output)
#     return uspop_json

@app.route('/usgeneration')
def getData_USGeneration():
    usprod = db['energyproduction']
    output = []
    for row in usprod.find():
        output.append({ 'year': row['Year'],
                        'production': row['Total_Renewable_Production'],
                        'consumption': row['Total_Renewable_Consumption'],
                        'total': row['Total_Energy_Consumption']                      
                       })  
    usprod_json = jsonify(output)
    return usprod_json

#=========================================================================================

## Route to render index.html template using data from Mongo
@app.route('/', methods=['GET', 'POST'])
def index():
    # t = getData_energygeneration()
    return render_template('index.html')

# Render the home page
@app.route('/home', methods=['GET', 'POST'])
def homepage():
    return render_template('home.html')

# Render the (air pollution) effects html page
@app.route('/effects')
def effects():
    return render_template('effects.html')

# Render the (air pollution) effects html page
@app.route('/gen_consume')
def gen_consume():
    return render_template('stacked.html')

# Render data display page
@app.route("/datadisplay")
def datadisplay():
    return render_template('datadisplay.html')

# Render data display page
@app.route("/renew_energy")
def renew_energy():
    return render_template('renew_energy.html')

# Render data display page
@app.route("/countrygdp")
def countrygdp():
    # getData_countryGDP()
    return render_template('countrygdp.html')

@app.route("/information")
def description():
    return render_template('information.html')

@app.route("/population")
def population():
    return render_template('population.html')

# Render data display page
@app.route("/about")
def about():
    # desc_html = getData_description()
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)
