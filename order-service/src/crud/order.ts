
import order from '../model/order';
import { OrderProps } from '../types';



interface Pagination {
    page: number;
    limit: number;
  }

export const create_order = async (data: OrderProps) => {
  const product = new order(data);
  await product.save();
  if (!product) return false
  return product
};

export const update_order_by_id = async ( id :string, data :OrderProps) => {
  const product = await order.findByIdAndUpdate(id, data, { new: true });
  console.log(product,"this is updated product crud")
  if (!product) return false
  return product

};

export const one_order = async (id: string) => {
  const product = await order.findById(id);
  if (!product) false
    return product
};


export const all_order = async (pagination: Pagination) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
  
    const products = await order.find().skip(skip).limit(limit);
    const totalItems = await order.countDocuments();
  
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

