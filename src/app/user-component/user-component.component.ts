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

  getList(): FirebaseListObservable<User[]> {
    return this.users;
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
      const pathFirbase = 'CustomerInfo/' + this.deleteKey;
      this.af.object(pathFirbase)
        .remove()
        .then(() => alert('Successful for deleting user'));
      return true;
    }catch (err) {
      console.log(err.message);
      return false;
    }
  }

  keyToEdit(keyparam: string, item: User): string {
    this.editKey = keyparam;
    this.model = Object.assign({}, item);
    console.log(this.model);
    return keyparam;
  }

  updateItem(): User {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    try {
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
          'customerLName': this.model.customerLName,
          'lastUpdate' : this.model.lastUpdate = this.datetime
        })
        .then(() => alert('Successful for updating home user'));
      return  this.model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  addItem(): User {
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
        'customerLName': this.model.customerLName,
        'createdDate': this.model.createdDate = this.datetime,
        'lastUpdate' : this.model.lastUpdate = this.datetime
      })
        .then(
          () => alert('Successful for adding new home user')
        );
      return this.model;
    }catch (err) {
      console.log(err.message);
      return null;
    }
  }

  isEmpty(): boolean {
    if(this.model.customerFName && this.model.customerLName && this.model.city && this.model.province){
      return false;
    }else{
      return true;
    }
  }

  hasNumbers(): boolean {
    return /\d/.test(this.model.customerFName) || /\d/.test(this.model.customerLName)
      || /\d/.test(this.model.city) || /\d/.test(this.model.province);
    }

  clearData(): User {
    this.model = Object.assign({}, null);
    return this.model;
  }

}
