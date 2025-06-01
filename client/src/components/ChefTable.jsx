import React from 'react'
import styles from '../styles/ChefTable.module.css'

const ChefTable = ({chefs }) => {

  return (
    <table className={styles.chefTable}>
        <thead>
            <tr>
            <th className={styles.nameColumn}>Chef Name</th>
            <th>Orders Taken</th>
            </tr>
        </thead>
        <tbody>
            {chefs.map((chef) => (
            <tr key={chef._id}>
                <td className={styles.nameColumn}>{chef.name}</td>
                <td>{chef.currentOrders}</td>
            </tr>
            ))}
        </tbody>
    </table>

  )
}

export default ChefTable