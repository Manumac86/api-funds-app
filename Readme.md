# API Funds App
This is the API for the Funds App.

This API get the funds list from the database in order to provide the Frontend with the needed data.
API Funds App is responsible of adding new funds to the database when a user supports the porject.
It implements a Token based Auth middleware so it can be used only by the clients with ADMIN access and params validation in order 
to check that the received data is valid.
This is important in order to keep transparency in the project funding.

## FrontEnd
If you're looking for the FrontEnd App you can find it in the [front-funds-app](https://github.com/Manumac86/front-funds-app) repo.


## Production
The app is deployed using Heroku services as a NodeJS server.
You can check the service status by in [https://mysterious-springs-20524.herokuapp.com/api/service/ready](https://mysterious-springs-20524.herokuapp.com/api/service/ready).

You should receive the following response: 
```
Status Code: 200 OK
Data:
{
  "data": {
    "service": "READY"
  },
  "message": "OK"
}  
```

## Endpoints
The API implements the following endpoints in order to interactuate with the Frontend: 
| Description             | Endpoint            | Method   |
| ----------------------- | ------------------- | -------- |
| Get the API Auth Token  | `'/api/auth/token'` | `POST`   |
| Get the Funds List      | `'/api/funds'`      | `GET`    |
| Add a new Fund          | `'/api/funds'`      | `POST`   |

### Example Requests:
``` 
POST 'api/auth/token'
Headers: {
  Authorization: Basic base64(username:password)
}

Success Response: 
STATUS: 200 'OK'
{
  "access_token": "jasndjkAKSJDKJNnsdajskd......"
}

Failed Response: 
STATUS: 401 Unathorized
```

``` 
GET 'api/funds'
Headers: {
  Authorization: Bearer jasndjkAKSJDKJNnsdajskd......
}

Success Response: 
STATUS: 200 'OK'
{
  data: [
    {
      _id: "5f76ec42ca1cd5283b710503",
      amount: 50
      created_at: "2020-10-02T09:00:48.467Z",
      email: "emmartinez86@gmail.com",
    },
    {
      _id: "5f7d6b7cbf9a5000046cbf7b",
      amount: 200
      created_at: "2020-10-07T07:17:16.931Z",
      email: "emmartinez86@gmail.com",
    }
  ]
}

Failed Response: 
STATUS: 401 Unathorized
```

``` 
POST 'api/funds'
Headers: {
  Authorization: Bearer jasndjkAKSJDKJNnsdajskd......
}

Success Response: 
STATUS: 201 'CREATED'
{
  data: {
    _id: "5f7e39ebfd0b750004f323a5",
  },   
  message: "CREATED"
}

Failed Response: 
STATUS: 401 Unathorized
```

## Local Development

### Requeriments
The project is build with NodeJS v.12. In order to get the app working in local, we recomend to install `nvm`:  
In MacOS you can install it using [Homebrew](https://brew.sh/): 
```
brew update
brew install nvm
mkdir ~/.nvm
```
Now add these lines to `~/.bash_profile` ( or `~/.zshrc` for macOS Catalina or later)
```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```
Run `nvm -v` to make sure you have access to `nvm`.

- Clone this repo to your local environment.
- `cd` into `api-funds-app`
- Run `nvm install 12` in order to get the NodeJS v.12
- Run `nvm use && npm i`.

### Environment Variables
We provide a testing environment for local development with the following settings: 
```
# CONFIG
PORT=8000

# MONGO DB
DB_USER=db_user_funds_app
DB_PASSWORD=X6urY0lunAwLCJAU
DB_HOST=cluster0.7ptz8.mongodb.net
DB_NAME=funds_db

# AUTH
AUTH_ADMIN_USERNAME=admin
AUTH_ADMIN_PASSWORD=manumac86
AUTH_ADMIN_EMAIL=emmartinez86@gmail.com
AUTH_JWT_SECRET=716bc60758821b65cc1b0a77bbede2a1b02e604102ef6681fab4c1959eeb74a0
```
Just run `cp .env.dev.example .env` in the root dir and that's it.
Feel free to setup your own MongoDB and change these data in your `.env`

### Seed Admin User
If you are using our testing variables, you can ommit this step.
If you choose to use your own DB, fill the `AUTH` environment variables in your `.env` file and run the provided script in order to generate the Admin User to access the DB: 
- Open your terminal in the root folder and run `node ./scripts/mongo/seed-admin.js`.
The Admin user will be generated using the mentioned configs. 
- Check your Mongo Database to check if the user was generated successfuly.

### Run the App locally
Once you have your configs and your admin user in the database, you can run the app with the following: 
- `npm run start:development` (development mode).
- Install Postman and configure the AUTH endpoint in order to get the AdminAPI Token (Using Basic Authentication providing your `AUTH_ADMIN_USERNAME` and your `AUTH_ADMIN_PASSWORD`).

![Postman](docs/postman.png)

- Go to Test tab and add the following lines in order to save the token as an environment variable:
```
var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("access_token", jsonData.access_token);
```

- Make the GET Request to `'api/funds'` using the Token to get the Funds List.

![Postman](docs/postman2.png)

- Make the POST Request to `'api/funds'` using the Token in order to create a new fund with the following body data. Make sure you are using JSON format: 

```
{
    "amount": 50,
    "email": "me@me.com"
}
```

![Postman](docs/postman3.png)

## The Development Process
If you're interested in the background behind this app, you can read more at our [Development Process Docs](docs/DevProcess.md).

## Contribute
- Fork this repo
- Clone in to your local
- Make your awesome contributions
- Push to your remote repo
- Create a Pull Request against `master`
- Ask us for a code review.