import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import env from "./settings"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'
import {useHistory} from "react-router-dom"

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    let history = useHistory()
    console.log(useParams())


    useEffect(() => {
        if(activation_token){
            console.log("helo")
            const activationEmail = async () => {
                try {
                    const res = await axios.post(`${env.api}/user/activation`, {activation_token})
                    setSuccess(res.data.msg)
                    history.push("/login")
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <>
        <body class="text-center">
        <main class="form-signin">
        <div >
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        </main>
    </body>
</>
    )
}

export default ActivationEmail