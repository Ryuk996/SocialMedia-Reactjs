import "./login.css";
import React ,{useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import env from "./settings"
import {Link} from "react-router-dom"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'
// import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
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
            
        try {
            let registerData = await axios.post(`${env.api}/user/register`,{firstName,lastName,userName,password})
            setUser({...user, err: '', success: registerData.data.msg})
            
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
        // await axios.post(`${env.api}/register`,{userName,password})
        
    }
    return (
        <>
         <div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					
					<div
						class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
							<img src="/Data/Avatars/yann-allegre-FvUrGzdYRms-unsplash.jpg"/></div>
					
					<div class="w-full lg:w-1/2 login1 p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center"></h3>
						<form onSubmit={(e) => {
                            handleSubmit(e);
                            }} class="px-8 pt-6 pb-8 mb-4 login rounded">
                        <div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="username">
									Username
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
                                    value={firstName} onChange={e =>setFirstname(e.target.value)}
								/>
							</div>
                            <div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="username">
									Lastname
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
                                    value={lastName} onChange={e =>setLastname(e.target.value)}
								/>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-white" for="username">
									Email
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
							<div class="mb-4">
								<input class="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label class="text-sm text-white" for="checkbox_id">
									Remember Me
								</label>
							</div>
							<div class="mb-6 text-center">
								<input
									class="w-full btn btn-lg px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit" value="Register "
								/>
		
							</div>
							<hr class="mb-6 border-t" />
							<div class="text-center">
								<Link
									class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									to="/login"
								>
									Already have a Account!
								</Link>
							</div>
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

export default Register
