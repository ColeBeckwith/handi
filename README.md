For Development:

From the root directory run:

$ docker run -d --name mongodb -p 27017:27017 mongo

then:

$ docker start mongodb

This will set up the mongoDB on localhost.

Configure node run the script in /server/server.js. Run in debug mode.

From the /client directory run npm start.