import type{ ShoppingListItem } from "../types/shoppinglist.js";

let shoppingList: ShoppingListItem[] = [];

let currentId = 0;

export const getShoppingList = (): ShoppingListItem[] => {
    return shoppingList;
};

export const getShoppingListItemById = (id: number): ShoppingListItem | undefined => {
    const item = shoppingList.find((item) => item.id === id);
    return item;
}

export const addShoppingListItem = (name: string, quantity: number, purchased: boolean): ShoppingListItem => {
    const newItem: ShoppingListItem = {
        id: ++currentId,
        name,
        quantity,
        purchased,
    };
    shoppingList.push(newItem);
    return newItem;
}
export const deleteShoppingListItem = (id: number): ShoppingListItem | undefined => {
    const itemIndex = shoppingList.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
        return undefined;
    }

    const deletedItem = shoppingList.splice(itemIndex, 1)[0];
    return deletedItem;
};
export const updateShoppingListItem = (id: number, updates: Partial<Omit<ShoppingListItem, "id">>): ShoppingListItem | undefined =>{
    const item = getShoppingListItemById(id);
    if(!item) return undefined;
    if(updates.name !== undefined) item.name = updates.name;
    if(updates.purchased !== undefined) item.purchased = updates.purchased;
    if(updates.quantity !== undefined) item.quantity = updates.quantity;

    return item;
}
    
