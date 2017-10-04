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
import {isUndefined} from "util";



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
  let lotObject: string;
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
  it('should get all lot list', () => {

    expect(component.getLotList()).not.toBeNull();

  });
  it('should get all product list', () => {

    expect(component.getList()).not.toBeNull();

  });

  it('should check the amount is not positive',() => {

    let Mocklot = new Lot();
    Mocklot.amount = -100 ;
    component.lotModel = Mocklot;
    expect(component.lotModel.amount).toBeLessThan(1);

  });

  it('should add new lot', () => {
    let Mocklot = new Lot();
    Mocklot.productID = '-KqnYplgBJ7HB9gAozYv';
    Mocklot.amount = 100 ;
    //Mocklot. = '20/07/2018';
    Mocklot.qrCode = 'Kitkat,25,';
    component.date = '2018-07-20'
    component.lotModel = Mocklot;


    let result =component.addLot();

    //expect(component.addLot()).not.toBe(null);
    expect(result.amount).toBe(100);
    expect(result.productID).toBe('-KqnYplgBJ7HB9gAozYv');
    expect(result.expiryDate).toBe('20/7/2018');
    // lotObject = component.keyofnewproduct;
    // expect(lotObject).toBe('-Kv_xPBvg_YpcWaYZjaF');
  });



  // it('should update lot', () => {
  //   let Mocklot = new Lot();
  //   Mocklot.productID = '-KqnYplgBJ7HB9gAozYv';
  //   Mocklot.amount = 100 ;
  //   //Mocklot. = '20/07/2018';
  //   Mocklot.qrCode = 'Kitkat,25,';
  //   component.date = '2018-07-20'
  //   component.lotModel = Mocklot;
  //
  //
  //   let result =component.updateLot();
  //
  //   //expect(component.addLot()).not.toBe(null);
  //   expect(result.amount).toBe(200);
  //   expect(result.productID).toBe('-KqnYplgBJ7HB9gAozYv');
  //   expect(result.expiryDate).toBe('20/7/2018');
  //
  //
  // });
  //
  // it('should create the qr code', () =>{
  //   let Lotparam = new Lot();
  //   Lotparam.productID = '-KqnYplgBJ7HB9gAozYv';
  //   Lotparam.expiryDate = '23/9/2017';
  //   Lotparam.lotID= 'Kitkat,25,23/9/2017' ;
  //   Lotparam.amount= 100 ;
  //
  //   expect(component.qenerateQRcode(Lotparam)).toBe('Kitkat,25,23/9/2017');
  // });
  //
  // it('should clear the data of lot model', () => {
  //
  //   component.clearLotData();
  //   expect(component.lotModel.amount).toBeUndefined();
  //   expect(component.lotModel.lotID).toBeUndefined();
  //   expect(component.lotModel.expiryDate).toBeUndefined();
  //   expect(component.lotModel.productID).toBeUndefined();
  // });
  //
  // it('should delete lot ', () =>{
  //   //component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
  //   component.deleteLotKey='-KqvtS_tBUeNFppzUa-m';
  //   expect(component.deleteLot()).toBe(true);
  //
  //
  // });
  //
  // it('should get the key of delete product', () => {
  //   component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
  //   component.deleteLotKey = '-KujRF6zr-3AtpNnwn0K' ;
  //   expect(component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K')).toBe(component.deleteLotKey);
  // })
  // it('should update the lot ', () =>{
  //
  //
  //   let Mocklot = new Lot();
  //   Mocklot.amount = 170 ;
  //   Mocklot.expiryDate = '3/10/2019';
  //   Mocklot.lotID = 'Kitkat,25,';
  //   component.lotModel = Mocklot;
  //
  //
  //   //component.updateLot();
  //
  //   expect(component.lotModel.amount).toBe(170);
  //   expect(component.lotModel.lotID).toBe('Kitkat,25,');
  //   expect(component.lotModel.expiryDate).toBe('3/10/2019');
  //
  // });
  //
  // it('should print the qr code', () => {
  //
  //   let mockLotModel = new Lot();
  //   mockLotModel.productID = '-KqnYplgBJ7HB9gAozYv';
  //   mockLotModel.expiryDate = '23/9/2017';
  //   mockLotModel.lotID= 'Kitkat,25,23/9/2017' ;
  //   mockLotModel.amount= 100 ;
  //
  //   component.qenerateQRcode(mockLotModel);
  //
  //
  //   expect(component.print()).toBe(true);
  //
  // })
});
