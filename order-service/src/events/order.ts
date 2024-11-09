import amqp from 'amqplib';
import { LogProps, OrderProps } from '../types';



import { connectRabbitMQ } from '../config/index';
import { create_log } from '../crud/order';

export const checkStockUpdatedEvent = async () => {
  const task = "Update_item";
  try {
    const channel = await connectRabbitMQ();
    if (!channel || typeof channel.assertQueue !== 'function') {
      throw new Error('Invalid RabbitMQ channel object');
    }
    await channel.assertQueue(task, { durable: true });
    channel.consume(task, async (msg: any) => {  
      if (msg) {
        try {
          const logdata: LogProps = {
            event_type: task,
            event: msg.content,
          };
          // Assuming create_log is an async function
          await create_log(logdata);
          const event = JSON.parse(msg.content.toString());
          console.log(`Stock updated for item ${event.itemId}: New stock level is ${event.stockLevel}`);
          channel.ack(msg);
        } catch (msgError) {
          console.error('Error processing stock update message:', msgError);
          // Nack the message to requeue it for another attempt
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error('Error setting up stock update listener:', error);
  }
};




export const addStockEvent = async () => {
  const task = "add_item";
  try {
    const channel = await connectRabbitMQ();
    if (!channel || typeof channel.assertQueue !== 'function') {
      throw new Error('Invalid RabbitMQ channel object');
    }
    await channel.assertQueue(task, { durable: true });
    channel.consume(task, async (msg: any) => {  
      if (msg) {
        try {
          const logdata: LogProps = {
            event_type: task,
            event: msg.content,
          };
          // Assuming create_log is an async function
          await create_log(logdata);
          const event = JSON.parse(msg.content.toString());
          console.log(`New Stock added: New stock level is ${event.stockLevel}`);
          channel.ack(msg);
        } catch (msgError) {
          console.error('Error processing stock update message:', msgError);
          // Nack the message to requeue it for another attempt
          channel.nack(msg, false, true);
        }
      }
    });
  } catch (error) {
    console.error('Error setting up stock update listener:', error);
  }
};


