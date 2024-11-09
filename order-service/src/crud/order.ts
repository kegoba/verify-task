
import Log from '../model/log';
import Order from '../model/order';
import { LogProps, OrderProps } from '../types';



interface Pagination {
    page: number;
    limit: number;
  }

export const create_order = async (data: OrderProps) => {
  const product = new Order(data);
  await product.save();
  if (!product) return false
  return product
};

export const update_order_by_id = async ( id :string, data :OrderProps) => {
  const product = await Order.findByIdAndUpdate(id, data, { new: true });
  console.log(product,"this is updated product crud")
  if (!product) return false
  return product

};

export const one_order = async (id: string) => {
  const product = await Order.findById(id);
  if (!product) false
    return product
};


export const all_order = async (pagination: Pagination) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
  
    const products = await Order.find().skip(skip).limit(limit);
    const totalItems = await Order.countDocuments();
  
    return {
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        pageSize: limit,
      },
    };
  };


  export const create_log = async (data: LogProps) => {
    const event_log = new Log(data);
    await event_log.save();
    if (!event_log) return false
    return event_log
  };



  export const delete_all_order_fn = async () => {
    try {
      const result = await Order.deleteMany({});
      return result
    } catch (err) {
      console.error('Error deleting items:', err);
    }
  };

  export const all_log = async (pagination: Pagination) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
  
    const products = await Log.find().skip(skip).limit(limit);
    const totalItems = await Log.countDocuments();
  
    return {
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        pageSize: limit,
      },
    };
  };

