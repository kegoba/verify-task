import { Router } from "express";
import {
create_order_middleware,
update_middleware,
get_one_middleware
} from "../middlewares/orderMiddleware"

import {
get_all_order,
get_one_order,
add_order,
update_order
} from "../controllers/order";

const orderRoute = Router();

orderRoute.get("/get-all-order" , get_all_order);
orderRoute.get("/get-one-order/:id" , get_one_middleware, get_one_order);
orderRoute.post("/add-order" ,  create_order_middleware, add_order);
orderRoute.put("/update-order/:id", update_middleware, update_order);


export default orderRoute;