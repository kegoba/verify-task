import { Router } from "express";
import {
create_inventory_middleware,
update_middleware,
get_one_middleware
} from "../middlewares/inventoryMiddleware"

import {
get_all_inventory,
get_one_inventory,
add_inventory,
update_inventory
} from "../controllers/inventory";

const inventoryRoute = Router();

inventoryRoute.get("/stock/:id" , get_one_middleware, get_one_inventory);
inventoryRoute.post("/stock" ,  create_inventory_middleware, add_inventory);
inventoryRoute.put("/stock/:id", update_middleware, update_inventory);
inventoryRoute.get("/all-stock" , get_all_inventory);


export default inventoryRoute;