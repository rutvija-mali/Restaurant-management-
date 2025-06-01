import React from 'react'
import styles from '../styles/GraphCard.module.css'
import { useState } from 'react'
import { cloneElement } from 'react'

const GraphCard = ({children,heading,tab}) => {
  const [range,setRange] = useState('daily')
  return (
    <div className={styles.graphContainer}>
        <div className={styles.graphHeader}>
          <div className={styles.graphInfo}>
            <h4>{heading}</h4>
            {tab != 'Tables' && <p>hijokplrngntopgtgkoikokyhikoyphokphnoy</p>}
          </div>
         {tab != 'Tables'&& 
         <select name="range" id="range" 
            className={styles.graphRange}  
            onChange={(e) => setRange(e.target.value)}
            value={range}
          >
           <option value="daily" selected>Daily</option>
           <option value="monthly">Monthly</option>
           <option value="yearly">Yearly</option>
          </select>
          }
          { tab === 'Tables' && 
            <div className={styles.bullets}>
              <div className={styles.point}>
                 <div className={styles.reserved}></div>
                 <span>Reserved</span>
              </div>
                <div className={styles.point}>
                 <div className={styles.available}></div>
                 <span>Available</span>
                </div>
              </div>
          }
        </div>
        <div className={styles.graphBody}>
            {cloneElement(children, { range })}
        </div>
    </div>
  )
}

export default GraphCard