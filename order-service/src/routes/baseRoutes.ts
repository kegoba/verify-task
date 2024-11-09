import { Application } from "express";

import orderRoute from "./orderRoute";




function appRouter(app: Application) {

  app.use("/api/v1/order", orderRoute);
  

}

export default appRouter;


