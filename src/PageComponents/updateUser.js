import React, { useEffect, useRef, useState } from "react"
import axios from "axios";
import { useHistory } from "react-router";
import env from "./settings"
import "./updateUser.css"
import {showErrMsg, showSuccessMsg} from '../Notifications/Notification'
import { db, storage } from "../lib/firebase/firebase";
import { HomeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { link } from "fs";
import { CameraIcon } from "@heroicons/react/outline";
export default function UpdateUser(){

    const token = window.localStorage.getItem("firstlogin");
    const initialState = {
        err: '',
        success: ''
    }
    const [user, setUser] = useState(initialState)
    const { err, success} = user
    const [firstName, setFirstName]=useState(" ");
    const [userName, setUsername]=useState(" ");
    const [profilePic, setProfilePic]=useState(" ");
    const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmpassword] = useState("");
     const [status, setStatus]=useState(" ");
     const filePickerRef = useRef(null);
     const[selectedFile,setSelectedFile] = useState(null)
    const[isLoading,setLoading]=useState(false)
    const history = useHistory();

    useEffect(async()=>{
      try{
        let product = await axios.get(`${env.api}/user/getuserInfo`, {
                        headers: {Authorization: token}
                    })
      setUsername(product.data.userName)             
      setFirstName(product.data.firstName)
      setProfilePic(product.data.profilePic)
      setStatus(product.data.status)
      
    //   setLoading(true)
      }
      catch{
        console.log("error");
        // setLoading(true)
      }
    },[])
    const addImageToPost = (e) =>{
        setUser({...user, err: "" , success: ''})
        const reader = new FileReader();
        const file = e.target.files[0]
    
    if(file){
            reader.readAsDataURL(file);
         }
    
    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
    }
    
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        setUser({...user, err: "" , success: ''})
        if(!selectedFile) return setUser({...user, err: "No files were uploaded." , success: ''})
    
        const ext = selectedFile.split(':')[1].split(';')[0]                                //getting the file extension
            console.log(ext)
            
        
    if(ext !== 'image/jpeg' && ext !== 'image/png')
        return setUser({...user, err: "File format is incorrect." , success: ''})
        try {

            if(isLoading) return;

        setLoading(true);
        const docRef= await addDoc(collection(db,'profile'),
        { 
            
            timestamp:serverTimestamp()
        })
        console.log("New doc added with ID",docRef.id)

        const imageRef = ref(storage,`profile/${docRef.id}/image`)
        console.log(imageRef)
        await uploadString(imageRef,selectedFile,'data_url').then (async (snapshot) =>{
            const downloadURL = await getDownloadURL(imageRef);
            await setProfilePic(downloadURL)
        })
        setLoading(false);
        setSelectedFile(null);
        setSelectedFile([""])

        console.log("success")
            
        } catch (error) {
            setUser({...user, err: "retry upload" , success: ''})
            console.log(error)
        }
    }

    const updateInfor = () => {
        try {
             axios.put(`${env.api}/user/updateuser`, {
                firstName: firstName ? firstName : firstName,
                profilePic: profilePic ? profilePic : profilePic,
                status: status ? status : status,
            },{
                headers: {Authorization: token}
            })
            console.log("update success")
            setUser({...user, err: '' , success: "Updated Success!"})
        } catch (err) {
            setUser({...user, err: err.response.data.msg , success: ''})
        }
    }
    const updatePassword = async () => {
        const isMatch = (password, confirmPassword) => {
            if(password === confirmPassword) return true
            return false
        }
        if(!isMatch(password, confirmPassword))
            return setUser({...user, err: "Password did not match.", success: ''})
            console.log({password,confirmPassword})
        try {
            let resetData = await axios.post(`${env.api}/user/resetpwd`,{password},
            {headers: {Authorization: token}})
            setUser({...user, err: '', success: resetData.data.msg})
        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if(firstName || profilePic || status) updateInfor()
        if(password) updatePassword()
    }

    return(
        <div>
            <div class="container mx-auto">
			<div class="flex justify-center px-6 my-12">
				
				<div class="w-full xl:w-3/4 lg:w-11/12 flex">
					
					<div
						class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						style={{backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"}}
					></div>
					
					<div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
                        {err&& showErrMsg(err)}
                        {success && showSuccessMsg(success)}
						<form  class="px-8 pt-6 pb-8 mb-4 bg-green-500 rounded">
                        <div class="mb-4">
                            <div>
                            <Link to="/drive"><HomeIcon className="homeBTNX sm:visible "></HomeIcon></Link>
                            </div>
                        {/* <Link to="/"><HomeIcon className="navBtn sm:visible "></HomeIcon></Link> */}
                        {
                            selectedFile ? (
                                <img src={ selectedFile } className="w-full object-contain cursor-pointer" onClick={()=> setSelectedFile(null)} alt=""/>
                            ) : (
                                <div onClick={()=> filePickerRef.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                            <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                        </div>
                            )
                        }
                        <div className="profilePicP">
                      { <img className="profilePic" src={ profilePic ? profilePic : profilePic} alt=""/> }
                     <img src="" alt=""/>
                     <span>
                         <i className="fas fa-camera"></i>
                         <input  ref={filePickerRef} type="file" hidden firstName="file" id="file_up" accept="image/*" onChange={addImageToPost} />
                     </span> 
                        <button onClick={changeAvatar}><CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true"/></button>
                 </div>
							</div>
                        <div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="username">
									Username
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
                                    value={firstName} onChange={e =>setFirstName(e.target.value)}
								/>
							</div>
                            <div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="username">
									Status
								</label>
								<input
									class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
                                    value={status} onChange={e =>setStatus(e.target.value)}
								/>
							</div>
							<div class="mb-4">
								<label class="block mb-2 text-sm font-bold text-gray-700" for="username">
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
								<label class="block mb-2 text-sm font-bold text-gray-700" for="password">
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
								<label class="block mb-2 text-sm font-bold text-gray-700" for="password">
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
								<label class="text-sm" for="checkbox_id">
									Remember Me
								</label>
							</div>
							<div class="mb-6 text-center">
								<button
									class="w-full btn btn-lg px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									 onClick={handleUpdate}
								>Update</button>
		
							</div>
							<hr class="mb-6 border-t" />
						</form>
                       
					</div>
				</div>
			</div>
		</div>
    </div>
    )
}


