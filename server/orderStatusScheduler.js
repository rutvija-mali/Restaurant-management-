import cron from 'node-cron';
import Order from './models/Orders.js';
import mongoose from 'mongoose';
import Table from './models/Table.js';
import Chef from './models/Chef.js';

cron.schedule('*/10 * * * *', async () => {
  console.log('Running order status update cron job...');
  
  try {
    const now = new Date();
    const orders = await Order.find({ status: 'Ongoing' });
    
    for (const order of orders) {
      const differenceInMin = Math.floor((now - order.orderPlacedAt) / 60000);
      
      if (differenceInMin >= order.estimatedPrepTime) {

        order.status = order.orderType === 'dine in' ? 'Served' : 'Not Picked Up';
        await order.save();
        
        console.log(`Updated status of order ${order.orderNumber} to ${order.status}`);
        

        if (order.assignedTable) {
          try {
            await Table.findByIdAndUpdate(
              order.assignedTable,
              { status: 'Available' }
            );
            console.log(`Table ${order.assignedTable} set to Available`);
          } catch (tableError) {
            console.error(`Error updating table ${order.assignedTable}:`, tableError);
          }
        }
        
        
        if (order.assignedChef) {
          try {
            await Chef.findByIdAndUpdate(
              order.assignedChef,
              { $inc: { currentOrders: -1 } }
            );
            console.log(`Chef ${order.assignedChef} order count decremented`);
          } catch (chefError) {
            console.error(`Error updating chef ${order.assignedChef}:`, chefError);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});