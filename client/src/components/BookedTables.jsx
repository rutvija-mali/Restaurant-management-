import React from 'react'
import styles from '../styles/Booked.module.css'

const BookedTables = ({tables}) => {
  return (
    <div className={styles.tableContainer}>
        {tables.length > 0 && tables.map((table)=>(
          <div className={`${styles.table} ${table.status === 'Reserved'?styles.booked:''}`} key={table._id}>
             <span className={styles.tableHeading}>Table</span>
             <span className={styles.tableNumber}>{table.name}</span>
          </div>
        ))}
    </div>
  )
}

export default BookedTables