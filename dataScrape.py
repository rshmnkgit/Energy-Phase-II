
def webscrape():
    #import dependencies
    from bs4 import BeautifulSoup
    import pandas as  pd
    from splinter import Browser
    import requests
    
    #define browser
    executable_path = {'executable_path':"c:\\ChromeDriver\\chromedriver.exe"}
    browser = Browser('chrome', **executable_path, headless=False)
    # url = 'https://justenergy.com/blog/7-types-renewable-energy-future-of-energy/#:~:text=Renewable%20energy%20is%20energy%20that,less%20harmful%20to%20the%20environment.'
    url = 'https://justenergy.com/blog/7-types-renewable-energy-future-of-energy'
    browser.visit(url)

    #7 types of renewable energy (solar)
    html = browser.html
    #parse HTML with Beautiful soup
    soup = BeautifulSoup(html, 'html.parser')

    Title=soup.select_one("div",id="single-post-content")

    rew_types = Title.find_all('h2')[1]
    print(rew_types.text)

    h3tags = Title.find_all('h3')[0]
    print( h3tags.text )
    solar_para =Title("p")[2].get_text()
    print(solar_para )

    h4tags =Title.find_all('h4')[0]
    print(h4tags.text)
    bene_para = Title("p")[3].get_text()
    print( bene_para)

    curr_lim = Title.find_all('h4')[1]
    print(curr_lim.text)
    limi_para = Title("p")[4].get_text()
    print(limi_para)

    print("---------------windDATA---------------------")

    windtags = Title.find_all('h3')[1]
    print(windtags.text )
    wind_para =Title("p")[5].get_text()
    print(wind_para)
    print("=====================================")
    benewindtags =Title.find_all('h4')[0]
    print(benewindtags.text)
    bene_wind_para = Title("p")[6].get_text()
    print(bene_wind_para)
    print("=====================================")

    curr_wind_lim = Title.find_all('h4')[1]
    print(curr_wind_lim.text)
    limi_wind_para = Title("p")[8].get_text()
    print(limi_wind_para)

    # print("-----------------------------------")
    print("-------------HYdroelectric----------------------")


    hydrotags = Title.find_all('h3')[2]
    print(hydrotags.text )
    hydro_para =Title("p")[9].get_text()
    print(hydro_para)
    print("=====================================")
    benehydrotags =Title.find_all('h4')[0]
    print(benehydrotags.text)
    bene_hydro_para = Title("p")[10].get_text()
    print(bene_hydro_para)
    print("=====================================")

    curr_hydro_lim = Title.find_all('h4')[1]
    print("curr_wind_lim =", curr_hydro_lim.text)
    limi_hydro_para = Title("p")[11].get_text()
    print("limi_hydro_para=", limi_hydro_para)


    print("--------------------GeoThermal-------------------")
    geotags = Title.find_all('h3')[3]
    print(geotags.text )
    geo_para =Title("p")[12].get_text()
    print(geo_para )
    print("=====================================")
    benegeotags =Title.find_all('h4')[0]
    print(benegeotags.text)
    bene_geo_para = Title("p")[13].get_text()
    print(bene_geo_para )
    print("=====================================")

    curr_geo_lim = Title.find_all('h4')[1]
    print(curr_geo_lim.text)
    limi_geo_para = Title("p")[14].get_text()
    print(limi_geo_para)

    print("--------------------Ocean-------------------")
    ocetags = Title.find_all('h3')[4]
    print(ocetags .text )
    oce_para =Title("p")[15].get_text()
    print(oce_para )
    print("=====================================")
    beneocetags =Title.find_all('h4')[0]
    print(beneocetags.text)
    bene_oce_para = Title("p")[16].get_text()
    print(bene_oce_para )
    print("=====================================")

    curr_oce_lim = Title.find_all('h4')[1]
    print(curr_oce_lim.text)
    limi_oce_para = Title("p")[17].get_text()
    print(limi_oce_para )

    print("-----------------Hydrogen---------------------")


    hydrogtags = Title.find_all('h3')[5]
    print(hydrogtags  .text )
    hydrog_para =Title("p")[18].get_text()
    print(hydrog_para )
    print("=====================================")
    benehydrogtags =Title.find_all('h4')[0]
    print(benehydrogtags .text)
    bene_hydrog_para = Title("p")[19].get_text()
    print(bene_hydrog_para )
    print("=====================================")

    curr_hydrog_lim = Title.find_all('h4')[1]
    print(curr_hydrog_lim.text)
    limi_hydrogoce_para = Title("p")[20].get_text()
    print(limi_hydrogoce_para  )


    print("-----------------Biomass---------------------")

    biotags = Title.find_all('h3')[6]
    print(biotags.text )
    bio_para =Title("p")[22].get_text()
    print(bio_para  )
    print("=====================================")
    benebiotags =Title.find_all('h4')[0]
    print(benebiotags.text)
    bene_bio_para = Title("p")[23].get_text()
    print(bene_bio_para )
    print("=====================================")

    curr_bio_lim = Title.find_all('h4')[1]
    print(curr_bio_lim.text)
    limi_bio_para = Title("p")[24].get_text()
    print(limi_bio_para )

    biotags = Title.find_all('h3')[6]
    print(biotags.text )
    bio_para =Title("p")[22].get_text()
    print(bio_para  )
    print("=====================================")
    benebiotags =Title.find_all('h4')[0]
    print(benebiotags.text)
    bene_bio_para = Title("p")[23].get_text()
    print(bene_bio_para )
    print("=====================================")

    curr_bio_lim = Title.find_all('h4')[1]
    print(curr_bio_lim.text)
    limi_bio_para = Title("p")[24].get_text()
    print(limi_bio_para )

    mydict={}

    mydict["Solar_Head"] = h3tags.text
    mydict["Solar_Desc"] =solar_para
    mydict["Solar_Adv"] = bene_para
    mydict["Solar_Lim"] = limi_para

    mydict["Wind_Head"] = windtags.text
    mydict["Wind_Desc"] =wind_para
    mydict["Wind_Adv"] = bene_wind_para
    mydict["Wind_Lim"] = limi_wind_para

    mydict["Hydro_Head"] = hydrotags.text
    mydict["Hydro_Desc"] =hydro_para
    mydict["Hydro_Adv"] = bene_hydro_para
    mydict["Hydro_Lim"] = limi_hydro_para

    mydict["Ocean_Head"] =ocetags.text
    mydict["Ocean_Desc"] =oce_para
    mydict["Ocean_Adv"] = bene_oce_para
    mydict["Ocean_Lim"] = limi_oce_para

    mydict["Hydrogen_Head"] =hydrogtags.text
    mydict["Hydrogen_Desc"] =hydrog_para 
    mydict["Hydrogen_Adv"] = bene_hydrog_para
    mydict["Hydrogen_Lim"] = limi_hydrogoce_para

    mydict["Biomass_Head"] = biotags.text
    mydict["Biomass_Desc"] =bio_para 
    mydict["Biomass_Adv"] = bene_bio_para 
    mydict["Biomass_Lim"] = limi_bio_para

    mydict["Geo_Head"] = geotags.text
    mydict["Geo_Desc"] = geo_para
    mydict["Geo_Adv"] = bene_geo_para
    mydict["Geo_Lim"] = limi_geo_para

    return (mydict)

