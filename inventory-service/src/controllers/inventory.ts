import { Request, Response } from 'express';
import {
  create_inventory,
  update_inventory_by_id,
  one_inventory,
  all_inventory
} from '../crud/inventory'
import { InventoryProps } from '../types';
import { add_event, update_event } from '../events/inventory';








export const get_all_inventory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const product = await all_inventory({ page: Number(page), limit: Number(limit) });
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

export const get_one_inventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await one_inventory(id);
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

export const add_inventory = async (req: Request, res: Response) => {
  const data = req.body as InventoryProps
  try {
    const product = await create_inventory(data);
    if (product){
      //add event
      add_event(product)
      return res.status(201).json({
        code: 201,
        responseCode: 201,
        status: "successful",
        message: "Created Successfully",
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


export const update_inventory = async (req: Request, res: Response) => {
  try {
    const { id }  = req.params
    const data = req.body as InventoryProps
    const product = await update_inventory_by_id(id, data);
    if (product){
      //update the event
      update_event(product)
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

