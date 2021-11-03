import React from 'react'
import {useState} from 'react'
import env from "./settings"
import "./login.css";

import axios from 'axios';
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'
// import 'bootstrap/dist/css/bootstrap.css';


function Forgotpassword() {
    const initialState = {
        err: '',
        success: ''
    }
    // const {token} = useParams()
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [userName, setUsername] = useState("");

    let history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        console.log({userName})
        try {
            let forgotData= await axios.post(`${env.api}/user/forgotpwd`,{userName})
            // console.log(forgotData)
            setUser({...user, err: '', success: forgotData.data.msg})
            window.localStorage.setItem("app_token",forgotData.data.token)

            // alert(loginData.data.message)
            
        } catch (err) {
            // console.log(error)
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
                                <h3 class=" text-white text-center">Forgot your password</h3>
                    <h6 class=" text-white text-center">enter your EmailID</h6>
                    <div>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                    </div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="username">
									Username
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="username@example.com"
                                    value={userName} onChange={e =>setUsername(e.target.value)}
								/>
							</div>
                            <div class="mb-6 text-center">
								<input
									class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit" value="Verify"
								/>
								
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<Link
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									to="/register"
								>
									Create an Account!
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
    </>
    )
}

export default Forgotpassword
