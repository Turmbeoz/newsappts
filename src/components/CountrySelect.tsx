import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {  useState, useContext } from 'react';
import {NewsUserContext} from '../customHooksAndFuncs/userNewsContext'
import availArr from "../customHooksAndFuncs/availableCoonutriesonAPI"





function CountrySelect({ countries, nickname }) {
  countries.sort(function(a, b){return a.name > b.name})
  const [country, setCountry] = useState({...countries[0]})
  const { userInfo, setUserInfo } = useContext(NewsUserContext);

  const handleChange = (event: Event) => {
    setCountry(event.target.value as string);
    console.log(userInfo.newCountry)
    setUserInfo({...userInfo, countryIndex: event.explicitOriginalTarget.id, activeFeed: true, newCountry: true })
  };
  const dropDownList = []
  for (let i=0; i<countries.length; i++){
    dropDownList.push(<MenuItem id={countries[i].objIndex} key={countries[i].objIndex} value={countries[i].name}>{countries[i].name}</MenuItem>)
  }
  console.log(countries);
  console.log(availArr)
  return (
    <div className="bg-info"> 
    <h1 style={{
      top: "0px",
      padding: "11px",
      border: "solid 4px black",
      backgroundColor: "white"
    }}>The What are They Saying About {nickname}? Times</h1>
    

    <FormControl fullWidth>
  <InputLabel id="country-select-label-input">Select Your Country</InputLabel>
  <Select
    labelId="country-select-label"
    id="country-select-labelid"
    value={country}
    label="Select Your Country"
    onChange={handleChange}
  >
    {dropDownList}
  </Select>
</FormControl>
  </div>
  )
}

export default CountrySelect