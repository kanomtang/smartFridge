import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductItem} from '../shared/ProductItem';
import {Lot} from '../shared/Lot';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() Productanditem: ProductItem;
  title = 'Product ';
  items: FirebaseListObservable<any[]>;
  lots: FirebaseListObservable<any[]>;
  isEdit = true;
  isAdd = false;
  model = new ProductItem();
  currentDate = new Date();
  datetime: string;
  editKey: string;
  deleteKey: string;
  lotModel = new Lot();

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');
    console.log(this.items);
    this.lots = af.list('/Lots');
    console.log(this.lots);
  }
  getList(): FirebaseListObservable<ProductItem[]> {
    return this.items;
  }

  keyToDelete(keyparam: string): string {
    this.deleteKey = keyparam;
    return keyparam;
  }

  deleteItem(): boolean {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirebase = 'ProductInfo/' + this.deleteKey;
      this.af.object(pathFirebase)
        .remove()
        .then(() => alert('Successful for deleting product'));
      return true;
    }catch (err) {
      console.log(err.message);
      return false;
    }
  }

  keyToEdit(keyparam: string, item: ProductItem): string {
    this.editKey = keyparam;
    this.model = Object.assign({}, item);
    console.log(this.model);
    return keyparam;
  }

  updateItem(): ProductItem {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try {
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();
      const pathFirebase = 'ProductInfo/' + this.editKey;
      this.af.object(pathFirebase)
        .update({'Price': this.model.Price,
          'ProductName': this.model.ProductName,
          'LastUpdate' : this.model.LastUpdate = this.datetime,
          'InUse': this.model.InUse} )
        .then(() => alert('Successful for Updating '));
      return this.model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  addItem(): ProductItem {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    try {
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();
      this.items.push({
        'InUse': this.model.InUse = true,
        'Price': this.model.Price,
        'ProductName': this.model.ProductName,
        'CreatedDate': this.model.CreatedDate = this.datetime,
        'LastUpdate' : this.model.LastUpdate = this.datetime
      })
        .then(
          () => alert('Successful for adding new item')
        );
      return this.model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  isEmpty(): boolean {
    if (this.model.ProductName && this.model.Price){
      return false;
    }else {
      return true;
    }
    // return true;
  }

  isNotPositivePrice(): boolean {
    return this.model.Price <= 0;
  }


  keyToAddLot(keyparam: string): string {
    this.lotModel.productID = keyparam;
    return keyparam;
  }

  addLot(): Lot {
    try {
      this.lots.push({
        'productID': this.lotModel.productID,
        'lotID': this.lotModel.lotID = '-',
        'expiryDate': this.lotModel.expiryDate,
        'amount' : this.lotModel.amount
      })
        .then(
          () => alert('Successful for adding new lot')
        );
      return this.lotModel;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }


  clearData(): ProductItem {
    this.model = Object.assign({}, null);
    return this.model;
  }

  clearLotData(): Lot {
    this.lotModel = Object.assign({}, null);
    return this.lotModel;
  }

}
