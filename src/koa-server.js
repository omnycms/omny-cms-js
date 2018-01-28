const Koa = require('koa');

const RequestResponseHandler = require('./apis/handlers/RequestResponseHandler');
const KoaHandler = require('./apis/handlers/KoaHandler');

const apiRoutes = require('./apis/');

const app = new Koa();

const koadHandler = new KoaHandler(app, new RequestResponseHandler(apiRoutes));

koadHandler.initialize();

app.listen(3001);