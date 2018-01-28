class BlogApi {
    getPattern() {
        return "/blogs/*";
    }

    get(request) {
        return {
            status: 200,
            headers: [],
            cookies: [],
            body: JSON.stringify({"a":"b"}),
            contentType: "application/json"
        }
    }
}

module.exports = BlogApi;