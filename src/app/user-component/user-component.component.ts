import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductItem} from '../shared/ProductItem';


@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html'
})
export class UserComponentComponent {
  @Input() Productanditem: ProductItem;
  title = 'Home User ';
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;

  isEdit = true;

  constructor(private af: AngularFireDatabase) {
    this.users = af.list('/CustomerInfo');

  }

  deleteItem(keyparam: string): void {
    // delete single item
    // the first slot is path or child
    // the second is key
    const pathFirbase = 'Item/' + keyparam;
    this.af.object(pathFirbase)
      .remove()
      .then(() => alert('Successful for deleting item key'));

  }

  updateItem(key: string): void {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    this.onEdit();
  }

  addItem(key: string): void {
    //  อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    // this.users.push({'CustomerAddress': { 'City': ' Amphoe Mueang Chiang Mai ', 'Country' : 'Thailand',
    // 'HomeNo': 2321,
    //   'PostCode': 50000,
    //    'Province': 'Chiang Mai',
    //   'Road': 'Nimman'
    // },
    // 'CustomerID': 2,
    // 'CustomerName': 'Angelina'
    // })
    //   .then(
    //     () => alert('Successful for adding new item')
    //   );
    this.onEdit();
  }



  onEdit(): void {
    // this method for change the state of isEdit that can disabled the button Edit or Save
    if (this.isEdit === true) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

}
