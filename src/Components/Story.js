import React from 'react'
import "../Styles/global.css";

function Story({img,username}) {
    return (
        <div>
           <img className="storyImg" src={img} alt=""></img>
           <p className="text-xs w-14 truncate text-center">{username}</p> 
        </div>
    )
}

export default Story
