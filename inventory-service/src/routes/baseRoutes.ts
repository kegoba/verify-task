import { Application } from "express";

import inventoryRoute from "./inventoryRoute";




function appRouter(app: Application) {

  app.use("/api/v1/inventory", inventoryRoute);
  

}

export default appRouter;


