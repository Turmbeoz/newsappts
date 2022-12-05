import { useState } from 'react';


function StoryCard(props: 'object') {
    const { title, description, linkExterenal, date, creator, language, image } = props;
    const [titleText, setTitleText] = useState(title);
    if (language != "english"){
      console.log(language)
    }
    const cardStyle = {
      display: "flex",
      flexDirection: 'column',
     
    }
    const imageArt = image? <img style={{
      maxWidth: "130px",
      minWidth: "90px",
      overflowY: "hidden"
    }} src={image}/>: null
    const dateReleased = new Date(date)
    return (
      <li className="story-card" style={cardStyle}> 
      <div style={{
        display: "flex",
        flexDirectin: "row",
        overflow: "hidden"
      }}>{imageArt}<h1 style={{margin: "5px", padding: "2px"}} margin={0}>{titleText}</h1></div>
      
      <p style={{
        fontSize: "12px"
      }}>{description}</p>
      <div>{creator} </div>
      {language != 'english'? <button>Translate</button> : null}
      
    </li>
    )
  }
  
  export default StoryCard