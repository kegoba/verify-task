import { Request, Response, NextFunction } from 'express';


export const create_inventory_middleware = (req: Request, res: Response, next: NextFunction) => {
  const { product_name, price, stockLevel } = req.body;

  if (!product_name || typeof product_name !== 'string') {
    return res.status(400).json({ message: 'product_name is required.' });
  }
  
  if (price === undefined || typeof price !== 'number') {
    return res.status(400).json({ message: 'Price is required.' });
  }

  if (stockLevel === undefined || typeof stockLevel !== 'number') {
    return res.status(400).json({ message: 'stockLevel is required.' });
  }

  next();
};



export const get_one_middleware = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'id is required.' });
  }

  next();
};



export const update_middleware = (req: Request, res: Response, next: NextFunction) => {
  const { product_name, price, stockLevel } = req.body;
  if (product_name === undefined && price === undefined && stockLevel === undefined) {
    return res.status(400).json({
      message: 'field can not be Empty',
    });
  }
  next();
};


