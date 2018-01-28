const db = require('./db');

const BlogDataSource = require('./data/server/Blog');
const blogDataSource = new BlogDataSource(db);

const BlogModule = require('./modules/read/Blog');
const renderFunctions = {
    'blog': new BlogModule(blogDataSource)
};

const Router = new RoutingTree("/api/v1.0");


