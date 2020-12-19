Frontend repo: https://github.com/ialkamal/water-plants

Backend repo: https://github.com/kevinstonge/water-my-plants

Backend Heroku App: https://water-my-plants-lambda.herokuapp.com

# Endpoints

## unrestricted endpoints

these endpoints do not require the authentication token

### POST to /api/register

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

### POST to /api/login

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

## restricted endpoints

these endpoints require that you provide your user token in the authentication header:

```javascript
{
    "headers": {
        "authorization": "Bearer [your token]"
    }
}
```

### GET to /api/users

server will either return an error message:
`{"error":"[some error]"}`

or an object containing the username and phone number for that user:

```javascript
{
    "username":"[username]",
    "phone":"[phone number]"
}
```

### PUT to /api/users/password

provide the following object in your request body:

```javascript
{
    "oldPassword": "[current password]",
    "password": "[new password]"
}
```

server will either return an error message:
`{"error":"[some error]"}`

or a message indicating that the password was changed successfully:
`{ "message": "successfully changed password" }`

### PUT to /api/users/phone

provide the following object in your request body: `{"phone":"[new phone number]"}`

server will either return an error message: `{"error":"[some error]"}`

or a message indicating the the phone number was changed successfully:
`{"message": "successfully updated phone number to [new phone number"}`
