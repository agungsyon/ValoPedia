# API Documentation

## EndPoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /login/google`

- `GET /agents`
- `GET /bundles`
- `POST /generate-midtrans-token`
- `POST /inventories`
- `GET /inventories`

&nbsp;

## 1. POST /register

#### Request:

- body:

```json
{
  "email": "string" (required),
  "password": "string" (required),
}
```

_Response (201 - Created)_

```json
{
  "id": integer,
  "email": string
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email already exist"
}
OR
{
  "message": "Incorrect email format"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Minimum password is 5 characters and maximum 20 characters"
}
```

&nbsp;

## 2. POST /login

#### Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. POST /login/google

_Response (200 - OK)_

```json
{
  "access_token": "string",
}
```

_Response (201 - Created)_

```json
{
  "access_token": "string",
}
```

&nbsp;

## 4. GET /agents

#### Request:

- query:

```json
{
  "page": "integer",
}
```

_Response (200 - OK)_


```json
[
    {
        "id": "e370fa57-4757-3604-3648-499e1f642d3f",
        "name": "Gekko",
        "description": "Gekko the Angeleno leads a tight-knit crew of calamitous creatures. His buddies bound forward, scattering enemies out of the way, with Gekko chasing them down to regroup and go again.",
        "icon": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
        "image": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
        "role": "Initiator",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png"
    },...
]
```

&nbsp;

## 5. GET /bundles

#### Request:

- query:

```json
{
  "page": "integer",
}
```

_Response (200 - OK)_


```json
[
    {
        "id": "d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",
        "name": "RGX 11z Pro",
        "image": "https://media.valorant-api.com/bundles/d958b181-4e7b-dc60-7c3c-e3a3a376a8d2/displayicon.png",
        "imageVertical": "https://media.valorant-api.com/bundles/d958b181-4e7b-dc60-7c3c-e3a3a376a8d2/verticalpromoimage.png"
    },...
]
```

&nbsp;

## 6. POST /generate-midtrans-token

#### Request:

-headers:

```json
{
  "access_token": "string",
}
```

- body:

```json
{
  "bundleId": "string",
  "name": "string",
}
```

_Response (201 - created)_


```json
{
    "token": "string",
    "url": "string"
}
```

&nbsp;

## 7. POST /inventories

#### Request:

-headers:

```json
{
  "access_token": "string",
}
```

- body:

```json
{
  "bundleId": "string",
  "name": "string",
  "imgUrl": "string",
}
```

_Response (201 - created)_


```json
{
    "id": "integer",
    "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "BundleId is required"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Image is required"
}
```

&nbsp;

## 8. GET /inventories

#### Request:

-headers:

```json
{
  "access_token": "string",
}
```

_Response (200 - ok)_


```json
[
    {
        "id": 1,
        "UserId": 1,
        "bundleId": "d958b181-4e7b-dc60-7c3c-e3a3a376a8d2",
        "name": "RGX 11z Pro",
        "imgUrl": "https://media.valorant-api.com/bundles/d958b181-4e7b-dc60-7c3c-e3a3a376a8d2/displayicon.png",
        "createdAt": "2023-10-25T15:20:09.313Z",
        "updatedAt": "2023-10-25T15:20:09.313Z"
    },...
]
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```