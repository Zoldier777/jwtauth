# JWT Authentication System with Basic Frontend

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [API Endpoints](#api-endpoints)
8. [Frontend](#frontend)
9. [Security](#security)
10. [License](#license)

## Introduction

This project is a JWT (JSON Web Token) authentication system with a basic frontend. It provides a secure and scalable way to authenticate users in your web applications. JWTs are used to handle user authentication, and the project includes a simple frontend to demonstrate the authentication flow.

## Features

- User registration and login
- JWT token generation and verification
- Secure storage of user credentials
- Basic frontend for user interaction

## Requirements

- Node.js (version )
- MongoDB 
- Git
- SMPT client (SendGrid was used)
- 

## Installation

 Clone the repository:

   ```shell
   git clone https://github.com/yourusername/jwtauth.git
   cd jwtauth
   npm install
  ``` 

## Usage 

To use the JWT authentication system, follow these steps:

Register a new user using the provided frontend.
Log in with the registered user's credentials.
Obtain the JWT token.
Use the token to authenticate and access protected resources on your application.

## Configuration
Create a .env file in the project root directory and add the following environment variables:

```shell
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jwt-auth-system 
PORT: The port on which the server will run.
MONGODB_URI: The MongoDB connection string.
JWT_SECRET: Your JWT secret key for token generation and verification.
JWT_EXPIRE = Token lifetime.
EMAIL_SERVICE = Email service for password reset.
EMAIL_USERNAME = ApiKey/Username from the chosen service.
EMAIL_PASSWORD = Password for chosen service
EMAIL_FROM = Chosen mail adress for reset_passowrd_msg.
``` 

## API Endpoints
The following API endpoints are available:
```shell
POST /api/register: Register a new user.
POST /api/login: Authenticate and obtain a JWT token.
GET /api/protected: Access a protected resource (requires a valid JWT token).
```

## Frontend
The basic frontend is available at http://localhost:3000/. You can customize and enhance it to fit your application's design.

## Security
This project uses JWT for secure user authentication. Make sure to handle JWTs and user credentials securely in a production environment.

## License
This project is licensed under the ISC License - see the LICENSE file for details.




