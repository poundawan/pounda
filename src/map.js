import React, { Component } from "react";
import { Chart } from "react-google-charts";
import "./map.css";
import { getCountry, getContinent } from "./countries";

class Map extends Component {
    
    getStatus = status => {
        return ["desire", "planned", "current", "finished"].indexOf(status) + 1
    }
    
    formatCountries = countries => {
        return [
            ["Country", "Status", { role: "tooltip", type: "string", p: { html: true } }],
            ...Object.entries(countries).map( ([iso, country]) => [iso, country.status, this.formatTooltip(country)]),
        ]
    }

    formatTooltip = country=> {
        return ( "<div id='tooltip'>"
                +"  <h4>"+country.country+"</h4>"
                +"  <div>"
                +"    <span>You have "+country.count+" travel(s)</span>"
                +"  </div>"
                +"</div>")
    }

    getDataMap = tickets => {
        const countries = {};
        let country = {};
        tickets.map(ticket => {
            ticket.places.map(curCountry => {
                country = getCountry(curCountry);
                if (!countries[country.ISO]) {
                    countries[country.ISO] = {
                        count: 0,
                        status: 0,
                        country:"",
                    }
                }
                countries[country.ISO].country=country.label_en;
                countries[country.ISO].count++;
                countries[country.ISO].status = Math.max(countries[country.ISO].status, this.getStatus(ticket.status));
            })
        })
        return this.formatCountries(countries)
    }

    formatContinents = continents =>
    {
        return [
            ...Object.entries(continents).map( ([continent, sub_continent]) => [continent, sub_continent])
        ]
    }

    getContinentsMap = countries => {
        let continents = {};
        let continent = {};
        let view = "world";
        let lastSubCont = "";
        countries.map(country => {
            continent = getContinent(country[0]);
            if(typeof(Object.keys(continent)[0])!=="undefined")
            {
                if(!continents[Object.keys(continent)[0]])
                {
                    continents[Object.keys(continent)[0]] = {
                        sub_continent : []
                    }
                    
                }
                if(continents[Object.keys(continent)[0]].sub_continent.findIndex(x => x===continent[Object.keys(continent)[0]])===-1)
                    continents[Object.keys(continent)[0]].sub_continent.push(continent[Object.keys(continent)[0]]);
            }
        })
        continents = this.formatContinents(continents);
        if(continents.length === 1 )
        {
            view = continents[0][0];
            if(continents[0][1].sub_continent.length === 1) view = continents[0][1].sub_continent[0];
            else{
                continents[0][1].sub_continent.map(sub_id => {
                    if(lastSubCont === "")lastSubCont = sub_id
                    if(lastSubCont !== sub_id)
                    {
                        lastSubCont = false;
                        return lastSubCont;
                    }
                })
                if(lastSubCont)  view = lastSubCont;
            }
        }
        return view;
    }

    render() {
    const { tickets,interactivity,mapName } = this.props;
    let countries = this.getDataMap(tickets);
    let region = this.getContinentsMap(countries);
    return (
        <div id={mapName} className={"countries-map"}>
          <Chart
            chartType="GeoChart"
            data={countries}
            width="100%"
            height="100%"
            options={{
                legend:"none",
                region:region,
                tooltip: { isHtml: true },
                enableRegionInteractivity:interactivity,
                backgroundColor:"#f7f7f7",
                colorAxis:{minValue:1,maxValue:4,colors:['#7b8794','#f0b429','#199473','#40c3f7']},
                
            }}
          />
        </div>
      );
    }
  }

  
export default Map;