import React from 'react';
import styles from '../styles/OrderCard.module.css';
import cutlurySvg from '../assets/cutlury.svg';
import { RxCross2 } from "react-icons/rx";
import timeSvg from '../assets/time.svg';
import successSvg from '../assets/suceesMarkedSvg.svg';
import blueSuccessSvg from '../assets/blueSuccessSvg.svg';

const OrderCard = ({ order }) => {
  console.log(order);
  
  const formatedTime = new Date(order.orderPlacedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const now = new Date();
  const diffInMinutes = Math.round((now - new Date(order.orderPlacedAt)) / 60000);
  const remainingTime = Math.max(0, order.estimatedPrepTime - diffInMinutes);

  const ongoing = (
    <span >
      Processing &nbsp; <img src={timeSvg} alt="" />
    </span>
  );
  const served = (
    <span>
      Order done &nbsp; <img src={successSvg} alt="" />
    </span>
  );
  const takeAway = (
    <span>
      Order done &nbsp;<img src={blueSuccessSvg} alt="" />
    </span>
  );

  return (
    <div
      className={styles.OrderCard}
      style={{
        backgroundColor:
          order.status === 'Ongoing'
            ? '#FFE3BC'
            : order.status === 'Served'
            ? '#B9F8C9'
            : '#C2D4D9',
      }}
    >
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className={styles.left}>
            <div className={styles.topSection}>
              <img src={cutlurySvg} alt="" />
              <span className={styles.orderId}>{order.orderNumber}</span>
            </div>
            <div className={styles.orderDetails}>{order.orderType !== 'take away'?`Table-${order.assignedTable?.name||''}`:''}</div>
            <div  className={styles.orderDetails}>{formatedTime}</div>
            <div className={styles.totalItems}>{`${order.items.length} Items`}</div>
          </div>

          <div
            className={styles.right}
            style={{
              backgroundColor:
                order.status === 'Ongoing'
                  ? '#FFE3BC'
                  : order.status === 'Served'
                  ? '#B9F8C9'
                  : '#C2D4D9',
              color:
                order.status === 'Ongoing'
                  ? '#FF9500'
                  : order.status === 'Served'
                  ? '#34C759'
                  : '#3181A3',
            }}
          >
            <p>{order.orderType}</p>
            <p>{order.status}{order.status != 'Served'? ` ${remainingTime} min`:''}</p>
          </div>
        </div>

        <div className={styles.cardBody}>
          {order.items.map((item) => (
            <p key={item.name}>
             <span>{item.qty}{' '}x{' '}{item.name}</span>
            </p>
          ))}
        </div>

        <div
          className={styles.cardFooter}
          style={{
            backgroundColor:
              order.status === 'Ongoing'
                ? '#FDC474'
                : order.status === 'Served'
                ? '#31FF65'
                : '#9BAEB3',
            color:
              order.status === 'Ongoing'
                ? '#D87300'
                : order.status === 'Served'
                ? '#0E912F'
                : '#3B413D',
          }}
        >
          {order.status === 'Ongoing'
            ? ongoing
            : order.status === 'Served'
            ? served
            : takeAway}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
