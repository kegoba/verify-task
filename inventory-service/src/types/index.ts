
import mongoose from 'mongoose';



export interface InventoryProps extends mongoose.Document{
  _id : string
  product_name: string;
  stockLevel: number;
  price: number;
}