import mongoose from 'mongoose';


export interface OrderProps extends mongoose.Document{
  productId: string;
  quantity: number;
  totalPrice: number;
}

export interface requestProps {
  url: string;
  data?: {};

}