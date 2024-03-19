import React from 'react';
import style from "./PageNav.module.css";
import { NavLink } from 'react-router-dom';
import Logo from "./Logo"

export default function PageNav() {
  return (
    <div className={style.nav}>
         <Logo />
        <ul>
            <li>
                <NavLink to='/product'>Product</NavLink>
            </li>
            <li>
                <NavLink to='/pricing'>Pricing</NavLink>
            </li>
            <li>
                <NavLink to='/Login' className={style.ctaLink}>Login</NavLink>
            </li>
        </ul>
    </div>
  )
}
