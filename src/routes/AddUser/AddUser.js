import {React,useRef,useState} from 'react';
import './addUser.scoped.css'
import {useDispatch,useSelector} from 'react-redux'
import { Pen, Trash,X,PersonPlusFill } from 'react-bootstrap-icons';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../actions/users';


export default function AddUser(){
  const dispatch = useDispatch()
  const {error,loading} = useSelector((state)=>state.users)
  const navigate = useNavigate()
    const [nameError,setNameError] = useState(false)
    const [emailError,setEmailError] = useState(false) 


    const [inputValues,setInputValues] = useState({
        email:'',
        location:'',
        name:''
    
      })
      const emailRegex = /^\S+@\S+\.\S+$/
      const handleInput = (e)=>{
        console.log('tre')
        setInputValues(prev=>{
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
          setEmailError(false)
          setNameError(false)
          setInputValues({
            email:"",
            location:"",
            name:""
      
          })
        await  dispatch(addUser({name:nameValue,email:emailValue,location:locationValue}))
        if(!error){
          navigate('/')
        }
      }
      const emailRef = useRef(null)
      const nameRef = useRef(null)
      const locationRef = useRef(null)

      if(loading){
        return(
          <div className='spinner-container'>
          <CircularProgress/> 
          </div>
        )
      }
      return (     
        <div>
      <Link className='close-btn' to='/'> cancel add user</Link>
    <h1 className='edit-head'> add user </h1>
    <form onSubmit={handleSubmit} className='inputs-container'> 
      <TextField error={nameError} 
      name='name'
      onChange={handleInput}
      value={inputValues.name}
        helperText={nameError ? 'must be at least 3 charcters long' : ''}
      id="name" label="name" inputRef={nameRef}  variant="standard" />
      <TextField  
      error={emailError}
      name='email'

      helperText={emailError ? 'must be a valid email' : ''}
      value={inputValues.email}

      onChange={handleInput}

      id="email" label="email"  inputRef={emailRef}  variant="standard" />
      <TextField id="location"
      onChange={handleInput}
      value={inputValues.location}

      name='location'

      label="location"  inputRef={locationRef} variant="standard" />
    
        <button className='submit-btn' type='submit'>submit </button>
    </form>
    </div>
)
}