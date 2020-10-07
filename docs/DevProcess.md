# Development Process
Hey! We're glad you're interested in our development process! 

We've made this app to handle all the DB operations for the Funds App.

## Express and Mongo: The MERN Stack.
In order to communicate with the FrontEnd app, we needed to handle some routes to get the Funds List, Add new Funds to the project and make the communication secure for project transparency and avoiding false funds.
So we decided to create an API Rest based on ExpressJS and MongoDB. We made this desition in order to get a Fullstack Javascript App, easy to mantain and contribute and avoiding complex backend frameworks.

For the Frontend App we did the same, using React as our main dependency to create components and avoid using complex and structurated frameworks like Angular.

## Auth
We've added an Auth middleware using JWT Strategy in order to secure our Funds App, to avoid getting funds from bots or malintended users. 
The Auth middleware receive a Basic Authentication (Username and Password) and compare them with the Admin User data in our production DB. 
If they match, it returns an `access_token` that can be used to get the Funds List and to add a new fund. This way, we ensure that only the app that knows the admin data can add a new fund (In this case, our FrontEnd App).
Also is provided with a secret word so we can encrypt and decrypt the passwords for security. 
If we need it, we can open our API to other clients just making a few changes or even add more admin/non-admin users with specific permissions.

## Param verification
We've added [`Joi`](https://www.npmjs.com/package/joi) to handle the parameters validations to be sure that the `email` and `amount` params match the specified types. 

## Error Handling
We're using errorHandlers with [`@hapi/Boom`](https://www.npmjs.com/package/@hapi/boom) to handle errors in the requests and DB Operations. 
We've implemented 3 errorHandlers: 
- `logErrors`: To Log the errors in console, but also if we need to add Error Handlers Services as Sentry.
- `clientErrorHandler`: To handle the Client Errors in case the request is a `xhr` request.
- `errorHandler`: The default error handler. To Catch errors while streaming and delete the error stack in production mode.

## Database: MongoDB
We implemented a Mongo Lib to handle all the DB operations.
The currently needed are: 
- `connect` To make the conenction to MongoDB.
- `getAll` to get all the data from the funds collection
- `create` To add a new item into the funds collection.

You can see more in the [MongoLib File](lib/mongo.js).

## Security: Helmet
We implement the default options of [`helmet`](https://helmetjs.github.io/) to securize our Express App by setting various HTTP headers (See [Helmet Reference](https://www.npmjs.com/package/helmet)).



