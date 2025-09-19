import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addConnections, addRequests } from '../redux/connectionSlice';
import { IoChatboxOutline } from 'react-icons/io5';

const Connections = () => {
    const dispatch = useDispatch();
    const {connections,requests} = useSelector((state)=>state.connections) 
    const fetchConnections = async() =>{
        try{
            const connections = await axios.get(`${BASE_URL}/user/connections`,{withCredentials:true})
            dispatch(addConnections(connections?.data?.connections))
        }catch(e){
            console.log(e?.message)
        }
    }
    const fetchRequests = async() =>{
        try{
            const requests = await axios.get(`${BASE_URL}/user/requests/received`,{withCredentials:true})
            dispatch(addRequests(requests?.data?.connectionRequests))
        }catch(e){
            console.log(e?.message)
        }
    }
    useEffect(()=>{
        fetchConnections()
        fetchRequests()
    },[])
    const handleRequest = async (request,status) =>{
        try{
            const response = await axios.post(`${BASE_URL}/request/review/${status}/${request?._id}`,{},{withCredentials:true})
            const filterRequests = requests.filter((req)=>req._id!==request?._id)
            dispatch(addRequests(filterRequests))
            if(status==='accepted'){
                const newConnections = [...connections,request?.fromUserId]
                dispatch(addConnections(newConnections))
            }
        }catch(e){
            console.log(e.message)
        }
    }
  return (
    <div className='flex flex-col justify-center md:flex-row min-h-screen mt-16'>
        <ul className="list bg-base-300 rounded-box w-2/6 m-10 shadow-md">
        <h1 className='text-3xl font-bold  text-center my-5'>Connections</h1>

        {
            connections?.length>0 && 
            connections.map((connection)=>(
            <li key={connection?._id} className="list-row">
                <div><img className="size-18 rounded-box" src={connection?.profilePicture|| (connection?.gender==='Male'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKVsjm1i9XNLqF2q5LBce8_PfPebGZzhEqBgSOpLnbR9alQ9Fe-2KfwiPG8TSKo1JNNA&usqp=CAU":connection?.gender==='Female'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt9UpcsobJNOGFHPeBt-88iRmqjflBnIjhw&s":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOgeHfDFESrZFaQgAJCcYdfgm0_LTazRU0Q&s")}/></div>
                <div className='flex flex-col justify-between overflow-hidden'>
                    <div className='flex flex-col'>
                        <p className='font-bold text-[16px]'>{connection?.firstName +" "+connection?.lastName}</p>
                        <p className="text-xs uppercase font-semibold opacity-60">{connection?.age+", "+connection?.gender}</p>
                    </div>
                    <p className="text-xs font-light opacity-60 truncate text-ellipsis">{connection?.about}</p>

                </div>
                <button className="btn btn-square btn-ghost">
                    <IoChatboxOutline size="20"/>
                </button>
            </li>
            ))
        }
        
        </ul>
        <ul className="list bg-base-300 rounded-box w-2/6 m-10 shadow-md">
        <h1 className='text-3xl font-bold  text-center my-5'>Requests</h1>

        {
            requests?.length>0 && 
            requests.map((request)=>(
            <li key={request?._id} className="list-row">
                <div><img className="size-18 rounded-box" src={request?.fromUserId?.profilePicture || (request?.fromUserId?.gender==='Male'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKVsjm1i9XNLqF2q5LBce8_PfPebGZzhEqBgSOpLnbR9alQ9Fe-2KfwiPG8TSKo1JNNA&usqp=CAU":request?.fromUserId?.gender==='Female'?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt9UpcsobJNOGFHPeBt-88iRmqjflBnIjhw&s":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmOgeHfDFESrZFaQgAJCcYdfgm0_LTazRU0Q&s")}/></div>
                <div className='flex flex-col justify-between overflow-hidden'>
                    <div className='flex flex-col'>
                        <p className='font-bold text-[16px]'>{request?.fromUserId?.firstName +" "+request?.fromUserId?.lastName}</p>
                        <p className="text-xs uppercase font-semibold opacity-60">{request?.fromUserId?.age+", "+request?.fromUserId?.gender}</p>
                    </div>
                    <p className="text-xs font-light opacity-60 truncate text-ellipsis">{request?.fromUserId?.about}</p>

                </div>
                <div className='flex items-center gap-3'>
                    <button className="btn btn-ghost bg-red-500" onClick={()=>handleRequest(request,'rejected')}>
                        Reject
                    </button>
                    <button className="btn btn-ghost bg-blue-500" onClick={()=>handleRequest(request,'accepted')}>
                        Accept
                    </button>
                </div>
            </li>
            ))
        }
        
        </ul>
    </div>
  )
}

export default Connections