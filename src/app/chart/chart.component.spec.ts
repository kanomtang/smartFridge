import {ChartComponent} from './chart.component'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { async, ComponentFixture, ComponentFixtureAutoDetect , TestBed,inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {UsageItem} from '../shared/UsageItem'
import {Ng2GoogleChartModule} from 'ng2-googlechart';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
export const firebaseConfig = {
  apiKey: 'AIzaSyCFXny8pflQwLu9AyQu8ve9xI6qA9KR7PM',
  authDomain: 'iotapplication-7cf10.firebaseapp.com',
  databaseURL: 'https://iotapplication-7cf10.firebaseio.com',
  projectId: 'iotapplication-7cf10',
  storageBucket: 'iotapplication-7cf10.appspot.com',
  messagingSenderId: '33890290341'
};

const fixtureTodos = [
  { 'name': 'Pepo' },
  { 'name': 'Coke' },
  { 'name': 'Miranda' },
 
  { 'name': 'Custard' }
];
const angularFireDatabaseStub = { list: () => {} };
const mockTodos$ = Observable.of(fixtureTodos);

describe('TodosService', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockTodos$);

    TestBed.configureTestingModule({
      providers: [
        ChartComponent,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub },
      ]
    });
  });

  it('#getAll', inject([ChartComponent], (service: ChartComponent) => {
    const items$ = service.UsageItem;
    items$.subscribe(item => {
      expect(item[0].name).toEqual(fixtureTodos[0].name);

      
    });
   
  }));

  it('#ExtractValues', inject([ChartComponent],(service:ChartComponent)=>{
  	let resultArr = service.extractValues();
  	expect(resultArr[0].itemName).toBe('Pepo');
  	expect(resultArr[1].itemName).toBe('Coke');
  	expect(resultArr[2].itemName).toBe('Miranda');
  	console.log(resultArr[0]);
  })) 

  it('#assign amount of usage array', inject([ChartComponent], (service:ChartComponent) =>{
  		let resultArr = service.assignDataAmount();
  		// Because every element in this array must be over 0
  		expect(resultArr[0]).toBeGreaterThan(0);
  		expect(resultArr[1]).toBeGreaterThan(0);
  		expect(resultArr[2]).toBeGreaterThan(0);
  }))

  it('#assign lebel of usage array', inject([ChartComponent], (service:ChartComponent) =>{
  		let resultArr = service.assignLabel();
  		
  		expect(resultArr[0]).toBe('Pepo');
  		expect(resultArr[1]).toBe('Coke');
  		expect(resultArr[2]).toBe('Miranda');
  }))

  //   it('#assign shelf life of usage array', inject([ChartComponent], (service:ChartComponent) =>{
  // 		let resultArr = service.assignDataShelflife();
  		
  // 		// Because every element in this array must be over 0
  // 		expect(resultArr[0]).toBeGreaterThan(0);
  // 		expect(resultArr[1]).toBeGreaterThan(0);
  // 		expect(resultArr[2]).toBeGreaterThan(0);
  // }))


    it('#Consumption rate', inject([ChartComponent], (service:ChartComponent) =>{
  		let result = service.ConsumptionRate();
  		
  		// Because every element in this array must be over 0
  		expect(result).toBe(true);
  		
  }))
       it('#Shelife rate', inject([ChartComponent], (service:ChartComponent) =>{
  		let result = service.Shelflife();
  		
  		// Because every element in this array must be over 0
  		expect(result).toBe(true);
  		
  }))

});