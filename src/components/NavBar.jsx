import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../redux/userSlice'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const NavBar = () => {
    const user = useSelector((store)=>store.user)
    const dispatch = useDispatch()
    const handleLogout=async()=>{
        const response = await axios.post(`${BASE_URL}/logout`,{withCredentials:true})        
        dispatch(removeUser())
        try{

        }catch(e){
            console.log(e.message)
        }
    }
  return (
    <>
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-100">
    <div className="flex-1">
        <Link to='/dashboard' className="btn btn-ghost text-xl">DevTinder</Link>
    </div>
    {user&&<div className="flex gap-2 items-center">
        <h1 className=''>{`welcome, ${user?.firstName}`}</h1>
        <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
                src={
                    user?.profilePicture || 
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                } 
                alt="Profile"
            />
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
            <Link to='/profile' className="justify-between">
                Profile
                <span className="badge">New</span>
            </Link>
            </li>
            <li>
            <Link to='/connections' className="justify-between">
                Connections
            </Link>
            </li>
            <li><a>Settings</a></li>
            <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
        </ul>
        </div>
    </div>}
    </div>
    </>
  )
}

export default NavBar