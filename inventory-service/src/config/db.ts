import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
const amqp = require('amqplib');
dotenv.config();

const { DATABASE_URL } = process.env;
export const  PORT  = process.env;


export const connectRabbitMQ = async () => {
  let connection = null;
  const maxRetries = 5;
  let retries = 0;

  while (!connection && retries < maxRetries) {
    try {
      connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://rabbitmq');
      console.log('Connected to RabbitMQ');
    } catch (err) {
      console.error('RabbitMQ connection error, retrying...', err);
      retries++;
      if (retries >= maxRetries) {
        console.error('Max retries reached, exiting...');
        process.exit(1);
      }
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));  
    }
  }
  return connection;
};




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


