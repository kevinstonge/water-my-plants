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

### POST to /api/plants

provide the following object in your request body:

```javascript
{
    "nickname": "[nickname for your plant]",
    "binomial": "[Genus species of your plant (optional)]",
    "water_frequency": "[number of times per month this plant needs water]",
    "image": "[url to image of your plant (optional)]"
}
```

server will either return an error message or a message indicating that the plant was successfully created, and providing the newPlantId:

```javascript
{
    "message": "successfully added [nickname of your plant] to the database",
    "newPlantId": "[unique database id of your plant]"
}
```

### GET to /api/plants

server will return an array of plant objects that contains all plants associated with the user making the authenticated request:

```javascript
{
    "plants": [
        {
            "id": "1",
            "nickname": "groot",
            "binomial": "unknown",
            "water_frequency": "20",
            "image": "[url to image]",
            "owner_id": "[owner id]"
        },
        {
            "id": "3",
            "nickname": "baby groot",
            "binomial": "unknown",
            "water_frequency": "30",
            "image": "[url to image]",
            "owner_id": "[owner id]"
        }
    ]
}
```

### PUT to /api/plants/:plantId

provide all or part of the following object in your request body:

```javascript
{
    "nickname": "[nickname for your plant]",
    "binomial": "[Genus species of your plant (optional)]",
    "water_frequency": "[number of times per month this plant needs water]",
    "image": "[url to image of your plant (optional)]"
}
```

server will either return an error message or a message indicating that the plant was successfully edited, and providing the updated plant object:

```javascript
{
    "message": "update successful",
    "updatedPlant": {"id": "[id]", "nickname", "[nickname]", ...}
}
```

## /api/usda endpoints

data comes from this repository: https://github.com/sckott/usdaplantsapi/

### GET to /api/usda/genera

returns an array of all plant genera in the database:

`{"genera": ["Abutilon","Abrus","Abietinella",...]}`

### GET to /api/usda/:genus/species

returns all species in the database that belong to the specified genus. The data is an array of objects, each object contains a species name and the unique database id of that species:

`{"species": [{ "Species": "californica", id: 360}, ...]}`

### GET to /api/usda/:id

returns the complete plant data associated with the provided id:

`{"plant":{"id": 360, ...}}`

### GET to /api/usda/search/?commonName=[query]

send a get request with a search query, example to search for 'florida':

`/api/usda/search/?commonName=florida`

the server will return a list of search results

```javascript
{
    "results": [{"id":71,"Symbol":"ABHI", ...}, {"id":1585,"Symbol":"AGARI", ...}, ...],
    "totalResults": 160,
    "offset": 0
}
```
