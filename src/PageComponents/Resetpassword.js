import React from 'react'
import { useState } from 'react'
import env from "./settings"
import "./login.css";
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { useHistory } from "react-router-dom"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Resetpassword() {
    const initialState = {
        err: '',
        success: ''
    }
    const {id} = useParams()
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUser({...user, err: "Password did not match.", success: ''})
            console.log({password,confirmPassword})
        try {
            let resetData = await axios.post(`${env.api}/user/resetpwd`,{password},
            {headers: {Authorization: id}})
            setUser({...user, err: '', success: resetData.data.msg})
            history.push("/")
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <>
         <div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					
					<div
						class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
						<img src="/Data/Avatars/yann-allegre-FvUrGzdYRms-unsplash.jpg"/>
					</div>
					
					<div class="w-full lg:w-1/2 login1 p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center"></h3>
						<form onSubmit={(e) => {
                            handleSubmit(e);
                            }} class="px-8 pt-6 pb-8 mb-4 login rounded">
                                <h3 className= "text-white text-center">Reset your password</h3>
                        <h6 className= "text-white text-center">enter your new password</h6>
                        <br></br>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        <br></br>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="password">
									Password
								</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder="******************"
                                    value={password} onChange={e =>setPassword(e.target.value)}
								/>
								{/* <p class="text-xs italic text-red-500">Please choose a password.</p> */}
							</div>
                            <div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="password">
									Confirm Password
								</label>
								<input
									class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="Confirmpassword"
									type="password"
									placeholder="******************"
                                    value={confirmPassword} onChange={e =>setConfirmpassword(e.target.value)}
								/>
								{/* <p class="text-xs italic text-red-500">Please choose a password.</p> */}
							</div>
							<div class="mb-6 text-center">
								<input
									class="w-full btn btn-lg px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit" value="Reset"
								/>
		
							</div>
							<hr class="mb-6 border-t" />
						</form>
                        {err&& showErrMsg(err)}
                        {success && showSuccessMsg(success)}
					</div>
				</div>
			</div>
		</div>
        </>
    )
}

export default Resetpassword
