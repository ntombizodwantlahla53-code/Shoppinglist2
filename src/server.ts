import http = require("http");


const PORT = 9000;

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.writeHead(200, {"content-type": "application/json"})
    res.end(JSON.stringify({message: "Hello World"}))
};

const server = http.createServer(requestListener)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});