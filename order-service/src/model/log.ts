import mongoose, { Schema } from 'mongoose';
import {OrderProps} from '../types/index'

const LogSchema = new Schema({

  event: { type: String, required: true },
  event_type: { type: String, required: true },
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
  

export default mongoose.model<any>('Log', LogSchema);
