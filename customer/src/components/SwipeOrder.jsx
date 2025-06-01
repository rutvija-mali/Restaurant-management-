import React from 'react';
import SlideButton from 'react-slide-button';
import styles from '../styles/SwipeOrder.module.css'
import { toast } from 'react-toastify';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
import axios from 'axios'

const SwipeOrder = ({orderData,user}) => {
    const handleSwipe = async()=>{
      if(!user){
         toast.error("Please fill user details");
        return
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/api/orders/`,orderData)
        if(response.status === 201){
          toast.success('Order is placed')
        }

      } catch (error) {
        toast.error(error.message||'Something went wrong')
      }
      
    }
  return (
    <div className={styles.swipeContainer}>
      {user ? (
        <SlideButton
          mainText="Swipe to Order"
          overlayText="➔"
          onSlideDone={handleSwipe}
          reset={true}
          className={styles.slider}
          overlayClass={styles.overlay}
          mainClass={styles.main}
          circleClass={styles.circle}
        />
      ) : (
        <button disabled className={styles.disabledSwipe}>Please fill user details</button>
      )}
    </div>

  );
};

export default SwipeOrder;

