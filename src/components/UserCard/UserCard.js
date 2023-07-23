import React, { useState,useRef } from 'react';
import './userCard.scoped.css'
import { Pen, Trash,X } from 'react-bootstrap-icons';
import TextField from '@mui/material/TextField';
import { useDispatch,useSelector } from 'react-redux';
import {deleteUser} from '../../actions/users' 

function UserCard({id,email,name,userImage,location,updateUser}) {
    const dispatch = useDispatch()
    const [nameError,setNameError] = useState(false)
    const [emailError,setEmailError] = useState(false) 
    const [inputValues,setInputValues] = useState({
      email:email,
      location:location,
      name:name

    })
    const emailRegex = /^\S+@\S+\.\S+$/
const handleClose = ()=>{
    setEmailError(false)
    setNameError(false)
    setInputValues({
      email:email,
      location:location,
      name:name

    })
     dialogRef.current.close()
}
const handleInput = (e)=>{
  setInputValues(prev=>{
    return {...prev,[e.target.name]:e.target.value}
  })
}
const handleSubmit =(event) =>{
    event.preventDefault()
    if(!emailRef.current.value.match(emailRegex)){
      console.log('not matched')
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
      updateUser({name:nameValue,email:emailValue,location:locationValue})
      dialogRef.current.close() 
    

}
const handleDeleteUser = () => {
    dispatch(deleteUser(id))
}
    
    const dialogRef = useRef(null)
    const emailRef = useRef(null)
    const nameRef = useRef(null)
    const locationRef = useRef(null)
    
    return (  
      <div className='user-card'>
        <div className='img-text-padding'>

        <img src={userImage}/>
        <div className='bottom-container-flex'>
        <h2 className='name'>{name}</h2>
        <span> {email}</span>
        <div className='flex-action-btns'>
          <button className='edit-btn' 
          onClick={()=>dialogRef.current.showModal()}> 
          <span>
          <Pen />
          </span>
          edit
         
          </button>
          <button onClick={handleDeleteUser} className='delete-btn'> 
          <span>
          <Trash  size={'1.3rem'} />
          </span>
        delete
      </button>
      <dialog  ref={dialogRef} >
        <button className='close-btn' onClick={handleClose}>
          <X  size={'2rem'} />
           </button>
        <h1 className='edit-head'> edit details </h1>
        <form onSubmit={handleSubmit} className='inputs-container'> 
        <TextField error={nameError} 
          helperText={nameError ? 'must be at least 3 charcters long' : ''}
        id="name" label="name" name='name'  onChange={handleInput} inputRef={nameRef} value={inputValues.name} variant="standard" />
        <TextField  
        error={emailError}
        helperText={emailError ? 'must be a valid email' : ''}
       

        id="email" label="email"  inputRef={emailRef} name='email'  onChange={handleInput} value={inputValues.email}  variant="standard" />
        <TextField id="location"
              

        label="location"  inputRef={locationRef} name='location' onChange={handleInput} value={inputValues.location} variant="standard" />
       
          <button className='submit-btn' type='submit'>submit </button>
        </form>
        </dialog>
           </div>
        </div>
      </div> 
      </div>
    );
}

export default UserCard;