import { useContext, useEffect, useState } from "react";
import StoryCard from "./StoryCard"
import {NewsUserContext} from '../customHooksAndFuncs/userNewsContext'
import fetchTranslateText from "../customHooksAndFuncs/translateRequest";
import BorderFeed from "./BorderFeed";

function NewsFeed({ home, activeFeed }) {
  if (!activeFeed){
    return <></>;
  }
  // home variable is the home country
  const { userInfo, setUserInfo } = useContext(NewsUserContext);
  const { newCountry } = userInfo;
  const [flag, setFlag] = useState(null)
  const [newsData, setNewsData] = useState();
  const [borderSwitchBool, setBorderSwitchBool] = useState(false)
  const [translateData, setTranslateData] = useState({ ready: false, arr: [], langStr: [], translated: [], indices: [], apiCallBool: true })
  function getTheNews(urlx: string){
    console.log("Getting the news")
    const grabber = (url: string)=> fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        localStorage.setItem('stories', JSON.stringify(resJson.results));
        setNewsData(() => resJson);
        const rez = resJson.results
        for (let i = 0; i < rez.length; i++){
          const story = rez[i]
          if (story.language != "english"){
              translateData.arr.push(story.title)
              translateData.langStr.push(story.language);
              translateData.indices.push(i);
          }
        }
        // make api call here inside of the useEffect and inside of the response!
        // const x = fetchTranslateText(translateData.langStr[0], translateData.arr);
        // console.log(x)
        setTranslateData(() => translateData)
    }).catch((err) =>{
      console.log("HEres the error");
      console.log(err);

      // grabber(partial[0]+"&"+partial[2])
    })
    grabber(urlx)
  }
  const translatedArr = [];

  let newsQueryString = `https://newsdata.io/api/1/news?apikey=pub_139957d57ebfc365940ccdcd05c1f0136ff10&country=${home.cca2}`;
  let newQ = ''
  if (home.name){
    const commonName = home.name.common
    const officialName = home.name.official.split("Republic of ");
    const nativeName = Object.values(home.name.nativeName)[0].common;
    const demonym = home.demonyms.eng.f
    const searchParams = [commonName, demonym, officialName[officialName.length-1], nativeName, ...home.altSpellings.slice(1)];
    const uniqueParams = searchParams.filter((element, index) => {
      return searchParams.indexOf(element) === index;
  });
    for (let i = 0; i < uniqueParams.length; i++){
      const orParam = i === 0? "&q=" : "%20OR%20"
      const noRepub = uniqueParams[i].replaceAll("Republic of", "")
      const noSpaces = noRepub.replaceAll(" ", "%20")
      newQ = newQ + orParam + noSpaces
    }  
    
    
    // const x = encodeURI(newsQueryString)


    
  }
  useEffect(()=>{

    if (!(newsData) && home.name || newCountry === true){
      console.log("No stories found");
      getTheNews(newsQueryString + newQ)
      setUserInfo(() => {
        return {...userInfo, newCountry: false, bordersActive: true }})
    }else{
      const newsStories = JSON.parse(localStorage.getItem("stories"))
      setNewsData(() => newsStories);
      
      console.log("Used the stories in localstorage")
    }

  }, [home])

    const newsFeedStyle = {
        border: "solid 1px black",
        overflowY: "scroll",
        marginTop: "12px",
        backgroundColor: "white",
        width: "100%",
        height: "85vh",
        gap: "1rem",
        maxWidth: "600px"
    }
    const themStories = [];

    if (newsData && newsData.results){
      for (let i = 0; i < newsData.results.length; i++){
        const storyData = newsData.results[i];
        // const titleofArticle = translateData.arr[i]? translateData.arr[i] : storyData[i].title
        const story = (<StoryCard key={i} image={storyData.image_url} title={storyData.title} description={storyData.description} creator={storyData.creator} language={storyData.language} linkExternal={storyData.link} date={storyData.pubDate} content={storyData.content}/>)
        themStories.push(story);

      }
      if (!(translateData)){

      }
    }

    return (
      <div className="news-feed" style={newsFeedStyle}>

        <ul style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingLeft: "3px" }}>{themStories}</ul>
      
    </div>
    )
  }
  
  export default NewsFeed