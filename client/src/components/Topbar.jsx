import React from 'react'
import styles from '../styles/Topbar.module.css'

const Topbar = ({setSearchQuery}) => {
  return (
    <div className={styles.topbarConatiner}>
        <div className={styles.circulerDiv}></div>
        <input type="text" placeholder='Filter....' onChange={(e)=>setSearchQuery(e.target.value)}/>
    </div>
  )
}

export default Topbar