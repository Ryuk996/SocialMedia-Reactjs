import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../Atom/modalAtom'
import {Dialog, Transition} from "@headlessui/react"
import { CameraIcon } from '@heroicons/react/solid';
import {useState,useRef,useEffect} from "react";
import axios from 'axios';
import env from "../PageComponents/settings"
import { BrowserRouter as Router, useHistory, Route, Switch, Link } from "react-router-dom";
import {db,storage} from "../lib/firebase/firebase";
import {addDoc,collection,serverTimestamp,updateDoc,doc} from "@firebase/firestore";
import {ref,getDownloadURL,uploadString} from "@firebase/storage"


function Modal() {

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
            let profile = await axios.get(`${env.api}/user/getuser`, {
                headers: {Authorization: token}
            })
            setProfName([...profile.data])
            

        } catch (error) {
            // alert("*kindly replace directory with your file diectory to fetch data");
            console.log(error)
        }

    }, [])
    let names = profName.map((item) => item.firstName);
    let ProfilePic = profName.map((item) => item.profilePic);
    let  email = profName.map((item) => item.userName)
    // console.log(names)
    const[loading,setLoading] = useState(false)
    const[open,setOpen] = useRecoilState(modalState)
    const captionRef = useRef(null);
    const filePickerRef = useRef(null);
    const[selectedFile,setSelectedFile] = useState(null)

    const uploadPost = async () => {
        console.log(names)
        if(loading) return;

        setLoading(true);
        const docRef= await addDoc(collection(db,'posts'),
        { 
            username:names,
            email: email,
            caption:  captionRef.current.value,
            profileImg : ProfilePic,
            timestamp:serverTimestamp()
        })
        console.log("New doc added with ID",docRef.id)

        const imageRef = ref(storage,`posts/${docRef.id}/image`)

        await uploadString(imageRef,selectedFile,"data_url").then (async snapshot =>{
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db,'posts',docRef.id),{
                image: downloadURL
            })
        })
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }
    
    const addImageToPost = (e) =>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
    }
    }
    return (
        <Transition.Root show={open} as={Fragment} >
            <Dialog as='div' className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>
                {/* this element is to trick the browser into centering the modal contents */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;

                </span>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ">

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
                transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        {
                            selectedFile ? (
                                <img src={selectedFile} className="w-full object-conatin cursor-pointer" onClick={()=> setSelectedFile(null)} alt=""/>
                            ) : (
                                <div onClick={()=> filePickerRef.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                            <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                        </div>
                            )
                        }
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className='text-lg leading-6 font-medium text-gray-900'>Upload Photo</Dialog.Title>
                                <div>
                                    <input 
                                    ref={filePickerRef} 
                                    type="file" hidden 
                                    onChange={addImageToPost} 
                                    />
                                </div>
                                <div className="mt-2">
                                    <input  className="border-none focus:ring-0 w-full text-center" type="text" 
                                    ref={captionRef}
                                    placeholder="please enter  a caption"/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button type="button" className="uploadbutton disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300 "
                              disabled ={!selectedFile} onClick={uploadPost}>{loading ? "Uploading..." : "Upload post"}</button>
                        </div>
                    </div>

                </div>
                </Transition.Child>

                
                </div>
            </Dialog>

        </Transition.Root>
        // <div>
        //     {/* <h1>i m a modal</h1> */}
        //     {open && <p>Modal is open</p>}
        // </div>
    )
}

export default Modal
