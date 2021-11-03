import React from 'react'
import { SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
} from "@heroicons/react/outline";
import "../Styles/global.css";
import {useState,useEffect} from "react";
import axios from 'axios';
import env from "../PageComponents/settings"
import {EmojiHappyIcon,BookmarkIcon, ChatIcon, DotsHorizontalIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { HomeIcon} from "@heroicons/react/solid";
import { comment } from 'postcss';
import { addDoc, collection,onSnapshot,orderBy,query,serverTimestamp,setDoc,doc,deleteDoc } from '@firebase/firestore';
import { db } from '../lib/firebase/firebase';
import Moment from 'react-moment';


function Post({id,username,userImg,img,caption}) {

    const token = window.localStorage.getItem("firstlogin");
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
            console.log(profile.data)
            onSnapshot(query(collection(db,'posts',id,'comments'),orderBy('timestamp','desc')), 
            (snapshot) => {
               setComments(snapshot.docs);
               }
           )
        } catch (error) {
            // alert("*kindly Login");
            console.log(error)
        }

    }, [db,id])
    let names = profName.map((item) => item.firstName);
    let ProfilePic = profName.map((item) => item.profilePic);
    let  userid = profName.map((item) => item._id)

    const [comment,setComment] = useState("")
    const [comments,setComments] = useState([])
    const [likes,setLikes] = useState([])
    const [haslikedPost,setHasLikedpost] = useState(false)

    useEffect(() => 
        onSnapshot(collection(db,'posts',id,'likes'), 
        (snapshot) => {
           setLikes(snapshot.docs);
           }
       )
        , [db,id])

        useEffect(() => { 
            setHasLikedpost(likes.findIndex((like)=>like.id===userid.toString())!==-1 )
            
        }, [likes]) 
          
        const likedPost = async () =>{
            if(haslikedPost) {
                await deleteDoc(doc(db,'posts',id,'likes',userid.toString()))
            }else{
            await setDoc(doc(db,'posts',id,'likes',userid.toString()),
            {
                username:names
            });
            }
        }  
     
       
    console.log(haslikedPost)

    const sendComment = async(e) =>{
        e.preventDefault();
        const commentTosend = comment;
        setComment("");
        await addDoc(collection(db,'posts',id,'comments'),{
            comment : commentTosend,
            username:names,
            profileImg : ProfilePic,
            timestamp:serverTimestamp()
        })
    }

    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt=""/> 
                <p className="flex-1 font-bold">{username}</p>          
                <DotsHorizontalIcon className="h-5"/> 
            </div>
            {/* IMG */}
            <img src={img} className="object-cover w-full " alt="" />
            {/* button */}
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    {
                        haslikedPost ? (
                            <HeartIconFilled onClick={likedPost} className="PostIconBtn btn text-red-500"/>
                        ) :(
                            <HeartIcon onClick={likedPost} className="PostIconBtn btn"/>
                        )
                    }
                    <ChatIcon className="PostIconBtn"/>
                    <PaperAirplaneIcon className="PostIconBtn"/>
                </div>
                <BookmarkIcon className="PostIconBtn" />
            </div>
            
            {/* caption */}
                <div>
                    <p className="p-5 truncate">
                        {
                            likes.length > 0 && (
                                <p className="font-bold mb-1">{likes.length} likes</p>
                            )
                        }
                        <span className="font-bold mr-1">{username}</span>{caption}</p>
                </div>
            {/* comment */}
            {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map(comment =>(
                        <div keys={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment.data().profileImg} alt=""/> 
                            <p className="text-sm flex-1"><span className="font-bold">
                                {comment.data().username}</span>{" "}{comment.data().comment}
                                </p>
                                <Moment fromNow>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                        </div>
                    ))}
                </div>
            )}
            {/* input */}
            <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7" />
                <input value={comment} onChange={e=>setComment(e.target.value)} className="border-none flex-1 focus:ring-0" type="text" placeholder="Add a comment.."></input>
                <button type="submit" disabled={!comment.trim()} onClick={sendComment} className="font-semibold text-blue-400">Post</button>
            </form>
        </div>
    )
}

export default Post
