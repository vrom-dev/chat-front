# TwChat

Duration: 21 days \
Objective:
- Learn to use Sockets (socket.io)
- Learn Vue 3

[LIVE DEMO](https://twchat.vercel.app)

## Config

Clone the repo, move to the newly created folder and press:
```bash
npm install
```
All npm packages will be installed. 

Add the API url in the .env file as follows:
```bash
VITE_API_URL=YOUR_API_URL
```

## How to start the app
Development mode:
```bash
npm run dev
```
Build:
```bash
npm run build
npm run serve
```

### Description of the given task

Let's build a Chat! We will need socket.io, a Javascript library for real-time web applications. It allows real-time two-way communication between clients and web servers. It has two parts: a client-side library running in the browser and a server-side library for Node.js.

You will find what you need on socket.io

#### Level 1
Create an application that displays a login page where the user can enter a chat room (the client and server must be completely separate). By opening the same url in another browser window we can login with another user. Verify that they are in the same room and allow them to chat with each other. Adds the ability to create multiple chat rooms and manage persistence with MongoDB (with Mongoose) or MySQL (with Sequelize).

#### Level 2
Add authentication using Google Token (google-auth-library)

#### Level 3
Add any functionality you find useful
Add the frontend customization you want
Make the frontend with some framework (React, Vue, Angular)