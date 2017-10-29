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
  //
  // it('should create', () => {
  //   expect(true).toBeTruthy();
  // });
  it('should get all lot list', () => {

    expect(component.getLotList()).not.toBeNull();

  });


  it('should check the amount is not positive',() => {

    // amount = 5
    component.lotModel.amount = 5;
    expect(component.isNotPositiveAmount()).toBe(false);

    // amount = 0
    component.lotModel.amount = 0;
    expect(component.isNotPositiveAmount()).toBe(true);

    // amount = -1
    component.lotModel.amount = -1;
    expect(component.isNotPositiveAmount()).toBe(true);

  });

  it('should add new lot', () => {


    // Test case No.1 all input field the result should return undefine
    let MockLot1 = new Lot();
    MockLot1.expiryDate = '20/10/2020';
    MockLot1.qrCode = 'Kitkat,25,';
    MockLot1.amount = 100;
    MockLot1.productID = '-KqnYplgBJ7HB9gAozYv';

    component.lotModel = MockLot1;
    component.date = '2018-07-20';

    let result1 =component.addLot();

    // expect(result1.expiryDate).toBeUndefined();
    // expect(result1.amount).toBeUndefined();
    // expect(result1.qrCode).toBeUndefined();
    // expect(result1.productID).toBeUndefined();
    expect(result1).toBe(true);

    // Test case No.2 missing amount field the result3 should return undefine
    let MockLot2 = new Lot();
    MockLot2.qrCode = 'Kitkat,25,';
    MockLot2.productID = '-KqnYplgBJ7HB9gAozYv';
    component.date = '2018-07-20'
    component.lotModel = MockLot2;

    let result2 =component.addLot();
    expect(result2).toBe(false);

    // Test case No.3 missing productID field the result3 should return undefine
    let MockLot3 = new Lot();
    MockLot3.amount = 100;
    MockLot3.qrCode= 'Kitkat,25,';
    MockLot3.expiryDate= '20/10/2020';
    component.date = '2018-07-20'
    component.lotModel = MockLot3;

    let result3 =component.addLot();
    expect(result3).toBe(false);

    // Test case No.4 missing expirydate field the result3 should return undefine

    let MockLot4 = new Lot();
    MockLot3.amount = 100;
    MockLot3.qrCode= 'Kitkat,25,';
    MockLot3.productID= '-KqnYplgBJ7HB9gAozYv';
    component.date = '2018-07-20'
    component.lotModel = MockLot4;

    let result4 =component.addLot();
    expect(result4).toBe(false);




  });


  //
  // it('should update lot', () => {
  //   component.lotModel.amount=100;
  //   component.lotModel.qrCode = 'Kitkat,25,';
  //   component.lotModel.productID= '-KqnYplgBJ7HB9gAozYv';
  //   //component.date = '2018-07-20';
  //   component.date = '2017-10-03';
  //   let result =component.updateLot();
  //   expect(result).toBe(false);
  //
  //
  // });

  it('should create the qr code', () =>{
    let Lotparam = new Lot();
    Lotparam.productID = '-KqnYplgBJ7HB9gAozYv';
    Lotparam.expiryDate = '20/7/2018';
    Lotparam.amount= 100 ;

    let dummy = component.qenerateQRcode(Lotparam);

    expect(dummy.amount).toBe(100);
    expect(dummy.productID).toBe('-KqnYplgBJ7HB9gAozYv');
    expect(dummy.expiryDate).toBe('20/7/2018');
    //expect(component.qenerateQRcode(Lotparam)).toBe('Kitkat,25,23/9/2017');
  });

  it('should clear the data of lot model', () => {

    component.clearLotData();
    expect(component.lotModel.amount).toBeUndefined();
    expect(component.lotModel.qrCode).toBeUndefined();
    expect(component.lotModel.expiryDate).toBeUndefined();
    expect(component.lotModel.productID).toBeUndefined();
  });

  it('should delete lot ', () =>{
    //component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    component.deleteLotKey='-KqvtS_tBUeNFppzUa-m';
    expect(component.deleteLot()).toBe(true);


  });

  it('should get the key of delete product', () => {
    component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K');
    component.deleteLotKey = '-KujRF6zr-3AtpNnwn0K' ;
    expect(component.keyToDeleteLot('-KujRF6zr-3AtpNnwn0K')).toBe(component.deleteLotKey);


    component.deleteLotKey = '' ;
    expect(component.keyToDeleteLot('')).toBe(component.deleteLotKey);
  })

  it('should create array range',() =>{
    let testCreateRange =component.createRange(16);
    let testArray = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];


    for(let i = 0;i<15;i++){
      expect(testCreateRange[i]).toBe(testArray[i]);
    }


  })

  it('should print the qr code', () => {

    let mockLotModel = new Lot();
    mockLotModel.productID = '-KqnYplgBJ7HB9gAozYv';
    mockLotModel.expiryDate = '23/9/2017';
    mockLotModel.amount= 100 ;
    component.qenerateQRcode(mockLotModel);
    let a = component.print();
    expect(a).toBe(true);

  })
});
