import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../Models/item/item';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { ToastService } from '../../services/toast/toast.service';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingList$: Observable<Item[]>;
  item: Item;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private shopping: ShoppingListService,
    public actionsheetCtrl: ActionSheetController,
    private toast: ToastService) {
    this.shoppingList$ = this.shopping
      .getShoppingList() // DB List
      .snapshotChanges() // Snapshot changes for both key and value or ValueChanges for only values
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }))
      });
  }

  openmenuOptions(item: Item) {
    let actionSheet = this.actionsheetCtrl.create({
      title: "Modify Items",
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shopping.removeItem(item)
              .then(() => {
                this.toast.show(`${item.name} deleted`);
                this.navCtrl.setRoot('HomePage');
                console.log('Delete clicked');
              })
          }
        },
        {
          text: 'Edit',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, {
              item:item
            });
            console.log('Edit clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    actionSheet.present();
  }

}
