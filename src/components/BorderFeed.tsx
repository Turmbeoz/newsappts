import { useState, useContext, useEffect } from "react"
import {NewsUserContext} from '../customHooksAndFuncs/userNewsContext';
import getCountryISO2 from "country-iso-3-to-2";
import availArr from "../customHooksAndFuncs/availableCoonutriesonAPI";
import { Modal, Box, Typography, Link } from '@mui/material'
import BorderHeadlineCard from "./BorderHeadlineCard"


function BorderFeed({ borderCountries }){
  const [borderStories, setBorderStories] = useState();
  const [translateData, setTranslateData] = useState({ makeCall: false, stories: [], translatedData: [] });
  const [state, setState] = useState("Dem Berders!!");
  const { userInfo, setUserInfo } = useContext(NewsUserContext);
  function getTheOtherCountriesNews(arrofThreeLetters: string[]){
    if (!arrofThreeLetters){
      return null
    }
    // let newsQueryString = `https://newsdata.io/api/1/news?apikey=pub_139957d57ebfc365940ccdcd05c1f0136ff10&country=`;
    let newsQueryString = `https://newsdata.io/api/1/news?apikey=pub_139957d57ebfc365940ccdcd05c1f0136ff10`;
    const xxx = arrofThreeLetters.map((x)=> getCountryISO2(x).toLowerCase())
    const finArr = [];
    let indJumper = 0;
    while (xxx.length > 0){
      const twoLetter = xxx.shift();
      const indOfTwoLetter = availArr.indexOf(twoLetter, indJumper);
      if (indOfTwoLetter >= 0){
        finArr.push(twoLetter)
      } 
      indJumper = Math.max(indJumper, twoLetter+1)


    }
    let newQ = ''
    if (finArr.length > 5){
      finArr.sort(() => Math.random() - 0.5);
      finArr.length = 5
    }
    for (let i = 0; i < finArr.length; i++){
        
        const orParam = i === 0? "&country=" : ","
        newQ = newQ + orParam + finArr[i]
    }  

    console.log(newsQueryString+newQ)
    fetch(newsQueryString)
    .then((res) => res.json())
    .then((resJson) => {
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
        getTheOtherCountriesNews(borderCountries)

      
    }, [userInfo])
    if (!(userInfo.bordersActive)){
        return 
    }else if(!borderCountries || borderCountries.length === 0){
      return 
    }
    
    

    console.log("Inside borders");
    console.log(borderStories)


    
    const daStyle = {
        border: "solid 1px black",
        overflowY: "scroll",
        marginTop: "12px",
        backgroundColor: "hsl(0, 0%, 55%)",
        width: "30%",
        gap: "1rem",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        height: "85vh",
        
    }
    const borderStoriesJSX = [];
    for (let i = 0; i < borderStories.length; i++){
      // console.log(i)
      const jsx = (<BorderHeadlineCard ind={i} title={borderStories[i].title} description={borderStories[i].description}/>);
      borderStoriesJSX.push(jsx)
    }
    return (<>
    
    <div style={daStyle}>

      <ul id="border-box" style={{ display: "flex", flexDirection: "column", justifyContent: "center", listStyleType: "none"}}>
        {borderStoriesJSX}
      </ul>
    </div>
    </>)
}

export default BorderFeed;