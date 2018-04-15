class PageHandler {

    constructor(db) {
        this.db = db;
    }

    getPage(hostname, url) {
        const routingTree = this.getRoutingTreeForHost(hostname);
        const pageId = routingTree.getPage(url);
        
    }

    getRoutingTreeForHost(hostname) {

    }
}

module.exports = PageHandler;