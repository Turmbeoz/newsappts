
import axios from 'axios'
import ISO6391 from 'iso-639-1';


function fetchTranslateText(sourceLan: 'string', textArr:[]){
    console.log("Translate Text")
    const twoLetterSource = ISO6391.getCode(sourceLan)
    const languageCode = navigator.language.slice(0, 2);
    const encodedParams = new URLSearchParams();
    encodedParams.append("source", twoLetterSource);
    encodedParams.append("target", languageCode);
    for (let i = 0; i < textArr.length; i++){
      encodedParams.append("q", textArr[i]);
    }
    

      
    const optionsTranslate = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': '4b695a839emsh2bc9a220eb8bb7bp145d02jsnf1d5f4c36f65',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams
    };
    
    // Should I return the entire request? 12 2 2022
    return axios.request(optionsTranslate).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
}

export default fetchTranslateText