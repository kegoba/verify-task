import http from "http";
import app from "./app";
import {connectDatabase} from "./config";
import {addStockEvent, checkStockUpdatedEvent} from "./events/order"



const server = http.createServer(app);



const PORT = process.env.PORT || 8001;



app.get("/", (req, res) => {
  return res.status(200).json({
    code: 200,
    status: "success",
    message: 'verify API up and running'
  }); 
})

// End that is not found will return this
app.use((req, res) => {
  return res.status(404).json({
    code: 404,
    status: "failed",
    message: 'Endpoint not found',
    error: "An Error Occured!",
  });
});

const startServer = async () => {
  try {
    // Connect to the database
    await connectDatabase();

    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Listen for RabbitMQ events after the server starts
    await checkStockUpdatedEvent();
    await addStockEvent();

  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit if any step fails (like DB or RabbitMQ)
  }
};

startServer();



