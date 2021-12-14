import {useEffect,useState} from 'react'
import faker from 'faker'
import axios from "axios";
import Story from './Story'; 
import "../Styles/global.css";
import env from "../PageComponents/settings"

function Stories() {
    const token = window.localStorage.getItem("firstlogin");
    const [suggestions, setSuggestions] = useState([]);
    useEffect(async() => {
        try{
            let product = await axios.get(`${env.api}/user/getalluser`, {
                            headers: {Authorization: token}
                        })
                        setSuggestions([...product.data])
      
          }
          catch{
            console.log("error");
       
          }
     
    }, [])
    return ( 
        <div className="storiesNav">
            {
                suggestions.map(profile=>(
                    <Story key={profile.id} img={profile.profilePic} username={profile.firstName}/>              //{profile.avatar}
                ))
            }
        </div>
    )
}

export default Stories
