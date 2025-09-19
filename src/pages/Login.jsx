import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const handleLogin = async() =>{
        try{    
            const response = await axios.post(`${BASE_URL}/login`,{
                emailId:email,
                password
            },{withCredentials:true})
            if(response.status===200){
                setError('')
                dispatch(addUser(response.data.user))
                navigate('/dashboard')
            }
        }catch(e){
            setError(e?.response?.data || "something went wrong")
            console.log(e)
        }
    }
  return (
    <div className='h-screen flex items-center justify-center flex-col'>
        <div className="card bg-base-200 rounded-3xl w-96 shadow-sm">
        <div className="card-body">
            <h2 className="text-lg font-bold text-center">Login</h2>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input type="text" className="input" placeholder="Enter yout Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" className="input" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
            {error && <h1 className='text-red-500 text-center'>{error}</h1>}
            <div className="card-actions mt-2 justify-center">
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
        </div>
        </div>
        <p className='pt-2'>create a new acocunt. <Link to='/signup' className='text-blue-500 font-bold'>SignUp</Link></p>
    </div>
  )
}

export default Login