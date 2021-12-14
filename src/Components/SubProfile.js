import React from 'react'
import "../Styles/global.css";
import { useState, useEffect } from 'react'
import axios from 'axios';
import env from "../PageComponents/settings"
import { BrowserRouter as Router, useHistory, Route, Switch, Link } from "react-router-dom";

function SubProfile() {

    const token = window.localStorage.getItem("firstlogin");
    // console.log(token)
    const history = useHistory()
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success } = user
    const [profName, setProfName] = useState([])

    useEffect(async () => {
        try {
            let profile = await axios.get(`${env.api}/user/getuser`,
                { headers: { Authorization: token } })
            setProfName([...profile.data])
            

        } catch (error) {
            // alert("*kindly replace directory with your file diectory to fetch data");
            console.log(error)
        }

    }, [])

     let handlelogout = async (e) => {
        // e.preventDefault()

        try {
            let logout = await axios.get(`${env.api}/user/logout`)
            window.localStorage.removeItem('firstlogin')
            setUser({ ...user, err: '', success: logout.data.msg })
            window.location.href = "/";
            // history.push('/')
        } catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
            window.location.href = "/";
        }

    }

    return (
        <>
        {profName.map((user) => {return <div className="flex items-center justify-between mt-14 ml-10" key={user._id}>
            <img className="SubproPic" src={user.profilePic} alt=""/>

            <div className="flex-1 mx-4">
                <h2 className="fint-bold">{user.firstName}</h2>
                <h3 className="text-sm text-gray-400">{user.status}</h3>
            </div>
            <button onClick={() => handlelogout()} className ="text-blue-400 text-sm font-semibold">Sign Out</button>
        </div>})}
        </>
    )
}

export default SubProfile
