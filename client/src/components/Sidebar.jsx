import React from 'react';
import styles from '../styles/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import dashboardSvg from '../assets/material-symbols_dashboard-rounded.svg'
import seatSvg from '../assets/mdi_seat.svg'
import foodMenuSvg from '../assets/bxs_food-menu.svg'
import analyticsSvg from '../assets/mdi_analytics.svg'

const Sidebar = () => {
  const navItems = [
    { img: dashboardSvg, route: '/' },
    { img: seatSvg, route: '/tables' },
    { img: foodMenuSvg, route: '/orders' },
    { img: analyticsSvg, route: '/menu' },
  ];

  return (
    <div className={styles.sidebarMainContainer}>
      <div className={styles.sidebarContainer}>
        <div className={styles.linksContainer}>
          {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            className={styles.link}
            >
            {({ isActive }) => (
                <div
                className={`${styles.linkContent} ${isActive ? styles.active : ''}`}
                >
                <img src={item.img} alt={item.text} />
                </div>
            )}
            </NavLink>

          ))}
        </div>
        <div className={styles.bottomContainer}>
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;