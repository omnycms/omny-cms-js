const Koa = require('koa');

const RequestResponseHandler = require('../../src/apis/handlers/RequestResponseHandler');
const KoaHandler = require('./KoaHandler');

const apiRoutes = require('../../src/apis/');

const app = new Koa();

const koadHandler = new KoaHandler(app, new RequestResponseHandler(apiRoutes));

koadHandler.initialize();

app.listen(3001);