const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
import {toast} from'react-toastify'
import {formatRevenue, getRange} from './helper'

export const fetchRevenue = async(setRevenue)=>{

    try{
       const response = await axios.get(`${API_BASE_URL}/api/orders/get-revenue`)
         if(response.status === 200){
            console.log(response.data);
            
            const formatedRevenue = formatRevenue(Number(response.data))
           setRevenue(formatedRevenue);
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}

export const getTotalOrders = async(setTotalOrders)=>{
    try{
       const response = await axios.get(`${API_BASE_URL}/api/orders/get-totalOrders`)
         if(response.status === 200){

           setTotalOrders(response.data);
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}

export const getOrderSummary = async(setServed,setTakeAway,setDineIn,setTotalOrders,range)=>{
    try{
        const [start, end] = getRange(range)

       const response = await axios.get(`${API_BASE_URL}/api/orders/order-summary`,{
        params:{
            start,
            end
        }
       })
         if(response.status === 200){
            setDineIn(response.data.dineInOrders)
            setTakeAway(response.data.takeAwayOrders)
            setServed(response.data.totalServedOrders)
           setTotalOrders(response.data.totalOrders);
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}

export const getRevenueWithLabels = async(range,setData)=>{
   try{
        const [start, end] = getRange(range)
       const response = await axios.get(`${API_BASE_URL}/api/orders/order-revenue`,{
        params:{
            start,
            end,
            range
        }
       })
         if(response.status === 200){
          setData(response.data)
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}