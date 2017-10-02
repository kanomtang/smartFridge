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
  @Input() private _Productanditem: ProductItem;
  private _elementType: 'url' | 'canvas' | 'img' = 'url';
  private _value = 'Turtle';
  private _items: FirebaseListObservable<any[]>;
  private _lots: FirebaseListObservable<any[]>;
  private _model = new ProductItem();
  private _currentDate = new Date();
  private _datetime: string;
  private _editKey: string;
  private _deleteKey: string;
  private _deleteLotKey: string;
  private _lotModel = new Lot();
  private _date: string;
  private _num: number;


  constructor(private af: AngularFireDatabase) {
    this._items = af.list('/ProductInfo');
    console.log(this._items);
    this._lots = af.list('/Lots');
    console.log(this._lots);

    this._date = this.getCurrentDate();


  }
  getList(): FirebaseListObservable<ProductItem[]> {
    return this._items;
  }

  keyToDelete(keyparam: string): string {
    this._deleteKey = keyparam;
    return keyparam;
  }

  deleteItem(): boolean {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirebase = 'ProductInfo/' + this._deleteKey;
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
    this._editKey = keyparam;
    this._model = Object.assign({}, item);
    console.log(this._model);
    return keyparam;
  }

  updateItem(): ProductItem {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try {
      this._datetime = this._currentDate.getDate() + '/'
        + (this._currentDate.getMonth() + 1 ) + '/'
        + this._currentDate.getFullYear() + ' @ '
        + this._currentDate.getHours() + ':'
        + this._currentDate.getMinutes() + ':'
        + this._currentDate.getSeconds();
      const pathFirebase = 'ProductInfo/' + this._editKey;
      this.af.object(pathFirebase)
        .update({'Price': this._model.Price,
          'ProductName': this._model.ProductName,
          'LastUpdate' : this._model.LastUpdate = this._datetime,
          'InUse': this._model.InUse} )
        .then(() => alert('Successful for Updating '));

      return this._model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  addItem(): ProductItem {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    try {
      this._datetime = this._currentDate.getDate() + '/'
        + (this._currentDate.getMonth() + 1 ) + '/'
        + this._currentDate.getFullYear() + ' @ '
        + this._currentDate.getHours() + ':'
        + this._currentDate.getMinutes() + ':'
        + this._currentDate.getSeconds();
      this._items.push({
        'InUse': this._model.InUse = true,
        'Price': this._model.Price,
        'ProductName': this._model.ProductName,
        'CreatedDate': this._model.CreatedDate = this._datetime,
        'LastUpdate' : this._model.LastUpdate = this._datetime
      })
        .then(
          () => alert('Successful for adding new item')
        );
      return this._model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  isEmpty(): boolean {
    if (this._model.ProductName && this._model.Price) {
      return false;
    }else {
      return true;
    }
    // return true;
  }

  clearData(): ProductItem {
    this._model = Object.assign({}, null);
    return this._model;
  }

  //Progress2

  getLotList(): FirebaseListObservable<Lot[]> {
    return this._lots;
  }

  amountEmpty(): boolean {
    if (this._lotModel.amount) {
      return false;
    }else{
      return true;
    }
  }

  isNotPositiveAmount(): boolean {
    return this._lotModel.amount <= 0;
  }

  isNotPositivePrice(): boolean {
    return this._model.Price <= 0;
  }


  keyToAddLot(keyparam: string, item: ProductItem): string {
    this._lotModel.productID = keyparam;
    this._lotModel.lotID = item.ProductName + ',' + item.Price + ',';
    return keyparam;
  }

  addLot(): Lot {
    try {
      this._num = Number(this._date.slice(8, 10));
      this._datetime = this._num + '/';
      this._num = Number(this._date.slice(5, 7));
      this._datetime = this._datetime + this._num + '/';
      this._num = Number(this._date.slice(0, 4));
      this._datetime = this._datetime + this._num;

        this._lots.push({
        'productID': this._lotModel.productID,
        'lotID': this._lotModel.lotID + this._datetime,
        'expiryDate': this._datetime,
        'amount' : this._lotModel.amount
      })
        .then(
          () => alert('Successful for adding new lot')

        );




      return this._lotModel;

    }catch (err) {
      console.log(err.message);
      return null;

    }
  }

  updateLot(): Lot {
    let isExist = false;
    let lotKey = '';
    let lotAmount = '';
    this._num = Number(this._date.slice(8, 10));
    this._datetime = this._num + '/';
    this._num = Number(this._date.slice(5, 7));
    this._datetime = this._datetime + this._num + '/';
    this._num = Number(this._date.slice(0, 4));
    this._datetime = this._datetime + this._num;

    this._lots.subscribe(lots => {
      // items is an array
      lots.forEach(lot => {
        //console.log('Lot:', lot);
        if(this._datetime == lot.expiryDate) {
          isExist = true;
          lotKey = lot.$key;
          lotAmount = lot.amount + this._lotModel.amount;
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
        return this._lotModel;
      }
    }else{
      return this.addLot();
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
  }

  keyToDeleteLot(keyparam: string): string {
    this._deleteLotKey = keyparam;
    return keyparam;
  }

  deleteLot(): boolean {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirebase = 'Lots/' + this._deleteLotKey;
      this.af.object(pathFirebase)
        .remove()
        .then(() => alert('Successful for deleting lot'));
      return true;
    }catch (err) {
      console.log(err.message);
      return false;
    }
  }


  clearLotData(): Lot {
    this._lotModel = Object.assign({}, null);
    return this._lotModel;
  }



  qenerateQRcode(lot: Lot): string {
    this._lotModel = Object.assign({}, lot);
    this._value = this._lotModel.lotID;
    return this._value;
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
    this._datetime = this._currentDate.getFullYear() + '-';
    if (this._currentDate.getMonth() + 1 < 10) {
      this._datetime = this._datetime + '0' + (this._currentDate.getMonth() + 1) + '-';
    }else {
      this._datetime = this._datetime + (this._currentDate.getMonth() + 1) + '-';
    }
    if (this._currentDate.getDate() < 10) {
      this._datetime = this._datetime + '0' + this._currentDate.getDate();
    }else {
      this._datetime = this._datetime + this._currentDate.getDate();
    }
    return this._datetime;
  }
  // getter setter


  get Productanditem(): ProductItem {
    return this._Productanditem;
  }

  set Productanditem(value: ProductItem) {
    this._Productanditem = value;
  }

  get elementType() {
    return this._elementType;
  }

  set elementType(value) {
    this._elementType = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get items(): FirebaseListObservable<any[]> {
    return this._items;
  }

  set items(value: FirebaseListObservable<any[]>) {
    this._items = value;
  }

  get lots(): FirebaseListObservable<any[]> {
    return this._lots;
  }

  set lots(value: FirebaseListObservable<any[]>) {
    this._lots = value;
  }

  get model(): ProductItem {
    return this._model;
  }

  set model(value: ProductItem) {
    this._model = value;
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  set currentDate(value: Date) {
    this._currentDate = value;
  }

  get datetime(): string {
    return this._datetime;
  }

  set datetime(value: string) {
    this._datetime = value;
  }

  get editKey(): string {
    return this._editKey;
  }

  set editKey(value: string) {
    this._editKey = value;
  }

  get deleteKey(): string {
    return this._deleteKey;
  }

  set deleteKey(value: string) {
    this._deleteKey = value;
  }

  get deleteLotKey(): string {
    return this._deleteLotKey;
  }

  set deleteLotKey(value: string) {
    this._deleteLotKey = value;
  }

  get lotModel(): Lot {
    return this._lotModel;
  }

  set lotModel(value: Lot) {
    this._lotModel = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get num(): number {
    return this._num;
  }

  set num(value: number) {
    this._num = value;
  }

}
