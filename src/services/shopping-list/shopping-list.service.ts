import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Item } from "../../Models/item/item";

@Injectable()
export class ShoppingListService{

    private shoppingListref = this.db.list<Item>('shopping-list');

    constructor(private db: AngularFireDatabase){

    }

    getShoppingList(){
        return this.shoppingListref;
    }

    addItem(item: Item){
        return this.shoppingListref.push(item);
    }

    editItem(item:Item){
        return this.shoppingListref.update(item.key,item);
    }
    
    removeItem(item:Item){
        return this.shoppingListref.remove(item.key);
    }
}