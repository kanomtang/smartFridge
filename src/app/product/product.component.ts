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
  isAdd = false;
  model=  new ProductItem();

  constructor(private af: AngularFireDatabase) {
    this.items = af.list('/ProductInfo');

  }

  deleteItem(keyparam: string): void {
    // delete single item
    // the first slot is path or child
    // the second is key
    const pathFirebase = 'ProductInfo/' + keyparam;
    this.af.object(pathFirebase)
      .remove()
      .then(() => alert('Successful for deleting item key'));

  }

  updateItem(key: string): void {
    // this.af.object('Item/{key}').update({'name': 'Jasmine' } );
    this.onEdit();
  }

  addItem(): void {
    //   อาจจะรับมาเป็น Product type ในหน้า html คงเป็น item  จสกนนั้นใน method ก็เขียนว่า 'CreatedDate' : productparam.CreatedDate
    this.items.push({
      'InUse': this.model.InUse = true,
      'Price': this.model.Price,
      'ProductID': this.model.ProductID,
      'ProductName': this.model.ProductName
    })
      .then(
        () => alert('Successful for adding new item')
      );
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

  onAdding(): void {
    // this method for enable the user to adding the new product
    if (this.isAdd === true) {
      this.isAdd = false;
    } else {
      this.isAdd = true;
    }
  }
  testCreate(): void {
    this.items.push({'ProductName': this.model.ProductName, 'Price': this.model.Price})
      .then(
        () => alert('Success for adding new product')
      );
    this.onAdding();
  }


}
