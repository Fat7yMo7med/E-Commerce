import React, { useContext, use } from 'react'
import { NavLink } from 'react-router-dom'
import imageNav from '../../assets/Images/freshcart.png'
import { userContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';

export default function Navbar() {

    let navigate = useNavigate()
    let { isLogin, setLogin } = useContext(userContext)
    let {cartNumber} = useContext(cartContext)

    function logOut(){
        localStorage.removeItem('userToken');
        setLogin(null); 
        navigate('/login')
    }

    
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                    <div className='logo d-flex flex-column flex-lg-row'>
                        <img src={imageNav} className='w-25' alt="Image Logo" />
                        {
                            isLogin ?
                                <ul className="navbar-nav d-flex flex-column flex-lg-row p-3">
                                    <li className="nav-item">
                                    <NavLink to={''} className="nav-link active p-3 px-2" aria-current="page">Products</NavLink>
                                    </li>
                                    <li><NavLink to ={'carts'} className='text-decoration-none p-2 position-relative'>
                                        Carts 
                                    <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark rounded-circle">{cartNumber}</span></NavLink></li>
                                    <li className="nav-item">
                                    <NavLink to={'brand'} className="nav-link p-3 px-2">Brand</NavLink>
                                    </li>
                                </ul>
                                : null
                        }
                    </div>
                
                <div className='logInfo'>
                    <ul className="navbar-nav d-flex flex-column flex-lg-row p-3">
                            {
                                !isLogin ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink to={'login'} className="nav-link p-3 px-2" aria-current="page">Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to={'register'} className="nav-link p-3 px-2">Register</NavLink>
                                        </li>
                                    </> : <li className='p-3'><NavLink><span onClick={()=>{logOut()}}>Logout</span></NavLink></li>
                            }
                        <li className="nav-item p-3">
                            <i className='fab fa-facebook px-2'></i>
                            <i className='fab fa-youtube px-2'></i>
                            <i className='fab fa-instagram px-2'></i>
                        </li>    
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}
