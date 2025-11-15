we install some dependecies like nodemon as dev depencies because these dependecies are only required during development, when we deploy these dev dependecies will not be installed so our production build will be smaller and optimized.

we do this using --save-dev or -D flag

for aws deployement we replace index.js with app.js file because aws by default looks for app.js file to start the server.
also replace in package.json file the main file from index.js to app.js

and we also add a environment variable PORT so that aws can assign a port dynamically.
and also for mongodb connection string we use process.env.MONGODB_URI so that we can set the connection string in aws environment variables.
s
