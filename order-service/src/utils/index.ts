import amqp from 'amqplib';
import axios from "axios";
import { requestProps } from '../types';



export const publishNewItemEvent = async (item: any) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('newItemAdded');
  channel.sendToQueue('newItemAdded', Buffer.from(JSON.stringify(item)));
  console.log('Published new item event:', item.name);
};



export async function SendPostRequest({ url, data }: requestProps) {
  try {
    const response = await axios.post(url, data);
    console.log("i am here");
    console.log("Response:", response.data);

    return response; 
  } catch (error: any) {
    console.error("Error:", error.message);
    return error.response.data;
  }
}

export async function SendGetRequest( url:string) {
  console.log("from post",url)
  try {
    const response = await axios.get(url);
    console.log("Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("Error:", error.message);
    return error.response;
  }
}

export async function SendPutRequest({ url, data }: requestProps) {
  console.log(url)
  console.log("data",data)
  try {
    const response = await axios.put(url, data);
    return response;
  } catch (error: any) {
    console.error("Error:", error.message);
    return error.response.data;
  }
}