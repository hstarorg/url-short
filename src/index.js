const path = require('path');
const Koa = require('Koa');
const helmet = require('koa-helmet');
const static = require('koa-static');
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const error = require('koa-error');
const bodyParser = require('koa-bodyparser');
const util = require('./common/util');
const config = require('./config');

const app = new Koa();

// Load middleware
app.use(logger());
app.use(error());
app.use(responseTime());
app.use(helmet());
app.use(static(path.join(__dirname, '..', 'public')));
app.use(bodyParser());
// Load routes
util.loadRoutes(app, config.routesPath);

// Process 404
app.use((ctx) => {
  ctx.throw(404, 'not found.');
});

// Startup
const server = app.listen(config.port, err => {
  let addr = server.address();
  console.log(`Server started at ${addr.address}:${addr.port}...`);
});
