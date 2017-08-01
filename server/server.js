const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

require('./models/Users');
require('./models/Scripts');
require('./models/FeedbackRequest');
require('./models/Feedback');

require('./config/secret');
require('./config/passport');

const api = require('./routes/api');
const usersApi = require('./routes/users');
const creditsApi = require('./routes/credits');
const scriptsApi = require('./routes/scripts');
const feedbackRequestApi = require('./routes/feedback-requests');
const feedbackApi = require('./routes/feedback');

app.use('/api', api);
app.use('/api/users', usersApi);
app.use('/api/credits', creditsApi);
app.use('/api/scripts', scriptsApi);
app.use('/api/feedback-requests', feedbackRequestApi);
app.use('/api/feedback', feedbackApi);

app.use('/script-storage', express.static(path.join(__dirname, 'script-storage')));

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
