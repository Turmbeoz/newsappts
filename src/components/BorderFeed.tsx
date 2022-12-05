import { useState, useContext } from "react"
import {NewsUserContext} from '../customHooksAndFuncs/userNewsContext'



function BorderFeed({ borderCountries }){
    const { userInfo, setUserInfo } = useContext(NewsUserContext);
    console.log("Inside borders")
    console.log("");
    // const twoLetters = []
    // for (let i = 0; i < borderCountries.length; i++){
    //     const threeLetter = borderCountries[i];

    // }
    const [state, setState] = useState("Dem Berders!!");
    const daStyle = {
        border: "solid 1px black",
        overflowY: "scroll",
        marginTop: "12px",
        backgroundColor: "aqua",
        width: "30%",
        gap: "1rem",
        maxWidth: "600px"
    }
    return (<>
    <div style={daStyle}>{state}</div>
    </>)
}

export default  BorderFeed