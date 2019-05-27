> ### Example Node (Express + Mongoose) codebase containing microservices with their respective databases.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Copy the .env.example to .env file, to make the environment file

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [amqp](https://www.rabbitmq.com/getstarted.html) - Advanced Message Queuing Protocol

## Application Structure

- `app.js` - The entry point to the application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `controllers/` - This folder handles the requests made by the user.
- `services/` - This folder contains all the business logic.
- `repository/` - This folder contains the repository pattern.
- `rabbit/` - This folder contains the generic messaging sender.

