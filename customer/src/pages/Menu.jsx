import React, { useState } from 'react'
import styles from '../styles/Menu.module.css'
import burger from '../assets/Burger.svg'
import pizza from '../assets/pizza.svg'
import drink from '../assets/drink.svg'
import fries from '../assets/fries.svg'
import veggie from '../assets/veggie.svg'
import PizzImg from '../assets/pizzaImg.svg'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMinusSm } from "react-icons/hi";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

const Menu = () => {
    const foodItems = [
        { id: 1, name: 'Burger', img: burger },
        { id: 2, name: 'Pizza', img: pizza },
        { id: 3, name: 'Drink', img: drink },
        { id: 4, name: 'French Fries', img: fries },
        { id: 5, name: 'Veggies', img: veggie }
    ]
    const [selectedCat, setSelectedCat] = useState({ id: 1, name: 'Burger', img: burger })
    const [itemQtyShown, setItemQtyShown] = useState({});
    const [cart, setCart] = useState([])
    const [menu,setMenu] = useState([])
    const { searchQuery } = useOutletContext();
    const fetchMenuItems = async()=>{
        try {
          const response = await axios.get(`${API_BASE_URL}/api/menu/`,{
            params:{
              name:searchQuery,
              category:selectedCat.name
            }
          })
          if(response.status === 200 ){
            setMenu(response.data)
            console.log(response.data);
            
          }
        } catch (error) {
          toast.error(error.message||"Something went wrong!");
        }
     }

     useEffect(()=>{
      fetchMenuItems()
     },[searchQuery,selectedCat])
    const navigate = useNavigate()

   const handleShowQty = (_id) => {
      setItemQtyShown((prev) => ({ ...prev, [_id]: true }));
      handleAddToCart(menu.find(item => item._id === _id)); 
   };

   function getItemQty(id){
      const item = cart.find((item)=>item._id === id)
       return item ? item.qty : 0; 
   }


   const handleAddToCart=(menuItem)=>{
     const existingItem = cart.find((item)=> item._id === menuItem._id)
     if(existingItem){
       setCart(cart.map((item)=>
         item._id === menuItem._id?
         {...item,qty:item.qty +1}:
         item
      ))
     }else{
        setCart([...cart, {
            _id: menuItem._id,
            name: menuItem.name,
            
            price: menuItem.price,
            prepTime: menuItem.prepTime,
            category: menuItem.category,
            qty: 1
         }])
     }

   }

   const handleRemoveFromCart = (menuItem)=>{
      const existingItem = cart.find(item => item._id === menuItem._id)
        
        if (existingItem && existingItem.qty > 1) {
         
            setCart(cart.map(item =>
                item._id === menuItem._id
                    ? { ...item, qty: item.qty - 1 }
                    : item
            ))
        } else {

            setCart(cart.filter(item => item._id !== menuItem._id))
        }
   }
    
   const handleNext = () =>{
      if(cart.length < 0){
         toast.error('Please add items in cart')
         return
      }else{
         navigate('/details',{
             state: { 
                cartItems: cart
            } 
         })
      }
   }
   
  return (
    <div className={styles.menuContainer}>
       <div className={styles.menuHeader}>
          {foodItems.map((item)=>(
            <div className={`${styles.menuCategory} ${item.name === selectedCat.name? styles.active :''}`} key={item.id} onClick={()=>setSelectedCat(item)}>
                 <img src={item.img} alt=""/>
                 <span>{item.name}</span>
            </div>
          ))}
       </div>
       <div className={styles.menuBody}>
         <h2>{selectedCat.name}</h2>
         <div className={styles.menu}>
           {menu.length > 0 && 
             menu.map((item)=>(
               <div className={styles.itemContainer} key={item._id}>
                  <img src={PizzImg} alt="" />
                  <div className={styles.itemBody}>
                     <p>{item.name}</p>
                     <div className={styles.priceSection}>
                        <div><MdOutlineCurrencyRupee className={styles.rupeeIcon} /> {item.price}</div>
                        {!itemQtyShown[item._id] && <FaPlus className={styles.rupeeIcon} size={16.44} onClick={()=>handleShowQty(item._id)}/>}
                        {itemQtyShown[item._id] && <div className={styles.qtyDiv}>
                           <button  onClick={()=>handleRemoveFromCart(item)}><HiMinusSm  /></button> &nbsp; &nbsp;
                           <span>{getItemQty(item._id)}</span>&nbsp; &nbsp;
                           <button onClick={()=>handleAddToCart(item)}><FiPlus /></button>
                        </div>}       
                     </div>
                     
                  </div>
               </div>
             ))
           }
         </div>
         <button className={styles.nextBtn} onClick={handleNext} disabled={cart.length === 0}>
            Next
         </button>
       </div>
    </div>
  )
}

export default Menu