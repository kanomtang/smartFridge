import {Component, Input} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductItem} from '../shared/ProductItem';


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

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');

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
     // this.items.push({
     //   'CreatedDate': '1/07/2017',
     //   'ExpiryDate': '19/07/2017',
     //   'InUse': 'Active',
     //   'Price': 20,
     //   'ProductID': 'ISR-1',
     //   'ProductName': 'Testo',
     //   'QRCode': 'dfdasfdsfdsf'
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
