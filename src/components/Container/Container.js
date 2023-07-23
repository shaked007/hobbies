import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './container.scoped.css'
import axios from 'axios'
import { fetchUsers } from '../../actions/users';
import UpperBar from '../UpperBar/UpperBar';
import UserCard from '../UserCard/UserCard';
function Container() {
    const dispatch =useDispatch()
   const {usersData,loading,error} = useSelector((state)=>state.users)


 

    useEffect(()=>{
       dispatch(fetchUsers())
    },[dispatch])

    const updateUser = (id,user)=>{
        
        // setUsers((prevUsers)=>{
        //   const newUsers =  prevUsers.map((userData)=>{
        //         return userData.id===id  ? {...userData,...user}:userData
        //   })
        //   localStorage.setItem('users',JSON.stringify(newUsers))
        //   return newUsers
            
        // })
    }

    return (
        <div>
        <h1 style={{textAlign:'center'}}> משתמשים</h1>

        <div className='main-container'>
            <UpperBar  />
                <div className='flex-cards'> 
             { usersData.length !==0 && usersData.map((user)=>{
                return <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                location={user.location}
                email={user.email}
                userImage={user.picture}
                updateUser={(user)=>updateUser(user.id,user)}
                />
             })}
                    </div>
             </div>
             </div>
      );
}

export default  Container ;