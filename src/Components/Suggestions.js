import React from 'react'
import {useEffect,useState} from 'react'
import faker from "faker"
import env from "../PageComponents/settings"
import axios from "axios";

function Suggestions() {
    const token = window.localStorage.getItem("firstlogin");
    const [suggestions,setSuggestions] = useState([]);
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
        <div className="mt-4 ml-10">
            <div className ="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestion for you</h3>
                <button className="text-gray-600 font-semibold">See all</button>
            </div>
            {
            suggestions.map((profile) =>(
                <div className="flex items-center justify-between mt-3" key={profile.id}>
                    <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.profilePic} alt="" />
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{profile.firstName}</h2>
                        <h3 className="text-gray-400 text-xs">{profile.status}</h3>
                    </div>
                    <button className="text-blue-400 text-sm">Follow</button>
                </div>
            ))
        }
        </div>
       
    )
}

export default Suggestions
