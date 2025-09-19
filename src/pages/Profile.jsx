import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import ProfileCard from '../components/ProfileCard'

const Profile = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user)
    const [showToast,setShowToast] = useState(false)
    const [firstName,setFirstName] = useState(user?.firstName||'')
    const [lastName,setLastName] = useState(user?.lastName||'')
    const [email,setEmail] = useState(user?.emailId||'')
    const [profilePicture,setprofilePicture] = useState(user?.profilePicture||'')
    const [age,setAge] = useState(user?.age||'')
    const [about,setAbout] = useState(user?.about||'')
    const [gender,setGender] = useState(user?.gender||'')
    const [skills,setSkills] = useState('')

    const [error,setError] = useState('')
    useEffect(()=>{
        if (user) {
        setFirstName(user.firstName || "")
        setLastName(user.lastName || "")
        setEmail(user.emailId || "")
        setprofilePicture(user.profilePicture || "")
        setAge(user.age || "")
        setAbout(user.about || "")
        setGender(user.gender || "")
      }
    },[user])
    const handleEdit = async() =>{
        try{    
            const response = await axios.patch(`${BASE_URL}/profile/edit`,{
                firstName,
                lastName,
                emailId:email,
                profilePicture,
                age,
                gender,
                about
            },{withCredentials:true})
            if(response.status===200){
              setShowToast(true)
              setError('')
              dispatch(addUser(response.data.user))
              setTimeout(()=>{
                setShowToast(false)
              },2000)
            }
        }catch(e){
            setError(e.message)
            console.log(e)
        }
    }
  return (
    <>
    {
      showToast &&
      <div className="toast toast-top toast-end mt-16">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>
    }
    <div className='min-h-screen mt-16 flex items-center justify-center flex-col md:flex-row gap-20'>
        <div className="card bg-base-200 rounded-3xl w-96 shadow-sm">
        <div className="card-body">
            <h2 className="text-lg font-bold text-center">Edit</h2>
            <legend className="fieldset-legend mb-[-15px]">First Name</legend>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            </fieldset>
            <legend className="fieldset-legend mb-[-15px]">Last Name</legend>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </fieldset>
            <legend className="fieldset-legend mb-[-15px]">Email ID</legend>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </fieldset>
            <legend className="fieldset-legend mb-[-15px]">Profile Photo URL</legend>
            <fieldset className="fieldset">
                <input type="text" className="input" placeholder="Provide profile photo URL" value={profilePicture} onChange={(e)=>setprofilePicture(e.target.value)}/>
            </fieldset>
            <legend className="fieldset-legend mb-[-15px]">Gender, Age</legend>
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
            <legend className="fieldset-legend mb-[-15px]">About you</legend>
            <textarea className="textarea" placeholder="Bio" value={about} onChange={(e)=>setAbout(e.target.value)}></textarea>
            {error && <h1 className='text-red-500 text-center'>{error}</h1>}
            <div className="card-actions mt-2 justify-center">
            <button onClick={handleEdit} className="btn btn-primary w-full">Edit</button>
            </div>
        </div>
        </div>
        <ProfileCard user={{firstName,lastName,profilePicture,age,about,gender}} from='profile'/>
    </div>
    </>
  )
}


export default Profile