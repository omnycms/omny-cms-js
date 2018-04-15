const RoutingTree = require("../src/apis/util/RoutingTree");

const assert = require("assert");

describe("Routes", function() {
    describe("wildcards()", function() {
        const blogPostPattern = "/blogs/{id}/posts/{postId}";
        const blogPattern = "/blogs/*"
        it("should return the specific match when the right format is given", function() {
            const url = "/blogs/a/posts/b";
            const routingTree = new RoutingTree("");
            const expected = "hello";
            const bad = "goodbye";

            routingTree.addPagePattern(expected, blogPostPattern);
            routingTree.addPagePattern(bad, blogPattern);
            const result = routingTree.getPage(url);
            assert.equal(result, expected);
         });

         it("should return the gemeral match when the right format is given", function() {
            const url = "/blogs/a/b/c";
            const routingTree = new RoutingTree("");
            const blogPost = "hello";
            const blog = "goodbye";

            routingTree.addPagePattern(blogPost, blogPostPattern);
            routingTree.addPagePattern(blog, blogPattern);
            const result = routingTree.getPage(url);
            assert.equal(result, blog);
         });
    });
});