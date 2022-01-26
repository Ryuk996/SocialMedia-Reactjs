import React from 'react'
import {useState} from 'react'
import env from "./settings"
import "./login.css";

import axios from 'axios';
import {useHistory} from "react-router-dom"
import {Link} from "react-router-dom"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'

// import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user 
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    

    let history = useHistory()
    let handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const loginData= await axios.post(`${env.api}/user/login`,{userName,password})
            // setUser({...user, err: '', success: loginData.data.msg})
            window.localStorage.setItem("firstlogin",loginData.data.aToken)

            // alert(loginData.data.message)
            history.push("/")
        } catch (err) {
            // console.log(error)
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
        {/* <h1>login</h1> */}
        <div className=" login0">
        <div class="container mx-auto ">
			<div class="flex justify-center  px-6 my-12">
				
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					
					<div
						class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						// style={{backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"}}
					><img src="/Data/Avatars/yann-allegre-FvUrGzdYRms-unsplash.jpg"/></div>
					
					<div class="w-full lg:w-1/2 login1 p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
						<form onSubmit={(e) => {
                            handleSubmit(e);
                            }} class="px-8 pt-6 pb-8 mb-4  login rounded">
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
								<p class="text-xs italic text-red-500">Please choose a password.</p>
							</div>
							<div class="mb-4">
								<input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label class="text-sm text-white" for="checkbox_id">
									Remember Me
								</label>
							</div>
							<div class="mb-6 text-center">
								<input
									class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit" value="Login "
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
							<div class="text-center">
								<Link
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									to="/forgot_pwd"
								>
									Forgot Password?
								</Link>
							</div>
						</form>
                        {err&& showErrMsg(err)}
                        {success && showSuccessMsg(success)}
					<div className="credential">                                                   
                        			<h6>Demo credential</h6>
                        			<h6>userId : tanjiro@thail.com</h6>
                        			<h6>password : 12345678</h6>
                    			</div>
					</div>
				</div>
			</div>
		</div>
        </div>
    </>
    )
}

export default Login
