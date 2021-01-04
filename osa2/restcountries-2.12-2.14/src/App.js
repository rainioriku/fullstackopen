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
  console.log("filterCountries len: ", filterCountries.length)

  //run when props.search filter changes
  useEffect(() => {
    let countries = props.countries
    let filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(props.search.toLowerCase()))
    setFilterCountries(filteredCountries)
  }, [props.search])

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
        <p>No results</p>
      </div>
    )
  }
  if(filterCountries.length === 1){
    return (
      <div>
        <p>1</p>
      </div>
    )
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
        <p>1-10</p>
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