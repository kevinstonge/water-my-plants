Frontend repo: https://github.com/ialkamal/water-plants

Backend repo: https://github.com/kevinstonge/water-my-plants

Backend Heroku App: https://water-my-plants-lambda.herokuapp.com

# Endpoints

## POST to /api/register

provide the following object in the request body:

```javascript
{
    "username": "[desired username]",
    "phone": "[your phone number]",
    "password": "[password]"
}
```

server will either return an error message:
`{ "error": "[some error]" }`

or a success message and a token:

```javascript
{
    "message": "registration successful",
    "token": "[the token]"
}
```

## POST to /api/login

provide the following object in the request body:

```javascript
{
    "username": "[your username]",
    "password": "[your password]"
}
```

server will either return an error message:
`{"error": "[some error]"}`

or a success message and a token:

```javascript
{
    "message": "login successful",
    "token": "[the token]"
}
```
## GET to /api/users ##

provide your user token in the authentication header:

```javascript
{ 
    "headers": { 
        "authentication": "Bearer [your token]"
    }
}
```

server will either return an error message:
`{"error":"[some error]"}`

or an object containing the username and phone number for that user:

```javascript
{
    "username":"[username]",
    "phone":"[phone number]"
}
```