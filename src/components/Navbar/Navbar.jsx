import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import imageNav from '../../assets/Images/freshcart.png'
import { userContext } from '../../context/userContext.jsx'
import { cartContext } from '../../context/cartContext'
import styles from './Navbar.module.css'

export default function Navbar() {

  let navigate = useNavigate()
  let { isLogin, setLogin } = useContext(userContext)
  let { cartNumber } = useContext(cartContext)

  function logOut() {
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>

        {/* ✅ Logo */}
        <div className={styles.logoBox}>
          <img src={imageNav} alt="Fresh Cart" />
          <h4>FreshCart</h4>
        </div>

        {isLogin && (
          <ul className={styles.links}>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Products
              </NavLink>
            </li>

            <li className={styles.cartLink}>
              <NavLink
                to="/carts"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Cart
                <span className={styles.badge}>{cartNumber}</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/brand"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Brand
              </NavLink>
            </li>

          </ul>
        )}

        <div className={styles.rightSection}>

          {!isLogin ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.authBtn} ${styles.activeBtn}`
                    : styles.authBtn
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.authBtnOutline} ${styles.activeBtn}`
                    : styles.authBtnOutline
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={logOut} className={styles.logoutBtn}>
              Logout
            </button>
          )}
          <div className={styles.social}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
          </div>

        </div>
      </div>
    </nav>
  )
}
