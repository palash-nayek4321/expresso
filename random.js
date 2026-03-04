const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    // parse the URL
    //re.url , req.method
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    switch (pathname) {

        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });

            // if name exists in query
            if (query.name) {
                res.end(`<h1>Hello ${query.name}</h1>`);
            } else {
                res.end("<h1>Hello Guest palash</h1>");
            }
            break;

        case "/about":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>About </h1>");
            break;

        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Page Not Found</h1>");
    }

});

server.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});