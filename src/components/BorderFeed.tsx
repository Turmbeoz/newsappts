import { useState, useContext, useEffect } from "react"
import {NewsUserContext} from '../customHooksAndFuncs/userNewsContext';
import getCountryISO2 from "country-iso-3-to-2";
import availArr from "../customHooksAndFuncs/availableCoonutriesonAPI"


function BorderFeed({ borderCountries }){
  const [borderStories, setBorderStories] = useState();
  const [translateData, setTranslateData] = useState({ makeCall: false, stories: [], translatedData: [] });
  const [state, setState] = useState("Dem Berders!!");
  const { userInfo, setUserInfo } = useContext(NewsUserContext);
  function getTheOtherCountriesNews(arrofThreeLetters: string[]){
    let newsQueryString = `https://newsdata.io/api/1/news?apikey=pub_139957d57ebfc365940ccdcd05c1f0136ff10&country=`;
    let newQ = ''
    if (arrofThreeLetters.length > 5){
      arrofThreeLetters.sort(() => Math.random() - 0.5);
      arrofThreeLetters.length = 5
    }
    for (let i = 0; i < arrofThreeLetters.length;){
      arrofThreeLetters[i] = getCountryISO2(arrofThreeLetters[i])
    }
    const filterArr = arrofThreeLetters.filter((x) => availArr.includes(x));
    console.log(filterArr)
    for (let i = 0; i < filterArr.length; i++){
        
        const orParam = i === 0? "" : ","
        newQ = newQ + orParam + getCountryISO2(filterArr[i])
    }  
    newsQueryString = newsQueryString + newQ;
    console.log(newsQueryString)
    fetch(newsQueryString)
    .then((res) => res.json())
    .then((resJson) => {
      console.log("Got the data IN DA BODERDERRERE");
      console.log(resJson.results);
      localStorage.setItem('storiesFromDaBorder', JSON.stringify(resJson.results));
      setBorderStories(() => resJson.results);
      const rez = resJson.results
      for (let i = 0; i < rez.length; i++){
        const story = rez[i]
        if (story.language != "english"){
            const storyData = { index: i, title: story.title, language: story.language};
            translateData.stories.push(storyData);
            
        }
      }
      console.log(translateData);
      if (translateData.stories.length >0){
        setTranslateData(() => {
          return {...translateData, stories: translateData.stories}
      })
      }

  }).catch((err) =>{
    console.log("HEres the error thats inside da Berder FERD!!!!!")
  })
}
useEffect(()=>{
  setTimeout(()=>{
    // getTheOtherCountriesNews(borderCountries)
    console.log(borderCountries)

   }, 800) // Need to get an array of two letter country symbols
}, [])
    if (!(userInfo.bordersActive)){
        return 
    }else if(!borderCountries || borderCountries.length === 0){
      return 
    }
    
    

    console.log("Inside borders");



    
    const daStyle = {
        border: "solid 1px black",
        overflowY: "scroll",
        marginTop: "12px",
        backgroundColor: "aqua",
        width: "30%",
        gap: "1rem",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column"
    }
    return (<>
    
    <div style={daStyle}></div>
    </>)
}

export default BorderFeed;