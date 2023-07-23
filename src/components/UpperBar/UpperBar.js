import {React,useRef,useState} from 'react';
import './upperBar.scoped.css'
import { Pen, Trash,X,PersonPlusFill } from 'react-bootstrap-icons';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select'
import {Link} from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';


function FilterChips({addUser,filterUsers}) {
      
  const [nameError,setNameError] = useState(false)
  const [emailError,setEmailError] = useState(false) 
  const [filterGenderValue,setFilterGenderValue] = useState('כולם')
  const options = [{value:'כולם',label:'כולם'},{value:'בנים',label:'בנים'},{value:'בנות',label:'בנות'}]
  const [inputValues,setInputValues] = useState({
    email:'',
    location:'',
    name:''

  })
  const emailRegex = /^\S+@\S+\.\S+$/
  const handleFilter = ( )=>{

  } 
  const handleClose = ()=>{
    setEmailError(false)
    setNameError(false)
    setInputValues({
      email:"",
      location:"",
      name:""

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
    addUser({name:nameValue,email:emailValue,location:locationValue})
    dialogRef.current.close() 
  

}
  const dialogRef = useRef(null)
  const emailRef = useRef(null)
  const nameRef = useRef(null)
  const locationRef = useRef(null)
    return (
      <div className="flex-upper"> 
      <Link className='add-user-btn' to={`/add-user`}>  add user</Link>
        <Select value={filterGenderValue} >
          {options.map((item)=>{
            return <MenuItem value={item.value} >{item.label} </MenuItem> 
          })}
        </Select>
        <dialog  ref={dialogRef} >
        <button className='close-btn' onClick={handleClose}>
          <X  size={'2rem'} />
           </button>
        <h1 className='edit-head'> edit details </h1>
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
        </dialog>
      </div>
      );
}

export default FilterChips;