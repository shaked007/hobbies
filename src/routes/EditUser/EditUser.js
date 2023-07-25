
import React,{useState,useEffect,useRef} from "react";
import {useParams,useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import "./editUser.scoped.css"
import TextField from '@mui/material/TextField';


function EditUser() {
    const {id} = useParams('')
    const emailRegex = /^\S+@\S+\.\S+$/

    const [userInputs,setUserInputs] = useState({
        location:'',
        name:'',
        email:''
    })
    const navigate = useNavigate()
    const [nameError,setNameError] = useState(false)
    const [emailError,setEmailError] = useState(false) 
    useEffect(()=>{
        const apiCall = async ()=>{
            try{
                const fetchUserRespone= await axios.get(`http://localhost:3000/users/${id}`)
                const UserData = fetchUserRespone.data
                setUserInputs(prevObject=>{
                    return {...prevObject,location:UserData.location,email:UserData.email,name:UserData.name}
                })
            }
            catch(err){

            }
        }
        apiCall()
    },[])
    const handleInput = (e)=>{
        setUserInputs(prev=>{
          return {...prev,[e.target.name]:e.target.value}
        })
      }
      const handleSubmit =async (event) =>{
        event.preventDefault()
        if(!emailRef.current.value.match(emailRegex)){
            setEmailError(true)
            return
        } 
        if(nameRef.current.value.length <3){
          setNameError(true)
            return
        }
          const nameValue =nameRef.current.value
          const emailValue = emailRef.current.value
          const locationValue = locationRef.current.value
        try{
            const updateUserResponse = await axios.put(`http://localhost:3000/users/${id}`,
            {
                name:nameValue,
                email:emailValue,
                location:locationValue
            })    
 }catch(err){
        console.log(err.message)
}
          navigate('/')
      
      }
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const locationRef = useRef(null)



    return (    
    <>
        <h1 className='edit-head'>edit user details</h1>

        <Link className='close-btn' to='/'> cancel edit user</Link>
         <form onSubmit={handleSubmit} className='inputs-container'> 
            <TextField error={nameError} 
                name='name'
                onChange={handleInput}
                value={userInputs.name}
                helperText={nameError ? 'must be at least 3 charcters long' : ''}
                id="name" label="name" inputRef={nameRef}  variant="standard" />
            <TextField  
                error={emailError}
                name='email'
                helperText={emailError ? 'must be a valid email' : ''}
                value={userInputs.email}
                onChange={handleInput}
                id="email" label="email"  inputRef={emailRef}  variant="standard" />
            <TextField id="location"
                onChange={handleInput}
                value={userInputs.location}
                name='location'
                label="location"  inputRef={locationRef} variant="standard" />
            
                <button className='submit-btn' type='submit'>submit </button>
  </form>
  </>
         );
}

export default EditUser;