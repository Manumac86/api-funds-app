# API Funds App
This is the API for the Funds App.

This API get the funds list from the database in order to provide the Frontend with the needed data.
API Funds App is responsible of adding new funds to the database when a user supports the porject.
It implements a Token based Auth middleware so it can be used only by the clients with ADMIN access and params validation in order 
to check that the received data is valid.
This is important in order to keep transparency in the project funding.

## Production
The app is deployed using Heroku services as a NodeJS server.
You can check the service is up by trying a request to ['/api/service/ready'](https://mysterious-springs-20524.herokuapp.com/api/service/ready)

## Endpoints
The API has 3 endpoints in order to interactuate with the Frontend: 
| Description             | Endpoint            | Method   |
| ----------------------- | ------------------- | -------- |
| Get the API Auth Token  | `'/api/auth/token'` | `POST`   |
| Get the Funds List      | `'/api/funds'`      | `GET`    |
| Add a new Fund          | `'/api/funds'`      | `POST`   |

## Local Development
