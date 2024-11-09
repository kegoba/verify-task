import mongoose, { Schema } from 'mongoose';
import {OrderProps} from '../types/index'

const OrderSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
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
  

export default mongoose.model<OrderProps>('Order', OrderSchema);
