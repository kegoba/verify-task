# verify-task

Step 1: Install tools
clone the app by running => git clone https://github.com/kegoba/verify-task.git 
Install node js
Install mongod 
Install Docker
Install Docker Compose

run bellow command to build and run the app
docker-compose up --build

Step 2: Access the Services
Inventory Service:
Open your browser and go to http://localhost:8000.

Order Service:
Open your browser and go to http://localhost:8001.


you can Open your browser and go to http://localhost:15672 to access the RabbitMQ management console.
Default login credentials:
Username: guest
Password: guest


Step 3: Test the Application
Use Postman .
visit https://documenter.getpostman.com/view/29626607/2sAY52cey7
for the complete documentation
Monitor the Order Service logs in the terminal to check if the stock update events are processed correctly.


stop the app by running
docker-compose down


