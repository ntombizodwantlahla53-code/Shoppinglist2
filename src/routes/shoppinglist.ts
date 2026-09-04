import http, { IncomingMessage, ServerResponse } from "http";
import { getShoppingList, getShoppingListItemById, addShoppingListItem ,deleteShoppingListItem} from "../controllers/shoppinglist.js";
    
} from "../controllers/shoppinglist.js";

export const shoppinglistRouter = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith("/shoppinglist")) {
        const parts = req.url.split("/");

        const id = parts[2] ? parseInt(parts[2]) : undefined;
        if (req.method === "GET" && !id) {
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify(getShoppingList()))
            return;
        }
        if (req.method === "GET" && id) {
            if(isNaN(id)){
                res.writeHead(400, {"content-type": "äpplication/json"})
                res.end(JSON.stringify({error: "invalid item id"}));
                return:
            }
            const item = getShoppingListItemById(id)
            if (!item){
                res.writeHead(404, {"content-type": "application/json"})
                res.end(JSON.stringify({error: "item not found"}))
            }
            res.writeHead(200, {"content-type": "application/json"});
            res.end(JSON.stringify(item));
            return;
        }
        if (req.method === "POST") {
            let body ="";
            req.on("data", (chunk)  => {
                body += chunk.toString();
            });

            req.on('end', () => {
            
            try{
                const {name, quantity, purchased} =JSON.parse(body)
                if(!name || typeof name !== "string"){
                    res.writeHead(400,  {"content-type": "application/json"});
                    res.end(JSON.stringify({error: "item name is required"}));
                    return;

                }
                if(!quantity || typeof quantity !== "number"){
                    res.writeHead(400,  {"content-type": "application/json"});
                    res.end(JSON.stringify({error: "quantity is required"}));
                    return;
                }
                if(!purchased || typeof purchased !== "boolean"){
                    res.writeHead(400,  {"content-type": "application/json"});
                    res.end(JSON.stringify({error: "purchased is required"}));
                    return;
                        }
                const newShoppinglistitem = addShoppingListItem(name, quantity, purchased)
            res.writeHead(201, {"content-type": "application/json"});
            res.end(JSON.stringify(newShoppinglistitem));
            } catch (error){
                res.writeHead(400,  {"content-type": "application/json"});
                res.end(JSON.stringify({error: "invalid JSON payload"}));
            }
            });
            return;
        }
        res.writeHead(405, {"content-type": "application/json"});
        res.end(JSON.stringify({error: "method not allowed on/itemslist"}));
    }
}
