import { Request, Response, NextFunction } from 'express';


export const create_order_middleware = (req: Request, res: Response, next: NextFunction) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ message: 'productId is required.' });
  }
  
  if (quantity === undefined || typeof quantity !== 'number') {
    return res.status(400).json({ message: 'quantity is required.' });
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
  const { product_name, price, quantity } = req.body;
  if (product_name === undefined && price === undefined && quantity === undefined) {
    return res.status(400).json({
      message: 'field can not be Empty',
    });
  }
  next();
};


