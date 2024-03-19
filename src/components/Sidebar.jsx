import React from 'react';
import styles from './sidebar.module.css';
import Logo from "./Logo"
import AppNav from './AppNav';
import { Outlet } from 'react-router-dom';

export default function sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; CopyRight {new Date().getFullYear()} by WorldWise Inc. 
        </p>
      </footer>
    </div>
  )
}
