const RoutingTree = require('./util/RoutingTree');

const apis = [
    new (require('./impl/Blog'))(),
    new (require('./impl/Health'))()
]

const rootPattern = "/api/v1.0";
const routingTree = new RoutingTree(rootPattern);
for(let api of apis) {
    routingTree.addPagePattern(api, api.getPattern());
}

module.exports = routingTree;