# verify-task

Step 1: Install tools
clone the app by running => git clone https://github.com/kegoba/verify-task.git 

git clone https://github.com/kegoba/verify-task.git 
cd  verify-task
docker-compose up --build  

Step 2: Access the Services
Inventory Service:
Open your postman to run base_url http://localhost:8000/api/v1/inventory

Order Service:
Open your postman to run base_url http://localhost:8001/api/v1/order


you can Open your browser and go to http://localhost:15672 to access the RabbitMQ management console.
Default login credentials:
Username: guest
Password: guest


Use Postman .
visit https://documenter.getpostman.com/view/29626607/2sAY52cey7
for the complete documentation
Monitor the Order Service logs in the terminal to check if the stock update events are processed correctly.


stop the app by running
docker-compose down



Step 3: Test the Application
To run integrated and unit test.
cd  verify-task
cd inventory-service
npm test



