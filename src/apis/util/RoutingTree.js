class RoutingTree {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.subtrees = {};
        this.exactMatches = {};
    }

    addPagePattern(page, pattern) {
        if(pattern.startsWith("/")) {
            pattern = pattern.substring(1);
        }

        this.addPagePathComponents(page, pattern.split("/"));
    }

    addPagePathComponents(page, pathComponents) {
        const top = (pathComponents.pop && pathComponents.shift());
        if(top) {
            const matcher = this.isWildcard(top) ? "*" : top;
            if(pathComponents.length == 0) {
                this.exactMatches[matcher] = page 
            } else {
                if(!this.subtrees[matcher]) {
                    this.subtrees[matcher] = new RoutingTree(`${this.rootPath}/${matcher}`);
                }
                this.subtrees[matcher].addPagePathComponents(page, pathComponents);
            }
        }
    }

    isWildcard(input) {
        return (input.startsWith("{") || input === "*");
    }

    getWildCardPlaceHolderName(component) {
        if(component.startsWith("{")) {
            return component.substring(1, component.length -1);
        }

        return null;
    }

    getPathComponents(page, pattern) {
        if(pattern.startsWith("/")) {
            pattern = pattern.substring(1);
        }

        let pagePattern = page.getPattern();
        if(pagePattern.startsWith("/")) {
            pagePattern = pagePattern.substring(1);
        }

        const pagePathComponents = this.rootPath +"/" + pagePattern.split("/");
        const patternPathComponents = pattern.split("/");
        const pathComponents = {};
        for(let i=0; i< pagePathComponents.length && i< patternPathComponents.length; i++) {
            const placeHolderName = this.getWildCardPlaceHolderName(pagePathComponents[i]);
            if(placeHolderName) {
                pathComponents[placeHolderName] = patternPathComponents[i];
            }
        }

        return pathComponents;
    }

    matchPath(pathComponents) {
        const top = (pathComponents.pop && pathComponents.shift());
        // check for something left in the url
        if(top) {
            if(pathComponents.length == 0) {
                // if we're at the end and we have an exact match we're set
                if(this.exactMatches[top]) {
                    return this.exactMatches[top];
                }
                if(this.subtrees[top] && this.subtrees[top].exactMatches["*"]) {
                    return this.subtrees[top].exactMatches["*"];
                }
            // if we haven't reached the end and have an exact subroute match go for it
            } else if (this.subtrees[top]) {
                return this.subtrees[top].matchPath(pathComponents);
            // if we have a wildcard subroute go down it looking for matches
            } else if(this.subtrees["*"]) {
                const exactWildCardMatch = this.subtrees["*"].matchPath(pathComponents);
                if(exactWildCardMatch) {
                    return exactWildCardMatch;
                }
                // if we do not find a match we want to still look for wildcard at the lowest we dug so continue
            }
        }

        // if something ends with a wild card at the lowest we dug map to that
        return this.exactMatches["*"];
    }

    getPage(pattern) {
        if(pattern.startsWith(this.rootPath)) {
            pattern = pattern.substring(this.rootPath.length);
        }

        if(pattern.startsWith("/")) {
            pattern = pattern.substring(1);
        }

        const pathComponents = pattern.split("/");

        return this.matchPath(pathComponents);
    }

}

module.exports = RoutingTree;