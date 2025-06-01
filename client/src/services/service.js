const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'
import {toast} from'react-toastify'

export const fetchClientCount = async(setClients)=>{
      try{
       const response = await axios.get(`${API_BASE_URL}/api/user/`)
         if(response.status === 200){
           setClients(response.data);
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}

export const fetchChefs = async(setChefs,searchQuery)=>{
      try{
       const response = await axios.get(`${API_BASE_URL}/api/chef/`,{
        params:{
          name:searchQuery
        }
       })
         if(response.status === 200){
           setChefs(response.data);
         }
      } catch (error) {
        toast.error(error||'Something went wrong')
      }
}