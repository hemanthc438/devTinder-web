import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from './utils/constants'
import { addUser } from './redux/userSlice'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user)
    const fetchUser = async() =>{
        if(user) return;
        try{
            const userData = await axios.get(`${BASE_URL}/profile/view`,{withCredentials:true})
            if(userData.status===401 || userData.status===400){
                navigate('/login')
            }else{

            }
            dispatch(addUser(userData.data ))
        }catch(e){
            if(e.status===401 || e.status===400){
                navigate('/login')
            }
            console.log(e.message)
        }
    }
    useEffect(()=>{
        fetchUser();
    },[])
  return (
    <>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Body