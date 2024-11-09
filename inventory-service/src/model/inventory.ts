import mongoose, { Schema, Document } from 'mongoose';
import {InventoryProps} from '../types/index'




const InventorySchema = new Schema({
    product_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
    toJSON: {
      virtuals: false,
      transform: (doc: any, ret: any) => {
        delete ret.__v;  
        return ret;
      }
    },
    toObject: {
      virtuals: false,
      transform: (doc: any, ret: any) => {
        delete ret.__v;  
        return ret;
      }
    }
  });
  

export default mongoose.model<InventoryProps>('Inventory', InventorySchema);
