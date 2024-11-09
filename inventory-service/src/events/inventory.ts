import amqp from 'amqplib';
import { InventoryProps } from '../types';
import {connectRabbitMQ} from "../config/db"




export const update_event = async (item:InventoryProps) => {
  let task = "Update_item";
  try {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    const event = { itemId: item.id, quantity: item.quantity, updatedAt: new Date() };
    channel.sendToQueue(task, Buffer.from(JSON.stringify(event)));
    console.log('Update event sent successfully');
  } catch (err:any) {
    console.error('Error while sending update event:', err);
    
  }
};



export const add_event = async (item:InventoryProps) => {
  let task = "add_item";
  try {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel()
    const event = { quantity: item.quantity, price: item.price, product_name: item.product_name };
    channel.sendToQueue(task, Buffer.from(JSON.stringify(event)));
    console.log('Add event sent successfully');
  } catch (err:any) {
    console.error('Error while sending add event:', err);
   
  }
};



