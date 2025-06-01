const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
import {toast} from'react-toastify'

export   const fetchTables = async (setTables,searchQuery )=>{
   try {
    const response = await axios.get(`${API_BASE_URL}/api/table/`,{
      params:{
        name:searchQuery
      }
    })
      if(response.status === 200){
        setTables(response.data);
      }
   } catch (error) {
     toast.error(error||'Something went wrong')
   }
  }