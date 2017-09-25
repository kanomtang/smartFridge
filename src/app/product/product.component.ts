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
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value = 'Turtle';
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
  deleteLotKey: string;
  lotModel = new Lot();
  date: string;
  num: number;

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');
    console.log(this.items);
    this.lots = af.list('/Lots');
    console.log(this.lots);

    this.date = this.getCurrentDate();


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
    if (this.model.ProductName && this.model.Price) {
      return false;
    }else {
      return true;
    }
    // return true;
  }

  amountEmpty(): boolean {
    if (this.lotModel.amount) {
      return false;
    }else{
      return true;
    }
  }

  isNotPositivePrice(): boolean {
    return this.model.Price <= 0;
  }


  keyToAddLot(keyparam: string, item: ProductItem): string {
    this.lotModel.productID = keyparam;
    this.lotModel.lotID = item.ProductName + ',' + item.Price + ',';
    return keyparam;
  }

  addLot(): Lot {
    try {
      this.num = Number(this.date.slice(8, 10));
      this.datetime = this.num + '/';
      this.num = Number(this.date.slice(5, 7));
      this.datetime = this.datetime + this.num + '/';
      this.num = Number(this.date.slice(0, 4));
      this.datetime = this.datetime + this.num;

      // this.lots.push({
      //   'productID': this.lotModel.productID,
      //   'lotID': this.lotModel.lotID + this.datetime,
      //   'expiryDate': this.datetime,
      //   'amount' : this.lotModel.amount
      // })
      //   .then(
      //     () => alert('Successful for adding new lot')
      //
      //   );

        this.lots.push({
        'productID': this.lotModel.productID,
        'lotID': this.lotModel.lotID + this.datetime,
        'expiryDate': this.datetime,
        'amount' : this.lotModel.amount
      })
        .then(
          () => alert('Successful for adding new lot')

        );

      console.log(this.lotModel);

      return this.lotModel;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  updateLot(): boolean {
    let isExist = false;
    let lotKey = '';
    let lotAmount = '';
    this.num = Number(this.date.slice(8, 10));
    this.datetime = this.num + '/';
    this.num = Number(this.date.slice(5, 7));
    this.datetime = this.datetime + this.num + '/';
    this.num = Number(this.date.slice(0, 4));
    this.datetime = this.datetime + this.num;

    this.lots.subscribe(lots => {
      // items is an array
      lots.forEach(lot => {
        //console.log('Lot:', lot);
        if(this.datetime == lot.expiryDate) {
          isExist = true;
          lotKey = lot.$key;
          lotAmount = lot.amount + this.lotModel.amount;
          console.log('key:', lotKey);
        }
      });

    });
    if(isExist){
      try{
        const pathFirebase = 'Lots/' + lotKey;
        this.af.object(pathFirebase)
          .update({'amount': lotAmount})
          .then(() => alert('Successful for Updating Lot'));
      }catch (err) {
        console.log(err.message);
        return false;
      }
    }else{
      this.addLot();
    }

      // if(this.datetime == element[].expiryDate){
      //   isExist = true;
      //   const pathFirebase = 'Lots/' + element.keys();
        // this.af.object(pathFirebase)
        //   .update({'Price': this.model.Price,
        //     'ProductName': this.model.ProductName,
        //     'LastUpdate' : this.model.LastUpdate = this.datetime,
        //     'InUse': this.model.InUse} )
        //   .then(() => alert('Successful for Updating '));
        // return this.model;
      // }

   return false;
  }

  keyToDeleteLot(keyparam: string): string {
    this.deleteLotKey = keyparam;
    return keyparam;
  }

  deleteLot(): boolean {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirebase = 'Lots/' + this.deleteLotKey;
      this.af.object(pathFirebase)
        .remove()
        .then(() => alert('Successful for deleting lot'));
      return true;
    }catch (err) {
      console.log(err.message);
      return false;
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



  qenerateQRcode(lot: Lot): string {
    this.lotModel = Object.assign({}, lot);
    this.value = this.lotModel.lotID;
    return this.value;
  }

  print(): boolean {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
    return true;
  }

  getCurrentDate(): string {
    this.datetime = this.currentDate.getFullYear() + '-';
    if (this.currentDate.getMonth() + 1 < 10) {
      this.datetime = this.datetime + '0' + (this.currentDate.getMonth() + 1) + '-';
    }else {
      this.datetime = this.datetime + (this.currentDate.getMonth() + 1) + '-';
    }
    if (this.currentDate.getDate() < 10) {
      this.datetime = this.datetime + '0' + this.currentDate.getDate();
    }else {
      this.datetime = this.datetime + this.currentDate.getDate();
    }
    return this.datetime;
  }
}
