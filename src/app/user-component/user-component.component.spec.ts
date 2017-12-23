/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';


import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import {FormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {UserComponentComponent} from './user-component.component';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Lot} from '../shared/Lot';
import {isUndefined} from "util";
import {User} from '../shared/User';


export const firebaseConfig = {
  apiKey: 'AIzaSyCFXny8pflQwLu9AyQu8ve9xI6qA9KR7PM',
  authDomain: 'iotapplication-7cf10.firebaseapp.com',
  databaseURL: 'https://iotapplication-7cf10.firebaseio.com',
  projectId: 'iotapplication-7cf10',
  storageBucket: 'iotapplication-7cf10.appspot.com',
  messagingSenderId: '33890290341'
};

describe('ProductComponent', () => {
  let component: UserComponentComponent;
  let fixture: ComponentFixture<UserComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [

        FormsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgxQRCodeModule,
        AngularFireDatabaseModule


      ],
      declarations: [UserComponentComponent],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(UserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should get all lot list', () => {

    expect(component.getList()).not.toBeNull();

  });

  it('should get the key delete ', () => {
    const result = component.keyToDelete('-KqsdvkRWQAy6-yydmId');
    expect(result).toBe('-KqsdvkRWQAy6-yydmId');
  });
  it('should delete item', () => {
    component.keyToDelete('-KqsdvkRWQAy6-yydmId');
    const result = component.deleteItem();
    expect(result).toBe(true);
  });
  it('should get the key of edit', () => {
    const newuser = new User();
    newuser.province = 'Chiang Mai';
    newuser.city = 'Aumphur Muang';
    newuser.customerLName = 'Sonsubanan';
    newuser.customerFName = 'Rungroj';
    const result = component.keyToEdit('-KqsdvkRWQAy6-yydmId', newuser);
    expect(result).toBe('-KqsdvkRWQAy6-yydmId');
  });
  it('should update user', () => {
    const newuser = new User();
    newuser.province = 'Chiang Mai';
    newuser.city = 'Aumphur Muang';
    newuser.customerLName = 'Sonsubanan';
    newuser.customerFName = 'Rungroj';
    component.keyToEdit('--KqsdeuVyyatxKELuMs4', newuser);
    const result = component.updateItem();
    expect(result.customerFName).toBe('Rungroj');
  });
  it('should empty', () => {
    const result = component.isEmpty();
    expect(result).toBe(true);
  })
  it('should have number',() => {
    const result = component.hasNumbers();
    expect(result).toBe(false);
  })
  it('should clear the user data', () => {
    const result = component.clearData();
    expect(result.city).toBeUndefined();
  })
});
