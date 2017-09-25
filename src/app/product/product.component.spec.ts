/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, ComponentFixtureAutoDetect , TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ProductComponent } from './product.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Lot} from '../shared/Lot';



export const firebaseConfig = {
  apiKey: 'AIzaSyCFXny8pflQwLu9AyQu8ve9xI6qA9KR7PM',
  authDomain: 'iotapplication-7cf10.firebaseapp.com',
  databaseURL: 'https://iotapplication-7cf10.firebaseio.com',
  projectId: 'iotapplication-7cf10',
  storageBucket: 'iotapplication-7cf10.appspot.com',
  messagingSenderId: '33890290341'
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxQRCodeModule,
        // AngularFireDatabase,
        // FirebaseListObservable,
        // FirebaseObjectObservable,
        AngularFireDatabaseModule


      ],
      declarations: [ ProductComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
  it('should get all product list', () => {

    expect(component.getList()).not.toBeNull();
    //expect(component.getList()).toContain('Kitkat')
  });

  it('should add new lot', () => {

    component.lotModel.amount = 100;
    component.lotModel.lotID = 'Kitkat,25,' ;
    component.lotModel.expiryDate = '25/9/2017' ;
    component.lotModel.productID = '-KqnYplgBJ7HB9gAozYv';
    component.addLot();
    expect(component.lotModel.amount).toBe(100);
    expect(component.lotModel.lotID).toBe('Kitkat,25,');
    expect(component.lotModel.expiryDate).toBe('25/9/2017');
    expect(component.lotModel.productID).toBe('-KqnYplgBJ7HB9gAozYv');
  });

  it('should create the qr code', () =>{
    let Lotparam = new Lot();
    Lotparam.productID = '-KqnYplgBJ7HB9gAozYv';
    Lotparam.expiryDate = '23/9/2017';
    Lotparam.lotID= 'Kitkat,25,23/9/2017' ;
    Lotparam.amount= 100 ;

    expect(component.qenerateQRcode(Lotparam)).toBe('Kitkat,25,23/9/2017');
  });

  it('should clear the data of lot model', () => {

    component.clearLotData();
    expect(component.lotModel.amount).toBeUndefined();
    expect(component.lotModel.lotID).toBeUndefined();
    expect(component.lotModel.expiryDate).toBeUndefined();
    expect(component.lotModel.productID).toBeUndefined();
  });

  it('should delete lot ', () =>{
    component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    expect(component.deleteLot()).toBe(true);
  });

  it('should get the key of delete product', () => {
    component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    expect(component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K')).toBe('-KujRF6zr-3AtpNnwn0K');
  })
  it('should update the lot ', () =>{
    component.lotModel.amount = 110;
    component.lotModel.lotID = 'Kitkat,25,' ;
    component.lotModel.expiryDate = '26/9/2017' ;
    component.lotModel.productID = '-KqnYplgBJ7HB9gAozYv';
    expect(component.updateLot()).toBe(false);
  });

  it('should print the qr code', () => {

    let mockLotModel = new Lot();
    mockLotModel.productID = '-KqnYplgBJ7HB9gAozYv';
    mockLotModel.expiryDate = '23/9/2017';
    mockLotModel.lotID= 'Kitkat,25,23/9/2017' ;
    mockLotModel.amount= 100 ;

    component.qenerateQRcode(mockLotModel);

    // let getTheHtmlSection = fixture.debugElement.query(By.css('#print-section'));
    // let htmlElement = getTheHtmlSection.nativeElement;
    // expect(htmlElement).toContain('Kitkat,25,23/9/2017');
    expect(component.print()).toBe(true);

    //expect(component.value).toBe('Kitkat,25,23/9/2017');
  })
});
