class RequestResponseHandler {
    constructor(routes) {
        this.routes = routes;
    }

    processRequest(request) {
        const url = request.url;
        let response = {};
        const page = this.routes.getPage(url);
        if(page) {
            const requestMethod = request.method;
            const method = page[requestMethod];
            if(!method) {
                response.status = 405;
                response.body = "Method not allowed";
            response.contentType = "text/plain";
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
    
}

module.exports = RequestResponseHandler;