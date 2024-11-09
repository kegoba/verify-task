import { Request, Response } from 'express';
import {
  create_order,
  update_order_by_id,
  one_order,
  all_order,
  all_log,
  delete_all_order_fn
} from '../crud/order'
import { OrderProps, requestProps } from '../types';
import { SendGetRequest, SendPutRequest } from '../utils';
import {INVENTORY_BASE_URL} from "../config/index"


export const get_all_order = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const product = await all_order({ page: Number(page), limit: Number(limit) });
    if (product){
      return res.status(200).json({
        code: 200,
        responseCode: 200,
        status: "successful",
        message: "fetched Successfully",
        data: product,
      });
    }
    ;
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};

export const get_one_order = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await one_order(id);
    if (product){
      return res.status(200).json({
        code: 200,
        responseCode: 200,
        status: "successful",
        message: "fetched Successfully",
        data: product,
      });
    }
    ;
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};

export const add_order = async (req: Request, res: Response) => {

    const { productId, quantity }  = req.body as OrderProps;

  try {
    // Fetch product details from Inventory Service
    const url = `${INVENTORY_BASE_URL}/stock/${productId}`;
    const { data: product } = await SendGetRequest(url)
    if (!product) {
      return res.status(404).json({ message: 'Product not found in inventory' });
    }

    if (Number(product.stockLevel )< Number(quantity)) {
      return res.status(400).json({ message: 'Insufficient stock' });
    } 
    // Deduct stock and create order
    product.stockLevel -= Number(quantity);
    const data = {
      stockLevel : Number(product.stockLevel)
    }
   
    await SendPutRequest({url,data} as requestProps);
    const order:any ={
      productId,
      quantity:quantity,
      totalPrice: Number(product.price) * Number(quantity),
    };
    const orderedProduct= await create_order(order)
    if (product){
      return res.status(200).json({
        code: 201,
        responseCode: 201,
        status: "successful",
        message: "Created Successfully",
        data: orderedProduct,
      });
    }
    ;
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};

export const update_order = async (req: Request, res: Response) => {
  try {
    const { id }  = req.params
    const data = req.body as OrderProps
    const product = await update_order_by_id(id, data);
    if (product){
      return res.status(200).json({
        code: 200,
        responseCode: 200,
        status: "successful",
        message: "updated Successfully",
        data: product,
      });
    }
    ;
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};


export const get_all_log = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const product = await all_log({ page: Number(page), limit: Number(limit) });
    if (product){
      return res.status(200).json({
        code: 200,
        responseCode: 200,
        status: "successful",
        message: "fetched Successfully",
        data: product,
      });
    }
    ;
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};



export const delete_all_order = async (req: Request, res: Response) => {
  try {
 
    const product = await delete_all_order_fn();
    
      return res.status(200).json({
        code: 200,
        responseCode: 200,
        status: "successful",
        message: "deleted Successfully",
      
      });
    
    
  } catch (error: any) {
    return res.status(200).json({
      code: 400,
      responseCode: error.code,
      status: "failed",
      message: error.message,
      error: "An Error Occured!",
    });
  }
};

