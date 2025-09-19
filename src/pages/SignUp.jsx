import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [profilePicture,setprofilePicture] = useState('')
    const [age,setAge] = useState('')
    const [about,setAbout] = useState('')
    const [gender,setGender] = useState('')
    const [skills,setSkills] = useState('')

    const [error,setError] = useState('')
    const handleSignUp = async() =>{
        try{    
            const response = await axios.post(`${BASE_URL}/signUp`,{
                firstName,
                lastName,
                emailId:email,
                password,
                profilePicture,
                age,
                gender,
                about
            },{withCredentials:true})
            if(response.status===200){
                setError('')
                dispatch(addUser(response.data.user))
                navigate('/dashboard')
            }
        }catch(e){
            setError(e.response.data)
            console.log(e)
        }
    }
  return (
    <div className='h-screen flex items-center justify-center flex-col'>
        <div className="card bg-base-200 rounded-3xl w-96 shadow-sm">
        <div className="card-body">
            <h2 className="text-lg font-bold text-center">SignUp</h2>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <input type="password" className="input" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </fieldset>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Provide profile photo URL" value={profilePicture} onChange={(e)=>setprofilePicture(e.target.value)}/>
            </fieldset>
            <div className="dropdown flex flex-row justify-center mr-4">
            <div tabIndex={0} role="button" className="btn m-1 bg-base-100">{gender || 'Select Gender'}</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 mt-12 w-52 p-2 shadow-sm">
                <li onClick={() => setGender("Male")}><a>Male</a></li>
                <li onClick={() => setGender("Female")}><a>Female</a></li>
                <li onClick={() => setGender("Others")}><a>Others</a></li>
              </ul>
              <fieldset className="fieldset w-1/2">
                <input type="text" className="input" placeholder="Enter your Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
            </fieldset>
            </div>  
            <textarea className="textarea" placeholder="Bio" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
            {error && <h1 className='text-red-500 text-center'>{error}</h1>}
            <div className="card-actions mt-2 justify-center">
            <button onClick={handleSignUp} className="btn btn-primary">SignUp</button>
            </div>
        </div>
        </div>
        <p className='pt-2'>Already have an account? <Link to='/login' className='text-blue-500 font-bold'>Login</Link></p>

    </div>
  )
}

export default SignUp