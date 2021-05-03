# google-docs-clone
Google Docs clone using React, Socket.io and MongoDB

## Features
* Basic Google Docs bar is implemented
* Real-time synchronization: any client connected on a specific document can write in real time, everything is synchronized between clients
* Multi documents handling: you can connect several clients on the same document, or on different ones (new one created by default)
* Data is persisted: start again your clients on same URL and you'll get back data
* Possibility to print the documents

## What you need first
You need to have installed:
* MongoDB
* Node.js

## How to start
1. With the help of your terminal, go to `server` folder
2. Type `npm i` to install all modules
3. Then type `npm run dev`
4. Open a new terminal tab, go to `client` folder
5. Type `npm i` to install all modules
6. Then type `npm start`
7. Visit `http://localhost:3000` to create your first document
8. (optional) Repeat 4 and 6 as many times as you want, on same URL or not
