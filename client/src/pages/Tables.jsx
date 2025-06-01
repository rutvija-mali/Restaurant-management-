import React, { useState } from 'react'
import styles from '../styles/Tables.module.css'
import deleteSvg from '../assets/material-symbols_delete-outline.svg'
import chairSvg from '../assets/la_chair.svg'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
import {toast} from'react-toastify'
import { useEffect } from 'react'
import { fetchTables } from '../services/table'
import { useOutletContext } from 'react-router-dom';

const Tables = () => {
const [tables, setTables] = useState([]);
const [isOpen, setIsOpen] = useState(false)
const [chairCount, setChairCount] = useState(3); 
const nextTableNumber = tables.length + 1;
const formattedTableNumber = nextTableNumber.toString().padStart(2, '0');
 const { searchQuery } = useOutletContext();

   const handleCreateTable = async() => {
    const newTable = {
      name: formattedTableNumber,
      chairCount: chairCount,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/table/`,newTable)
      if(response.status === 201){
        toast.success('Table created successfully')
        setTables([...tables, newTable]);
      }
    } catch (error) {
       toast.error(error||'Something went wrong')
    }finally{
      setIsOpen(false);
      setChairCount(3);
    }
    
  };

  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/table/${id}`)
      if(response.status === 200){
        fetchTables(setTables)
      }
    } catch (error) {
       toast.error(error||'Something went wrong')
    }
  }

  useEffect(()=>{
    fetchTables(setTables,searchQuery)
  },[searchQuery])

  return (
    <div className={styles.tableContainer}>
     <div className={styles.container}>
        <h3>Tables</h3>
        <div className={styles.tables}>
          {tables.map((table)=>(
            <div className={styles.tableCard} key={table.id}>
              <div className={styles.tableCont}>
                <button className={styles.deleteBtn} onClick={()=>handleDelete(table._id)}>
                    <img src={deleteSvg} alt="Delete" />
                </button>
                <span className={styles.tableTitle}>Table</span>
                <span className={styles.tablename}>{table.name}</span>
                <div className={styles.tableChairs}>
                  <img src={chairSvg} alt="" />
                  <span>{table.chairCount}</span>
                </div>
              </div>
            </div>
          ))}
          <button className={styles.addTable} onClick={()=>setIsOpen((prev)=>!prev)}>
             +
          </button>
          { isOpen && 
            <div className={styles.addTableForm}>
              <p>Table name (optional)</p>
              <h2>{formattedTableNumber}</h2>
              <label htmlFor="chairs">Chair</label>
              <select
                id="chairs"
                value={chairCount}
                onChange={(e) => setChairCount(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6,7].map((num) => (
                  <option key={num} value={num}>
                    {num.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <button className={styles.createTableBtn} onClick={handleCreateTable}>Create</button>
            </div>
          }
        </div>
     </div>
    </div>
  )
}

export default Tables