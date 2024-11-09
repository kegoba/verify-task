import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
const amqp = require('amqplib');
dotenv.config();

const { DATABASE_URL } = process.env;
export const  PORT  = process.env;
export let INVENTORY_BASE_URL = process.env.INVENTORY_BASE_URL










export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();  // Ensure a channel is created
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}






export const connectDatabase = (cb?: () => void): void => {
  if (!DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose
    .connect(DATABASE_URL, {
      socketTimeoutMS: 30 * 1000,
    } as ConnectOptions) 
    .then(() => {
      console.log("Database connected successfully.");
      if (cb) cb();
    })
    .catch((error) => {
      console.error("DATABASE ERROR:", error);
      process.exit(1);
    });
};


