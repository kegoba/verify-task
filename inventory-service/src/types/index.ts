
import mongoose from 'mongoose';



export interface InventoryProps extends mongoose.Document{
  product_name: string;
  quantity: number;
  price: number;
}