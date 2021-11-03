import React from 'react'
import "../PageComponents/login.css"
import "../Styles/global.css"
import { useState, useEffect } from 'react'
import axios from 'axios';
import env from "../PageComponents/settings"
import { BrowserRouter as Router, useHistory, Route, Switch, Link } from "react-router-dom";

import { SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    PaperAirplaneIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
} from "@heroicons/react/outline";
import { CubeTransparentIcon, HomeIcon, UserIcon} from "@heroicons/react/solid";
import { FingerPrintIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { modalState } from '../Atom/modalAtom';

function Header() {

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
    const [open,setOpen] = useRecoilState(modalState)
    const [session,setSession] = useState(true)

    useEffect(async () => {
        try {
            let profile = await axios.get(`${env.api}/user/getuser`,
                { headers: { Authorization: token } })
            setProfName([...profile.data])
            console.log(profile.data)
            setSession(false)

        } catch (error) {
            // alert("*kindly replace directory with your file diectory to fetch data");
            console.log(error)
        }

    }, [])

    let toLogin = async () => {
        try {
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }
    }

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
        <div className="shadow-sm border-b bg-white sticky top-0 z-50  " >
            <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
            {/* {LEFT} */}
            <div className='relative hidden lg:inline-grid  w-24 cursor-pointer'>
            <h4  className="text-3xl font-black text-black pt-4 pl-2 logoZ">Sociagram</h4>
                {/* <img src="https://bit.ly/3nJWRVU" 
                    layout='fill' 
                    objectFit="contain"
                    />  */}
            </div>
            <div className='relative   w-10 lg:hidden flex-shrink-0 cursor-pointer'>
            <CubeTransparentIcon className=" pt-2  "></CubeTransparentIcon>
                {/* <img src="https://bit.ly/3BsS6VH" 
                    layout='fill' 
                    objectFit="contain"
                    />  */}
            </div>
                 <div className="max-w-xs SearchZ">
                 <div className="relative mt-1 p-3 rounded-md ">
                     <div className="absolute inset-y-0 pl-3 flex items-center pointer-event-none">
                        <SearchIcon className=" h-5 w-5 text-gray-500 "/>
                     </div>
                     <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" 
                     type="text" placeholder="Search"/>
                 </div>
                 </div>
                 {/* RIFGT */}
                 <div className=" flex items-center justify-end space-x-4">
                 <Link to="/"><HomeIcon className="navBtn "></HomeIcon></Link>
                
  <div className=" relative inline-block text-left dropdown">
    <span className="rounded-md shadow-sm"
      ><button className="dropdownBtnZ" 
       type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
        <span><MenuIcon className="h-5 md:hidden cursor-pointer"/></span>
       
        </button></span>
    <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
      <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
        
        <div className="py-1">
          <Link to="/profile" tabindex="0" className="dropdownItemsZ"  role="menuitem" >My Profile</Link>
          <a href="javascript:void(0)" tabindex="1" className="dropdownItemsZ"  role="menuitem" >Account settings</a>
          <a  onClick={() => handlelogout()} tabindex="2" className="dropdownItemsZ" role="menuitem" >Logout</a></div>
        
      </div>
    </div>
  </div>
                {/* DPROP */} 
                 <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn rotate-45"></PaperAirplaneIcon>
                    <div className="notifyBadge">3</div>
                 </div>
                    {
                        session ?<button onClick={()=>toLogin()}>SignIN</button> : <><PlusCircleIcon onClick={()=>setOpen(true)} className="navBtn"></PlusCircleIcon>
                        <Link to="/profile"><UserIcon className="navBtn"></UserIcon ></Link>
                        <HeartIcon className="navBtn"></HeartIcon></>
                    }
                 {profName.map((user) => {return <>
                 <img src={user.profilePic} 
                 alt=""
                 className='h-10 w-10 rounded-full cursor-pointer '></img>
                 </>})}
                 </div>
            </div>
        </div>
    )
}

export default Header
