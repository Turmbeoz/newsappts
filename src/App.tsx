import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import CountrySelect from './components/CountrySelect';
import { NewsUserContext } from './customHooksAndFuncs/userNewsContext';
import NewsFeed from './components/NewsFeed';
import './App.css';
import { border } from '@mui/system';
import BorderFeed from './components/BorderFeed';
// import RestCountries from "../node_modules/rest-countries-node/lib/RestCountries.js"
// const restCountries = new RestCountries()
const COUNTRY_API_KEY_TEMP = "84df356fbb63b0bbe655565ecb1499ab";
const betterURL = `https://restcountries.com/v3.1/all`;
// const countriesArray: Array<String> = [] 
// console.log(process.env.COUNTRY_INFO_TOKEN)


function App() {
  const [userInfo, setUserInfo] = useState({countryIndex: 186, activeFeed: false, newCountry: false, bordersActive: false,  borderCall: "" })
  const [countries, setCountries] = useState({list: [], countryNames: []});
  const countryNamesArrFilt = (listObj: []) =>{
    const finArr = [];
    for (let i=0; i<listObj.length; i++){
      // console.log(listObj[i].name.common)
      finArr.push({ name: listObj[i].name.common, objIndex: i, cca2: (listObj[i].cca2).toLowerCase() })
    }
    return finArr;

  } 
  const fetchCountries = async () => {
    const res = await fetch(betterURL, {
      method: "GET"
    });
    const data = await res.json();
    localStorage.setItem('countries', JSON.stringify(data));
    const namesOnly = countryNamesArrFilt(data)
    setCountries({ list: data, countryNames: namesOnly });
    
    return 

  }


  
  useEffect(() => {
    if (localStorage.getItem('countries') === null) {
      console.log("New Request to API")
      fetchCountries();
    }else{
      const items = JSON.parse(localStorage.getItem('countries'));
      console.log("We here now");
      const namesOnly = countryNamesArrFilt(items)
      setCountries(()=>{ 
        return { list: items, countryNames: namesOnly.sort() }
      });
      const homie = countries.list.length>0? countries.list[userInfo.countryIndex].borders : []
      console.log(homie)
      

    }
    
  }, [])
  return (
    <>
    <div className="App">
    <NewsUserContext.Provider  value={{ userInfo, setUserInfo }}>

      
      <CountrySelect countries={countries.countryNames} nickname={countries.list.length>0? countries.list[userInfo.countryIndex].altSpellings[0] : "Us"}/>
      <div style={{display: "flex", flexDirection: "row"}}>

      <NewsFeed activeFeed={userInfo.activeFeed} home={countries.list.length>0? countries.list[userInfo.countryIndex] : "NOTHING"}/>
      <BorderFeed borderCountries={countries.list.length>0? countries.list[userInfo.countryIndex].borders : []} />
      </div>

      </NewsUserContext.Provider>

    

   

    </div>

    </>
  )
}

export default App



