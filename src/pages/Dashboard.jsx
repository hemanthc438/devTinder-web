import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import ProfileCard from '../components/ProfileCard'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../redux/feedSlice'

const Dashboard = () => {
    const feed = useSelector((state)=>state.feed)
    const dispatch = useDispatch()
    const fetchFeed = async() =>{
        try{
            const allFeed = await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true})
            dispatch(addFeed(allFeed?.data?.feed))
            console.log(allFeed?.data?.feed)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        fetchFeed();
    },[])
    if(feed && feed?.length<=0){
        return (
            <div className='flex h-screen mt-50 justify-center'>
                <h1>No more users!!</h1>
            </div>
        )
    }
  return (
    <div className='flex relative py-16 min-h-screen'>
        {
            feed?.length>0 &&
            <div className="stack absolute left-1/3 stack-top gap-2 size-28">
                {/* <div className="border-base-content card bg-base-100 border text-center"> */}
                    {
                        feed.map((item,index)=>(
                            <ProfileCard user={item} index={index}/>
                        ))
                    }
                {/* </div> */}
            </div>
        }
    </div>
  )
}

export default Dashboard