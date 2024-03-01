# Simple Chat

Simple Chat is a minimalistic chat application built with Vite and React on the frontend and Express.js on the backend and MySQL as db. It supports real-time messaging between two people.

## Features

- **Real-time Chat**: Engage in real-time conversations with another user.

- **Secure Authentication**: Secure user authentication using JWT.

- **Persistent Storage**: Messages are stored in a MySQL database for persistent storage.



## Client Dependencies


- **socket.io-client**: Real-time communication between the frontend and backend.

- **react-router-dom**: Client-side routing for a smooth user experience.

- **zustand**: A small, fast, and scalable state management library for React.

- **zod**: Schema validation for enhanced data integrity.

- **shadcn**: Custom styling and theming.

- **tailwind**: A utility-first CSS framework for styling.

## Server Dependencies


- **socket.io**: Enables real-time, bidirectional, and event-based communication.

- **jwt**: JSON Web Token for secure user authentication.

- **mysql2**: MySQL database driver for Node.js.

- **bcrypt**: Hashing library for password security.

## Database Structure

### Users Table

The `users` table stores information about registered users.

| Column Name       | Data Type | Description             |
|-------------------|-----------|-------------------------|
| id                | INT       | User ID (Primary Key)   |
| username          | VARCHAR   | User's unique username  |
| password          | VARCHAR   | Hashed user password    |
| avatarImageSrc | VARCHAR   | URL of user's avatar image |
| title          | VARCHAR   | User's name      |
| description    | TEXT      | User's profile description|

### Rooms Table

The `rooms` table keeps track of chat rooms.

| Column Name | Data Type | Description              |
|-------------|-----------|--------------------------|
| id          | VARCHAR   | Room ID (Primary Key)    |
| owner       | INT       | ID of the room owner     |
| guest       | INT       | ID of the room guest     |
| created_at  | TIMESTAMP | Timestamp of room creation|

### Messages Table

The `messages` table stores chat messages.

| Column Name   | Data Type | Description                     |
|---------------|-----------|---------------------------------|
| id            | VARCHAR   | Message ID (Primary Key)        |
| content       | TEXT      | Content of the chat message     |
| sender_id     | INT       | ID of the message sender        |
| target_id     | INT       | ID of the message target        |
| timestamp     | TIMESTAMP | Timestamp of message creation   |
| room_id       | VARCHAR   | ID of the associated chat room  |
| sender_username | VARCHAR | Username of the message sender  |
| target_username | VARCHAR | Username of the message target  |





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Client

`BACKEND_URL` : http://localhost:3000

### Server

`SECRET_JWT` : eyJhbGciOiJIUzI1NiJ9.ZGVtbw.OjrGHnNthS3Z5LRqWjY-n-euwpOgLKdimJdFWQbPltY

`DB_USER`

`DB_PASSWORD`

`DB_NAME`


## Run Locally

Clone the project

```bash
  git clone https://github.com/MehdiRez-Dev/simple-chat.git
```

Go to the project directory

```bash
  cd ./simple-chat
```

Install dependencies

```bash
  npm install or yarn
```

Start the server ( Client )

```bash
  npm run dev or yarn dev
```

Start the server ( Server )

```bash
  npm run server or yarn server
```




## Contact Information

#### Owner: Mehdi Rezaei
#### Contact: its.mehdirezaei@gmail.com

