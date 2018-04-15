class HealthApi {
    getPattern() {
        return "/health";
    }

    get(request) {
        return {
            status: 200,
            headers: [],
            cookies: [],
            body: JSON.stringify({"status":"OK"}),
            contentType: "application/json"
        }
    }
}

module.exports = HealthApi;