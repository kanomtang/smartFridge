import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {User} from '../shared/User';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent {
  @Input() User: User;
  title = 'Home User ';
  users: FirebaseListObservable<User[]>;
  user: FirebaseObjectObservable<any>;
  isEdit = true;
  isAdd = false;
  model = new User();
  currentDate = new Date();
  datetime: string;
  editKey: string;
  deleteKey: string;


  constructor(private af: AngularFireDatabase) {
    this.users = af.list('/CustomerInfo');
    console.log(this.users);

  }

  deleteItem(): string {
    // delete single item
    // the first slot is path or child
    // the second is key
    try {
      const pathFirbase = 'CustomerInfo/' + this.deleteKey;
      this.af.object(pathFirbase)
        .remove()
        .then(() => alert('Successful for deleting user'));
      return this.deleteKey + 'has been delete';
    }catch (err) {
      return 'error';
    }

  }

  updateItem(): string {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try {
      this.onEdit();
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();
      const pathFirebase = 'CustomerInfo/' + this.editKey;
      this.af.object(pathFirebase)
        .update({
          'city': this.model.city,
          'province': this.model.province,
          'customerFName': this.model.customerFName,
          'customerLName': this.model.customerLName} )
        .then(() => alert('Successful for Updating '));
      this.editKey = null;
      return  this.model.customerFName + 'has been update';
    }catch (err) {
      return 'error';
    }
  }

  addItem(): string {
    //  อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    try {
      this.datetime = this.currentDate.getDate() + '/'
        + (this.currentDate.getMonth() + 1 ) + '/'
        + this.currentDate.getFullYear() + ' @ '
        + this.currentDate.getHours() + ':'
        + this.currentDate.getMinutes() + ':'
        + this.currentDate.getSeconds();

      this.users.push({
        'city': this.model.city,
        'province': this.model.province,
        'customerFName': this.model.customerFName,
        'customerLName': this.model.customerLName
      })
        .then(
          () => alert('Successful for adding new Customer')
        );
      this.model.city = null;
      this.model.province = null;
      this.model.customerLName = null;
      this.model.customerFName = null;
      this.onAdding();
      return 'user has been added';
    }catch (err) {
      return 'error';
    }
  }


  onEdit(): string {
    // this method for change the state of isEdit that can disabled the button Edit or Save
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      return 'isEdit = true';
    }
    return 'isEdit = false';
  }

  onAdding(): string {
    // this method for enable the user to adding the new product
    if (this.isAdd === true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
      return 'isAdd = true';
    }
    return 'isAdd = false';
  }

  //
  // openToEdit(keyparam: string): string {
  //   this.onEdit();
  //   this.editKey = keyparam;
  //
  //   return 'editKey=' + keyparam;
  // }

  keyToEdit(keyparam: string, item: User) {
    this.editKey = keyparam;
    this.model = Object.assign({}, item);
    console.log(this.model);
  }

  keyToDelete(keyparam: string) {
    this.deleteKey = keyparam;
  }

  isEmpty(){
    return this.model.customerFName && this.model.customerLName && this.model.city && this.model.province;
  }

  clearData(){
    this.model = Object.assign({}, null);
  }

}
