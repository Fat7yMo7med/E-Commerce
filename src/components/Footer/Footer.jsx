import React from "react";
import { NavLink } from "react-router-dom";
import imageNav from "../../assets/Images/freshcart.png";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
        <div className="container">
            <div className={styles.footerContent}>

            <div className={styles.logoSection}>
                <img src={imageNav} alt="Logo" className={styles.logo} />
                <p>Your favorite online shop for fresh and quality products delivered right to your door.</p>
            </div>

            <div className={styles.linksSection}>
                <h5>Quick Links</h5>
                <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
                <li><NavLink to="/carts">Cart</NavLink></li>
                <li><NavLink to="/brand">Brands</NavLink></li>
                </ul>
            </div>

            <div className={styles.contactSection}>
                <h5>Contact Us</h5>
                <p>Email: support@freshcart.com</p>
                <p>Phone: +20 100 000 0000</p>
                <div className={styles.socials}>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>

            <div className={styles.newsletterSection}>
                <h5>Subscribe</h5>
                <p>Get updates on new products and offers.</p>
                <div className={styles.subscribe}>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
                </div>
            </div>
            </div>
        </div>
    </footer>
    );
}
