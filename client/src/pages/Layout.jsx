import React, {useState} from 'react'
import styles from '../styles/Layout.module.css'
import Topbar from '../components/Topbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={styles.layoutConatiner}>
      <div className={styles.topSection}>
        <Topbar setSearchQuery={setSearchQuery}/>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.sidebar}>
          <Sidebar/>
        </div>
        <div className={styles.mainContent}>
          <Outlet context={{ searchQuery }}/>
        </div>
      </div>
    </div>
  )
}

export default Layout