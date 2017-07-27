import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductItem} from '../shared/ProductItem';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() Productanditem: ProductItem;
  title = 'Product ';
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any>;
  isEdit = true;
  isAdd = false;
  model = new ProductItem();
  currentdate = new Date();
  datetime: string;
  editKey: string;

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');

  }

  deleteItem(keyparam: string): string {
    // delete single item
    // the first slot is path or child
    // the second is key
    try{
      const pathFirebase = 'ProductInfo/' + keyparam;
      this.af.object(pathFirebase)
        .remove()
        .then(() => alert('Successful for deleting item '));

      return keyparam + 'has been deleted'
    }catch (err) {
      return 'error'
    }
  }

  updateItem(keyparam: string): string {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try{
      this.onEdit();
      this.datetime = this.currentdate.getDate() + '/'
        + (this.currentdate.getMonth() + 1 ) + '/'
        + this.currentdate.getFullYear() + ' @ '
        + this.currentdate.getHours() + ':'
        + this.currentdate.getMinutes() + ':'
        + this.currentdate.getSeconds();
      const pathFirebase = 'ProductInfo/' + keyparam;
      this.af.object(pathFirebase)
        .update({'Price': this.model.Price,

          'ProductName': this.model.ProductName,
          'LastUpdate' : this.model.LastUpdate = this.datetime,
          'InUse': this.model.InUse} )
        .then(() => alert('Successful for Updating '));
      this.editKey = null;

      return keyparam + 'has been update'
    }catch (err) {
      return 'error'
    }
  }

  addItem(): string {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    try{
      this.datetime = this.currentdate.getDate() + '/'
        + (this.currentdate.getMonth() + 1 ) + '/'
        + this.currentdate.getFullYear() + ' @ '
        + this.currentdate.getHours() + ':'
        + this.currentdate.getMinutes() + ':'
        + this.currentdate.getSeconds();

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
      this.model.InUse= null;
      this.model.ProductName = null;
      this.model.Price = null;
      this.model.CreatedDate= null;
      this.onAdding();
      return   'item has been added'
    }catch (err) {
      return 'error'
    }
  }


  onEdit(): string {
    // this method for change the state of isEdit that can disabled the button Edit or Save
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      return 'isEdit = true'
    }
    return 'isEdit = false'
  }

  onAdding(): string {
    // this method for enable the user to adding the new product
    if (this.isAdd === true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
      return 'isAdd = true'
    }
    return 'isAdd = false'
  }



  openToEdit(keyparam: string): string {
    this.onEdit();
    this.editKey = keyparam;

    return 'editKey=' + keyparam;
  }



}
