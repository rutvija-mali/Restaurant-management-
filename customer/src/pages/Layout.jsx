import React, { useState } from 'react'
import styles from '../styles/Layout.module.css'
import { BsSearch } from "react-icons/bs";
import { Outlet } from 'react-router-dom';


const Layout = () => {
  const [searchQuery, setSearchQuery] = useState()

  return (
    <div className={styles.mainContainer}>
        <div className={styles.container}>
           <div className={styles.header}>
             <h3>Good evening</h3>
             <p>Place you order here </p>
             <div className={styles.searchContainer}>
                <input type="text" 
                  value={searchQuery} 
                  placeholder='Search'
                  onChange={(e)=>setSearchQuery(e.target.value)}
                />
                <BsSearch className={styles.icon} size={24} fill='#A8A8A8' />
             </div>
           </div>
           <div className={styles.mainContent}>
            <Outlet context={{ searchQuery }} />
           </div>
        </div>
    </div>
  )
}

export default Layout