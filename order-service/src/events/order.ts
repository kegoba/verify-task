import amqp from 'amqplib';
import { OrderProps } from '../types';



import { connectRabbitMQ } from '../config/index';

export const checkStockUpdatedEvent = async () => {
  const task = "Update_item";

  try {
    const channel = await connectRabbitMQ();

    // Ensure a valid channel is returned before proceeding
    if (!channel || typeof channel.assertQueue !== 'function') {
      throw new Error('Invalid RabbitMQ channel object');
    }

    // Assert the queue to ensure it exists
    await channel.assertQueue(task, { durable: true });
    console.log('Waiting for stock update events...');

    // Set up consumer for the stock update queue
    channel.consume(task, (msg:any) => {
      if (msg) {
        try {
          // Parse message content and handle the event
          const event = JSON.parse(msg.content.toString());
          console.log(`Stock updated for item ${event.itemId}: New stock level is ${event.quantity}`);
          
          // Acknowledge successful message processing
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
    await channel.assertQueue(task, { durable: true });

    channel.consume(task, async (msg:any) => {
      if (msg) {
        try {
          const event = JSON.parse(msg.content.toString());
          console.log(`Stock added for item ${event.itemId}: New stock level is ${event.stockLevel}`);
          await channel.ack(msg);  
        } catch (msgError) {
          console.error('Error processing add stock message:', msgError);
          channel.nack(msg, false, true);  
        }
      }
    });
  } catch (error) {
    console.error('Error setting up add stock listener:', error);
  }
};
