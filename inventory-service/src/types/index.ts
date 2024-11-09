
import mongoose from 'mongoose';



export interface InventoryProps extends mongoose.Document{
  product_name: string;
  stockLevel: number;
  price: number;
}