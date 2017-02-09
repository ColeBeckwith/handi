const app = require('../server/server');
const debug = require('debug');
const http = require('http');

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);



