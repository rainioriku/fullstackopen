import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"

const App = () => {
  const [newSearch, setNewSearch] = useState("")
  const [countries, setCountries] = useState([])
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  //GET ALL COUNTRIES FROM RESTCOUNTRIES
  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        //concat found countries to copy of countries []
        // working setCountries(countries.concat(response.data))
        setCountries(country => response.data)
      })
  }, [])

  return (
    <div>
      <Search newSearch={newSearch}
              handleSearchChange={handleSearchChange}/>
      <ListCountries countries={countries}
                     search={newSearch}/>
    </div>
  )
}

const Weather = (props) => {
  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState(0)
  const [windDirection, setWindDirection] = useState("")

  const api_key = process.env.REACT_APP_API_KEY
  const parsed_api_key = api_key.split(" ")[0]
  console.log("apikey: ", parsed_api_key)
  let country = props.country
  let capital = country.capital
  console.log("capital: ", capital)

  //Update when weather re-render
  //or when country changes
  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current?access_key=" + parsed_api_key + "&query=" + capital)
      .then(response => {
        const apiResponse = response.data
        console.log(apiResponse)
        setTemperature(apiResponse.current.temperature)
        setWind(apiResponse.current.wind_speed)
        setWindDirection(apiResponse.current.wind_dir)
      })
  }, [country])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b>{temperature} Celsius</p>

      <p><b>wind:</b>{wind} mph direction {windDirection}</p>
    </div>
  )
}

const Search = (props) => {
  let {newSearch, handleSearchChange} = props

  return (
    <div>
      find countries <input value={newSearch}
                            onChange={handleSearchChange}/>
      <p></p>   
    </div>
  )
}

//COMPONENT FOR LISTING COUNTRIES
const ListCountries = (props) => {
  const [filterCountries, setFilterCountries] = useState([props.countries])
  
  //run when props.search filter changes
  useEffect(() => {
    const countries = props.countries
    let filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(props.search.toLowerCase()))
    setFilterCountries(filteredCountries)
  }, [props.search, props.countries])

  //BUTTON HANDLER-->
  const showCountry = (e) => {
    //Parse country out of even info (probably not the best way)
    let data = e.target.parentElement.innerText
    let postfix = " show"
    let postfixIndex = data.search(postfix)
    let parsedCountry = data.substring(0, postfixIndex)
    console.log(parsedCountry)
    
    //find this country object from 250 countries arr
    let foundCountry = props.countries.find((country, index) => {
      if(country.name === parsedCountry){
        return true
      }
    })
    console.log([foundCountry])
    let wrap = []
    wrap[0] = foundCountry
    setFilterCountries(wrap)
    console.log("filterCountries: ", filterCountries.length)

  }

  //RENDER CONDITIONS-->
  if(filterCountries.length === props.countries.length){
    return (
      <div>
        <p>Type to search</p>
      </div>
    )
  }
  if(filterCountries.length === 0){
    return (
      <div>
        <p></p>
      </div>
    )
  }
  if(filterCountries.length === 1){
    const country = filterCountries[0]
    console.log("country: ", country, "length: ", country.length, "typeof: ", typeof(country))
    if(country.name){
      return (
        <div>
          <h1>{country.name}</h1>
          <p> capital {country.capital}
            <br/>population {country.population}
          </p>
          
          <h2>languages</h2>
          <ul>
            {country.languages.map(language => 
              <li>{language.name}</li>)}
          </ul>
          <img  className="flagimg"
                alt="flag of the searched country"
                src={country.flag} />
          <Weather country={country}/>
        </div>
      )
    }
    else{
      return (<div><p>one element</p></div>)
    }
  }
  if(filterCountries.length > 10){
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if(filterCountries.length < 10 && filterCountries.length > 1){
    return (
      <div>
        <p>
          {filterCountries.map(country =>
            <p>{country.name} <button onClick={showCountry}>show</button></p>
          )}
        </p>
      </div>
    )
  }
}
/*WORKING
const ListCountries = (props) => {
  const [filterCountries, setFilterCountries] = useState([])
  console.log("filterCountries: ", filterCountries)

  let countries = props.countries
  let filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(props.search.toLowerCase()))

  console.log("filtered let countries: ", filteredCountries)

  //test method
  const showCountry = (e) => {

    //Parse country out of even info (probably not the best way)
    let data = e.target.parentElement.innerText
    let postfix = " show"
    let postfixIndex = data.search(postfix)
    let parsedCountry = data.substring(0, postfixIndex)

    //find this country object from 250 countries arr
    let foundCountry = countries.find((country, index) => {
      if(country.name === parsedCountry){
        return true
      }
    })
    console.log(foundCountry)
    setFilterCountries(foundCountry)
  }

  //if search bar empty or 0 countries in arr
  if(countries.length === 0){
    return (
      <div>
        <p></p>
      </div>
    )
  }
  
  //check if amount of found countries is over 10
  if(filteredCountries.length > 10){
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  //if only one country as result
  if(filteredCountries.length === 1){
    let country = filteredCountries[0]

    console.log("country flag: ", country.flag)
    return (
      <div>
        <h1>{country.name}</h1>
        <p> capital {country.capital}
          <br/>population {country.population}
        </p>
        
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => 
            <li>{language.name}</li>)}
        </ul>
        <img  className="flagimg"
              alt="flag of the searched country"
              src={country.flag} />
        
      </div>
    )
  }

  //if under 10 render those filtered countries
  return (
    <div>
      <p>
        {filteredCountries.map(country =>
          <p>{country.name} <button onClick={showCountry}>show</button></p>
        )}
      </p>
    </div>
  )
}
*/

export default App