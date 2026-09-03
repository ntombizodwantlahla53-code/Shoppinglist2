import http, { IncomingMessage, ServerResponse } from "http";
import { shoppinglistRouter } from "./routes/shoppinglist.js"


const PORT = 3000;

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url?.startsWith("/shoppinglist")){
        shoppinglistRouter(req, res);
    } else {
        res.writeHead(200, {"content-type": "application/json"})
        res.end(JSON.stringify({message: "Hello world"}));
        }
};

const server = http.createServer(requestListener)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
