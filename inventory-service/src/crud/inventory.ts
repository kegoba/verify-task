
import Inventory from '../model/inventory';
import { InventoryProps } from '../types';


interface Pagination {
    page: number;
    limit: number;
  }

export const create_inventory = async (data: InventoryProps) => {
  const product = new Inventory(data);
  await product.save();
  //if (!product) return false
  return product|| false
};

export const update_inventory_by_id = async ( id :string, data :InventoryProps) => {
  const product = await Inventory.findByIdAndUpdate(id, data, { new: true });
  if (!product) return false
  return product

};


export const one_inventory = async (id: string) => {
  const product = await Inventory.findById(id);
  if (!product) false
    return product
};


export const all_inventory = async (pagination: Pagination) => {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;
  
    const products = await Inventory.find().skip(skip).limit(limit);
    const totalItems = await Inventory.countDocuments();
  
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


  export const delete_all_inventory = async () => {
    try {
      const result = await Inventory.deleteMany({});
    } catch (err) {
      console.error('Error deleting items:', err);
    }
  };