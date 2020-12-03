from config import username,password,dbname
import pandas as pd
from pprint import pprint
import pymongo
from dataScrape import webscrape

data_path="Resources/"

# ## Energy Generation Tables
def cleanEnergySource(dbpath):
    # Renewable Energy generation table
    share_electricity= pd.read_csv(dbpath+"primary-energy-renewables.csv")
    share_electricity.rename(columns={'Renewables (TWh – sub method)': 'Units(Twh)'}, inplace=True)
    share_electricity['Source'] = 'Total'

    # Solar Energy generation table
    share_solar= pd.read_csv(data_path+"primary-energy-from-solar.csv")
    share_solar.rename(columns={"Solar (TWh – sub method)": 'Units(Twh)'}, inplace=True)
    share_solar['Source'] = 'Solar'

    # Wind Energy generation table
    share_wind= pd.read_csv(data_path+"primary-energy-wind.csv")
    share_wind.rename(columns={'Wind (TWh – sub method)': 'Units(Twh)'}, inplace=True)
    share_wind['Source'] = 'Wind'

    # Hydropower Energy generation table    
    share_hydro= pd.read_csv(data_path+"primary-energy-hydro.csv")
    share_hydro.rename(columns={'Hydro (TWh – sub method)': 'Units(Twh)'}, inplace=True)
    share_hydro['Source'] = 'Hydro'

    # Merge all the above dataframes into a single dataframe
    energysource = share_electricity
    energysource = energysource.append(share_solar, ignore_index=True)
    energysource = energysource.append(share_hydro, ignore_index=True)
    energysource = energysource.append(share_wind, ignore_index=True)
    energysource.rename(columns={'Entity':'Country'}, inplace=True)    
    #-----------------------------------------------------------
    energysource.loc[energysource['Code'].isnull(),'Code'] = ""
    #-----------------------------------------------------------
    # Convert the null values to zero
    energysource.fillna(0,inplace=True)
    return energysource

## Share Electricity from Renewables Energies
## How much of our electricity comes from renewables?
def cleanEnergyShare(dbpath):
    # solar consumption table
    solar_data_read=pd.read_csv(dbpath+"solar-energy-consumption.csv")
    solar_data_read.rename(columns={'Electricity from solar (TWh)' : 'Consumption_Units(Twh)'}, inplace=True)
    solar_data_read['Source'] = 'Solar'
    
    # hydropower consumption table
    hydropower_data_read= pd.read_csv(data_path+"hydropower-consumption.csv")
    hydropower_data_read.rename(columns={'Electricity from hydro (TWh)' : 'Consumption_Units(Twh)'}, inplace=True)
    hydropower_data_read['Source'] = 'Hydro'
    
    # wind energy consumption table
    wind_data_read=pd.read_csv(data_path+"wind-consumption.csv")
    wind_data_read.rename(columns={'Electricity from wind (TWh)' : 'Consumption_Units(Twh)'}, inplace=True)
    wind_data_read['Source'] = 'Wind'
    
    # bio energy consumption table
    biofuel_data_read=pd.read_csv(data_path+"biofuel-consumption.csv")
    biofuel_data_read.rename(columns={'Biofuels Production - PJ - Total' : 'Consumption_Units(Twh)'}, inplace=True)
    biofuel_data_read['Source'] = 'Biofuels'
    
    # Merge all the above dataframes into a single dataframe
    energyshare = solar_data_read
    energyshare = energyshare.append(hydropower_data_read, ignore_index=True)
    energyshare = energyshare.append(wind_data_read, ignore_index=True)
    energyshare = energyshare.append(biofuel_data_read, ignore_index=True)    
    energyshare.rename(columns={'Entity':'Country'}, inplace=True)
    #-----------------------------------------------------------
    energyshare.loc[energyshare['Code'].isnull(),'Code'] = ""
    #-----------------------------------------------------------    
    # Convert the null values to zero
    energyshare.fillna(0, inplace=True)
    return energyshare


# ## GDP by Country
# Check Countries' GDP growth
def cleanCountryGDP(dbpath):
    # Read the data from the csv file
    gdp_data=pd.read_csv(dbpath+"API_NY.GDP.PCAP.CD_DS2_en_csv_v2_1429392.csv")

    # Slice the country name column
    country_series = gdp_data.iloc[:,0]

    # Slice the year columns from 2000 - 2019
    year_df = gdp_data.iloc[:,44:64]
    # Combine country_series and year_df into a single dataframe
    # Insert the series into the df at the first position

    code_series = gdp_data.iloc[:,1]
    year_df.insert(0, 'Code', code_series)

    year_df.insert(0, 'Country', country_series)

    gdp_data = year_df

    # Get the years in the colunms
    col_names = gdp_data.columns  

    newlst = []
    for row in range(0, len(gdp_data)):
        for col in range(2, len(col_names)):            
            newlst.append([gdp_data.iloc[row,0], gdp_data.iloc[row,1], col_names[col], gdp_data.iloc[row, col]])

    country_gdp_df = pd.DataFrame(newlst, columns=(['Country', 'Code', 'Year','GDP']))
    ## -----------------------------------------------------------
    country_gdp_df.loc[country_gdp_df['Code'].isnull(),'Code'] = ""
    ## -----------------------------------------------------------
    country_gdp_df.fillna(0, inplace=True)
    country_gdp_df['Year'] = country_gdp_df['Year'].astype('int64', copy=False)
    return country_gdp_df


# KA
## last_tenyear_renew_percent
def lastTenyearRenewPercent(dbpath):
    renew_df = pd.read_csv(dbpath+"last_tenyear_renew_percent.csv")
    return renew_df

# KA
def topTwelveCountryGdp(gdp_dframe):
    # gdp_dframe = cleanCountryGDP(dbpath)
    gdp_sorted = gdp_dframe.loc[gdp_dframe['Year'] == 2019].sort_values('GDP', ascending=False).nlargest(12, 'GDP').round(3)
    clist = gdp_sorted.loc[:, 'Country']
    gdp_top = gdp_dframe[gdp_dframe['Country'].isin(clist)]    
    return gdp_top


# ## Death Rate based on Air Pollution in every 100,000 people
# Death rates are measured as the number of premature deaths attributed to outdoor air pollution per 100,000 individuals in a given demographic.
def cleanAirPollution(dbpath):
    air_pollution = pd.read_csv(dbpath+"outdoor-pollution-rates-by-age.csv")
    ## -----------------------------------------------------------
    air_pollution.loc[air_pollution['Code'].isnull(),'Code'] = ""
    ## -----------------------------------------------------------    
    air_pollution.fillna(0,inplace=True)
    clear_data_air = air_pollution.rename(columns={"Entity":"Country",
                             "Death rate – Outdoor air pollution (Under-5s) (IHME)":"Death_Rate_Under_5",
                             "Death rate – Outdoor air pollution (5-14 years) (IHME)":"Death_Rate_5_14_Years",
                             "Death rate – Outdoor air pollution (15-49 years) (IHME)":"Death_Rate_15_49_Years",
                             "Death rate – Outdoor air pollution (50-69 years) (IHME)":"Death_Rate_50_69_Years",
                             "Death rate – Outdoor air pollution (70+ years) (IHME)":"Death_Rate_Over_70"})
    # clear_data_air.drop(columns=["Code"],inplace=True)
    return clear_data_air

def mergedCountries(sourcedf, gdpdf, airdf):
    merge1 = pd.merge(sourcedf, airdf, on="Country", how="inner")
    merge2 = pd.merge(merge1, gdpdf, on="Country", how="inner")
    return merge2

# ## Merging all the data tables
def mergeEnergyData(dbpath):
    energysource = cleanEnergySource(dbpath)
    energyshare = cleanEnergyShare(dbpath)
    merge_src_share = pd.merge(energysource, energyshare, on=["Country", "Code", "Year", "Source"], how="outer")
    # merge_src_share.drop(columns=['Code_x', 'Code_y'], inplace=True)
    merge_src_share.fillna(0, inplace=True)
    return merge_src_share


# ## Connect and Delete the collection from Mongo
def deleteFromMongo(collectionName):
    conn = f'mongodb+srv://{username}:{password}@cluster0.zdhdq.mongodb.net/{dbname}?retryWrites=true&w=majority'
    # conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    db = client.renewable_energy
    db[collectionName].drop()
    # db.drop.collection(collectionName)


# ## Connect and Update to Mongo
def updateIntoMongo(collectionName, dfName):
    # CREATE Connection with MongoDB Local
    conn = f'mongodb+srv://{username}:{password}@cluster0.zdhdq.mongodb.net/{dbname}?retryWrites=true&w=majority'
    # conn = 'mongodb://localhost:27017'
    client = pymongo.MongoClient(conn)
    # Define the Database in Mongo
    db = client.renewable_energy    
    collection = db[collectionName]
    tmp_dict = dfName.to_dict('records')
    collection.insert_many(tmp_dict)
    client.close()

def insertIntoMongo(collectionName, temp_dict):
    conn = f'mongodb+srv://{username}:{password}@cluster0.zdhdq.mongodb.net/{dbname}?retryWrites=true&w=majority'
    # conn='mongodb://localhost:27017'
    client=pymongo.MongoClient(conn)
    # Define the Database in Mongo
    db = client.renewable_energy
    name_scrape = db['Webscrapedata']
    name_scrape.insert(temp_dict)
    client.close()


def cleanUp(dbpath):
    src_df = cleanEnergySource(dbpath)
    share_df = cleanEnergyShare(dbpath)
    gdp_df = cleanCountryGDP(dbpath)
    top_gdp = topTwelveCountryGdp(gdp_df)
    air_df = cleanAirPollution(dbpath)
    merge_df = mergeEnergyData(dbpath)
    tenyear_df = lastTenyearRenewPercent(dbpath)
    scrape_dict = webscrape() 

    deleteFromMongo("energysource")
    deleteFromMongo("energyshare")
    deleteFromMongo("countrygdp")
    deleteFromMongo("airpollution")
    deleteFromMongo("energymerged")
    deleteFromMongo("lasttenyearrenewpercent")
    deleteFromMongo("top_twelve_gdp")
    deleteFromMongo("Webscrapedata")

    updateIntoMongo("energysource", src_df)
    updateIntoMongo("energyshare", share_df)
    updateIntoMongo("countrygdp", gdp_df)
    updateIntoMongo("airpollution", air_df)
    updateIntoMongo("energymerged", merge_df)
    updateIntoMongo("lasttenyearrenewpercent", tenyear_df)
    updateIntoMongo("top_twelve_gdp", top_gdp)
    insertIntoMongo("Webscrapedata", scrape_dict)

    print("........Process Completed......")

cleanUp(data_path)