import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import {User} from '../shared/user';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html'
})
export class UserComponentComponent {
  title = 'Home User ';
  users: FirebaseListObservable<any[]>;
  user

  isEdit = true;
  isAdd = false;
  model = new User();
  currentdate = new Date();
  datetime: string;
  editKey: string;



  constructor(private af: AngularFireDatabase) {
    this.users = af.list('/CustomerInfo');

  }

  deleteItem(keyparam: string): void {
    // delete single item
    // the first slot is path or child
    // the second is key
    const pathFirbase = 'CustomerInfo/' + keyparam;
    this.af.object(pathFirbase)
      .remove()
      .then(() => alert('Successful for deleting item key'));

  }

  updateItem(keyparam: string): void {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    this.onEdit();
    this.datetime = this.currentdate.getDate() + '/'
      + (this.currentdate.getMonth() + 1 ) + '/'
      + this.currentdate.getFullYear() + ' @ '
      + this.currentdate.getHours() + ':'
      + this.currentdate.getMinutes() + ':'
      + this.currentdate.getSeconds();
    const pathFirebase = 'ProductInfo/' + keyparam;
    this.af.object(pathFirebase)
      .update({
        'City': this.model.City,

        'Province': this.model.Province,


        'CustomerFName': this.model.CustomerFName,
        'CustomerLname': this.model.CustomerLName} )
      .then(() => alert('Successful for Updating '));
    this.editKey = null;
  }

  addItem(key: string): void {
    //  อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate

    this.datetime = this.currentdate.getDate() + '/'
      + (this.currentdate.getMonth() + 1 ) + '/'
      + this.currentdate.getFullYear() + ' @ '
      + this.currentdate.getHours() + ':'
      + this.currentdate.getMinutes() + ':'
      + this.currentdate.getSeconds();

    this.users.push({
      'City': this.model.City,

      'Province': this.model.Province,



      'CustomerFName': this.model.CustomerFName,
      'CustomerLName': this.model.CustomerLName
    })
      .then(
        () => alert('Successful for adding new Customer')
      );
    this.model.City = null;
    this.model.Province = null;
    this.model.CustomerLName = null;
    this.model.CustomerFName= null;
    this.onAdding();
  }




  onEdit(): void {
    // this method for change the state of isEdit that can disabled the button Edit or Save
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  onAdding(): void {
    // this method for enable the user to adding the new product
    if (this.isAdd === true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
    }
  }
  openToEdit(keyparam: string): void {
    this.onEdit();
    this.editKey = keyparam;
  }


}
