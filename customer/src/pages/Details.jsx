import React, { useEffect, useState } from 'react'
import styles from '../styles/Details.module.css'
import pizzaImg from '../assets/R (6) 1.svg'
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { HiMinusSm } from "react-icons/hi";
import locationSvg from '../assets/Group 74.svg'
import clockSvg from '../assets/Group 75.svg'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdOutlineCurrencyRupee } from "react-icons/md";
import AddInstructionsModal from '../components/AddInstructionsModal';
import SwipeOrder from '../components/SwipeOrder';
import AddUser from '../components/AddUser';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const Details = () => {
  const location = useLocation()
  const [isInstrModel, setInstrModel] = useState(false)
  const [actionTab, setActionTab] = useState('dine in')
  const [userModel, setUserModel] = useState(false)
  const [cookingInstructions, setCookingInstructions] = useState('')
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(()=>{
     const storedUser = localStorage.getItem("user");
     setUser(JSON.parse(storedUser))
  },[userModel])
  
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems)
    }
  }, [])

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item._id !== itemId))
    } else {
      setCartItems(cartItems.map(item =>
        item._id === itemId ? { ...item, qty: newQuantity } : item
      ))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id))
    if (cartItems.length === 1) {
      navigate('/')
    }
  }

  const itemTotal = cartItems.reduce((sum, item) => sum + (item.qty * item.price), 0)
  const deliveryCharges = actionTab === 'take away' ? 50 : 0
  const taxes = Math.round(itemTotal * 0.2)
  const grandTotal = itemTotal + deliveryCharges + taxes
  const deliveryTime = cartItems.reduce((sum, item) => sum + item.prepTime, 0) + 15

  const orderData = {
    customer: user,
    orderType: actionTab,
    items: cartItems.map(item => ({
      menuItem: item._id,
      name:item.name,
      qty: item.qty,
      price: item.price,
      prepTime: item.prepTime
    })),
    deliveryCharges,
    taxes,
    grandTotal,
    estimatedPrepTime: deliveryTime,
    cookingInstructions: cookingInstructions
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.cartItemContainer}>
        {cartItems.length > 0 &&
          cartItems.map((item) => (
            <div className={styles.foodDetails} key={item._id}>
              <div className={styles.left}>
                <img src={pizzaImg} alt="" />
              </div>
              <div className={styles.right}>
                <div className={styles.itemTitle}>
                  <h3>{item.name}</h3>
                  <RxCross2
                    size={16}
                    style={{ backgroundColor: '#E04444', borderRadius: '50%' }}
                    color='white'
                    onClick={() => removeItem(item._id)}
                  />
                </div>
                <div className={styles.price}>
                  <MdOutlineCurrencyRupee className={styles.rupeeIcon} /> {item.price}
                </div>
                <div className={styles.prepTime}>
                  <span>{item.price}''</span>
                  <div className={styles.qtyDiv}>
                    <button><HiMinusSm onClick={() => updateQuantity(item._id, item.qty - 1)} /></button> &nbsp; &nbsp;
                    <span>{item.qty}</span>&nbsp; &nbsp;
                    <button onClick={() => updateQuantity(item._id, item.qty + 1)}><FiPlus /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <button onClick={() => setInstrModel(true)}>Add cooking instructions (optional)</button>

      {isInstrModel && (
        <AddInstructionsModal
          onClose={() => setInstrModel(false)}
          setCookingInstructions={setCookingInstructions}
          cookingInstructions={cookingInstructions}
          onConfirm={() => setInstrModel(false)}
        />
      )}

      <div className={styles.actionTabs}>
        <button
          className={actionTab === 'dine in' ? styles.active : styles.btn}
          onClick={() => setActionTab('dine in')}
        >
          Dine in
        </button>
        <button
          className={actionTab === 'take away' ? styles.active : styles.btn}
          onClick={() => setActionTab('take away')}
        >
          Take away
        </button>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.row}>
          <span>Item Total</span>
          <span>₹ {itemTotal}</span>
        </div>
        {actionTab === 'take away' && (
          <div className={styles.row}>
            <span>Delivery Charge</span>
            <span>₹ {deliveryCharges}</span>
          </div>
        )}
        <div className={styles.row}>
          <span>Taxes</span>
          <span>₹ {taxes}</span>
        </div>
        <div className={`${styles.row} ${styles.grandTotal}`}>
          <strong>Grand Total</strong>
          <strong>₹ {grandTotal}</strong>
        </div>
      </div>

      <div className={styles.userSection}>
        <div className={styles.details}>
          <h3>Your details</h3>
          <p>{user?.name || 'Not mentioned'}, {user?.mobile || 'unavailable'}</p>
        </div>
        <button onClick={() => setUserModel(true)}>
          <FiPlus color='#606060' className={styles.addUser} />
        </button>
        {userModel && <AddUser onClose={() => setUserModel(false)} setUser={setUser} />}
      </div>

      {actionTab === 'take away' && (
        <div className={styles.adressContainer}>
          <div>
            <img src={locationSvg} alt="" />
            <p>{user?.address || 'Not mentioned'}</p>
          </div>
          <div>
            <img src={clockSvg} alt="" />
            <p>Delivery in <strong>{deliveryTime} mins</strong></p>
          </div>
        </div>
      )}

      <SwipeOrder orderData={orderData} user={user} />
    </div>
  )
}

export default Details
