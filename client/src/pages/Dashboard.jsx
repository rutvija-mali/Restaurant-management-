import React from 'react'
import styles from '../styles/Dashboard.module.css'
import DataCard from '../components/DataCard'
import bowlSvg from '../assets/Image.svg'
import clientSvg from '../assets/Image (2).svg'
import noteSvg from '../assets/Image (1).svg'
import rupeeSvg from '../assets/ph_currency-inr-bold.svg'
import GraphCard from '../components/GraphCard'
import OrdersSummary from '../components/OrdersSummary'
import Revenue from '../components/Revenue'
import BookedTables from '../components/BookedTables'
import ChefTable from '../components/ChefTable'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchChefs, fetchClientCount } from '../services/service'
import { fetchTables } from '../services/table'
import { fetchRevenue, getTotalOrders } from '../services/order'
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const [client,setClients] = useState(0)
  const [chefs,setChefs] = useState([])
  const [tables , setTables] = useState([])
  const [revenue, setRevenue] = useState()
  const [totalOrders, setTotalOrders] = useState(0)
  const { searchQuery } = useOutletContext();

  useEffect(()=>{
    fetchRevenue(setRevenue)
    fetchClientCount(setClients)
    fetchTables(setTables)
    getTotalOrders(setTotalOrders)
  },[])

  useEffect(()=>{
    fetchChefs(setChefs,searchQuery)
  },[searchQuery])
  const data = [
    { id: 1, name: 'TOTAL CHEFS', img: bowlSvg, value: chefs.length },
    { id: 2, name: 'TOTAL REVENUE', img: rupeeSvg, value: revenue }, 
    { id: 3, name: 'TOTAL ORDERS', img: noteSvg, value: totalOrders },
    { id: 4, name: 'TOTAL CLIENTS', img: clientSvg, value: client.totalClients || 0 }
    

  ];

  const graphs = [
    {id:1, name:'Order Summary',component:<OrdersSummary/>},
    {id:2, name:'Revenue',component:<Revenue/>},
    {id:3, name:'Tables',component:<BookedTables tables={tables}/>}
  
  ]
  return (
    <div className={styles.dashContainer}>
     <div className={styles.container}>
       <h3>Analytics</h3>
      <div className={styles.dashCard}>
       {data.map((data)=>(
         <DataCard data={data} key={data.id}/>
       ))}
      </div>
      <div className={styles.details}>
        {graphs.map((graph)=>(
          <GraphCard  heading={graph.name} tab={graph.name} key={graph.id}>
            {graph.component}
          </GraphCard>
        ))}

      </div>
      <div className={styles.table}>
         <ChefTable chefs={chefs} searchQuery={searchQuery}/>
      </div>

     </div>
    </div>
  )
}

export default Dashboard