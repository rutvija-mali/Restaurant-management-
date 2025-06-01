import React from 'react'
import styles from '../styles/OrderSummary.module.css'
import { PieChart, Pie, Cell } from 'recharts';
import { useEffect,useState } from 'react';
import { getOrderSummary } from '../services/order';

const OrdersSummary = ({range}) => {
  const [dineIn, setDineIn] = useState(0);
  const [takeAway, setTakeAway] = useState(0);
  const [served, setServed] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(()=>{

    getOrderSummary(setServed, setTakeAway, setDineIn, setTotalOrders,range);
  },[range])

  const orderDetails = [
    { id:1, name:'Served',value:served},
    { id:2, name:'Dined In',value:dineIn},
    { id:3, name:'Take away',value:takeAway},
  ]
  
  const dineInPer = totalOrders ? Math.round((dineIn / totalOrders) * 100) : 0;
  const takeAwayPer = totalOrders ? Math.round((takeAway / totalOrders) * 100) : 0;
  const servedPer = totalOrders ? Math.round((served / totalOrders)*100) : 0;


  const data = [
    { name: 'Take Away', value: takeAwayPer, color: '#B5B5B5' },
    { name: 'Served', value: servedPer, color: '#3F3F3F' },
    { name: 'Dine In', value: dineInPer, color: '#808080' },
  ];

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.details}>
         {orderDetails.map((order)=>(
          <div className={styles.orderSumConatiner} key={order.id}>
            <h4>{order.value}</h4>
            <p className={styles.orderName}>{order.name}</p>
          </div>
         ))}
      </div>
      <div className={styles.chart}>
        <div className={styles.donutChart}>
          <PieChart width={120} height={120}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className={styles.progressBars}>
          {data.map((item) => (
            <div key={item.name} className={styles.barItem}>
              <div className={styles.barRow}>
                <span className={styles.label}>{item.name}</span>
                <span className={styles.percentage}>{item.value}%</span>
                <div className={styles.barBackground}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>     
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersSummary

