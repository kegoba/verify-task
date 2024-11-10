import mongoose from 'mongoose';


export interface OrderProps extends mongoose.Document{
  _id : string
  productId: string;
  stockLevel: number;
  totalPrice: number;
  quantity: number
}

export interface requestProps {
  url: string;
  data?: {};

}


export interface LogProps {
  event_type : string;
  event : string

}