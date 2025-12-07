import { NavLink, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { userContext } from '../../context/userContext'

export default function Navbar(){
  let navigate = useNavigate()
  let {isLogin,setLogin} = useContext(userContext)

  function logOut(){
    localStorage.removeItem('userToken');
    setLogin(null); 
    navigate('/login')
  }
}


export default function Logout() {
    return (
        <div>
        
        </div>
    )
}
