import http from "http";
import app from "./app";
import {connectDatabase} from "./config/db";



const server = http.createServer(app);



const PORT = process.env.PORT || 8000;



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

connectDatabase(() => {
  // Start the server after database successful handshake
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


