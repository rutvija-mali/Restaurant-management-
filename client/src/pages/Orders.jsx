import React from 'react'
import OrderCard from '../components/OrderCard'
import styles  from '../styles/Orders.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
import {toast} from'react-toastify'
import { useOutletContext } from 'react-router-dom';

const Orders = () => {
const [orders, setOrders] = useState([])
 const { searchQuery } = useOutletContext();

useEffect(()=>{
  const fetchOrders = async()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders/`,{
          params:{
            name:searchQuery
          }
      })
      if(response.status === 200){
        setOrders(response.data)
      }
    } catch (error) {
      toast.error(error || 'Something went wrong')
    }
  }
  fetchOrders()
},[searchQuery])
  return (
    <div className={styles.orderContainer}>
      <h3>Orders</h3>
       <div className={styles.mainContent}>
         {orders.length > 0 && orders.map((order)=>(
            <OrderCard order={order} key={order.orderId}/>
          ))}
       </div>
    </div>
  )
}

export default Orders