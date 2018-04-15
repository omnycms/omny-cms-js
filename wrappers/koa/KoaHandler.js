class KoaHandler {
    constructor(app, handler) {
        this.app = app;
        this.handler = handler;
    }

    initialize() {
        this.app.use(async (ctx, next) => {
            const url = ctx.request.url;
            const requestMethod = ctx.request.method.toLowerCase();
            const request = {
                url: url,
                method: requestMethod
            };

            const response = this.handler.processRequest(request);

            ctx.status = response.status;
            ctx.body = response.body;
            ctx.type = response.contentType;

            await next();
        });
    }
}

module.exports = KoaHandler;