class RequestResponseHandler {
    constructor(routes, pageHandler) {
        this.routes = routes;
        this.pageHandler = pageHandler;
    }

    processRequest(request) {
        const url = request.url;
        let response = {};
        const page = this.routes.getPage(url);
        if(page) {
            const requestMethod = request.method;
            const method = page[requestMethod];
            if(!method) {
                if(!this.handleResponseWithPageOrStaticContent(request, response)) {
                    response.status = 405;
                    response.body = "Method not allowed";
                    response.contentType = "text/plain";
                }
            } else {
                request.pathComponents = this.routes.getPathComponents(page, url);

                response = page[requestMethod](request);
                response.contentType = response.contentType || "application/json";
            }   
        } else {
            response.status = 404;
            response.body = "Not Found";
            response.contentType = "text/plain";
        }

        return response;
    }

    handleResponseWithPageOrStaticContent(request, response) {
        if(this.pageHandler) {
            const page = this.pageHandler.getPage(request.hostname, request.url);
            if(page) {
                
            }
        }
        return false;
    }
}

module.exports = RequestResponseHandler;