import { useState } from 'react';
import { Modal, Box, Typography, Link } from '@mui/material'

function StoryCard(props: 'object') {
    const { title, description, linkExterenal, date, creator, language, image, content } = props;
    const [titleText, setTitleText] = useState(title);
    const [articleModal, setArticleModal] = useState(false)
    if (language != "english"){
      console.log(language)
    }
    const cardStyle = {
      display: "flex",
      flexDirection: 'column',
      paddingTop: "10px"
     
    }
    const imageArt = image? <img style={{
      maxWidth: "130px",
      minWidth: "90px",
      overflowY: "hidden"
    }} src={image}/>: null
    const dateReleased = new Date(date);
    function openArticleModal(){
      setArticleModal(!articleModal)
    }
    return (
      <li className="story-card" style={cardStyle}> 
      <div style={{
        display: "flex",
        flexDirection: "row",
        overflow: "hidden"
      }}> <div onTouchStart={() => openArticleModal()} onClick={() => openArticleModal()} className='headline-and-photo' style={{      
        display: "flex",
        flexDirection: 'row',
        backgroundColor: "hsl(0, 0%, 85%)",
        padding: "5px"
        
        }}>{imageArt}<h1 style={{margin: "5px", padding: "2px" }}>{title}</h1></div>
      </div>

      {(language != 'english' && description)? <button>Translate Description</button> : null}
      <p style={{
        fontSize: "20px",
      }}>{description}</p>
      <div>{creator} </div>
      
<Modal
  open={articleModal}
  onClose={openArticleModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{display: "flex", justifyContent: "center"}}
>
  <Box sx={{ mt: 2, width: "70%", backgroundColor: "hsl(0, 0%, 90%)", paddingLeft: "18px", paddingRight: "18px", paddingTop: "10px", marginBottom: "36px", overflowY: "scroll" }}>
  <Typography sx={{ border: "solid 4px", padding: "7px", marginBottom: "38px" }} id="modal-modal-title" variant="h4" component="h2">
      {title}
    </Typography>
    <Typography id="modal-modal-content" variant="h6" component="h2">
      {content? content : description}
    </Typography>

  </Box>
</Modal>
      
    </li>
    )
  }
  
  export default StoryCard