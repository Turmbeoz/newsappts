import { useState } from 'react';
import { Modal, Box, Typography, Link } from '@mui/material'

function BorderHeadlineCard(props: 'object') {
    const { title, description, linkExterenal, date, creator, language, image, content, ind } = props;
    const [titleText, setTitleText] = useState(title);
    const [articleModal, setArticleModal] = useState(false)
    if (language != "english"){
      console.log(language)
    }

    const liItemStyle = {
        backgroundColor: "hsl(0, 0%, 85%)",
        width: "100%",
        marginTop: "7px",
        padding: "6px",
        border: "solid 2px black",
  
  
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
    return (<li onTouchStart={() => openArticleModal()} onClick={() => openArticleModal()} style={liItemStyle} id={ind+"border-li-id"} key={ind+"border-li-key"}>{title}
    
    
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
    
    </li>)


  }
  
  export default BorderHeadlineCard