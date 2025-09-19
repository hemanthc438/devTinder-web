"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { removeUserFromFeed } from '../redux/feedSlice';
import axios from 'axios';
import { motion } from "motion/react"

const ProfileCard = ({user,index,from}) => {
    console.log(from)
    const dispatch = useDispatch();
    const handleRequest = async(status) =>{
        try{
            const response = await axios.post(`${BASE_URL}/request/send/${status}/${user._id}`,{},{withCredentials:true})
            dispatch(removeUserFromFeed(user._id))
        }catch(e){
            console.log(e.message)
        }
        
    }
  return (
    <motion.div 
        drag='x' 
        dragConstraints={{left:0,right:0}} 
        whileDrag={{cursor:"grabbing"}}
        >
        <div className="card bg-base-300 w-96 shadow-sm rounded-3xl my-10 ">
            {from!=='profile' && index!==0&&<div className='absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl'/>}
        <figure>
            <img
            className='aspect-square rounded-3xl'
            src={user?.profilePicture||(user?.gender==='Male'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKVsjm1i9XNLqF2q5LBce8_PfPebGZzhEqBgSOpLnbR9alQ9Fe-2KfwiPG8TSKo1JNNA&usqp=CAU":user?.gender==='Female'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt9UpcsobJNOGFHPeBt-88iRmqjflBnIjhw&s":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOgeHfDFESrZFaQgAJCcYdfgm0_LTazRU0Q&s")}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
            <h1 className='text-neutral-500 mt-[-12px] text-xs'>{user?.age+", "+user?.gender}</h1>
            <p className=''>{user?.about}</p>
            <div className="card-actions justify-between mt-2">
                <button onClick={()=>handleRequest('ignored')} className="btn bg-red-500 text-black font-bold rounded-l-2xl">Ignore</button>
                <button onClick={()=>handleRequest('interested')} className="btn bg-green-400 text-black font-bold rounded-r-2xl">Send Interest</button>
            </div>
        </div>
        </div>
        </motion.div>
  )
}

export default ProfileCard