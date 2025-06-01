import React from 'react'
import styles from '../styles/DataCard.module.css'

const DataCard = ({data}) => {
  return (
    <div className={styles.dataCardContainer}>
        <div className={styles.dataCardImg}>
            <img src={data.img} alt="" />
        </div>
        <div className={styles.dataCardInfo}>
           <span>{data.value}</span>
           <span className={styles.dataTitle}>{data.name}</span>
        </div>
    </div>
  )
}

export default DataCard