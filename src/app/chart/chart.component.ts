
import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {UsageItem} from '../shared/UsageItem';
import { Injectable }       from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
@Injectable()
export class ChartComponent {



  data =[];
  labels = [];


  columnTypes = [{
    'type': 'string',
    'value': 'subjectName'
  },
    {
      'type': 'number',
      'value': 'Amount'
    }];


  chartType = 'Bar';

  options = {
    'width': 900,
    'height': 400,
    'bars': 'vertical',
    'chartArea': {'left': 150, 'bottom': 50, 'right': 170, 'top': 50},
    hAxis: {
      title: 'Consumption rate'
    },
    vAxis: {
      title: 'Product name'
    }
  };

  OriginalArr: UsageItem[] = [];
  topicValue =0 ;
  DataArr: UsageItem[] = [];
  LabelArr: UsageItem[] = [];
  Mockarr:any[] = [];
  UsageItem: FirebaseListObservable<any[]>;




  constructor(private af: AngularFireDatabase) {

    this.UsageItem = af.list('/Usage');
    this.UsageItem.subscribe(snapshot => {
      this.Mockarr = snapshot;
    })






  }

  getList(): any[] {
    return this.Mockarr;
  }
  extractValues(): UsageItem[] {
    let pk = [];
    let iniItem = new UsageItem();
    iniItem.AmountofUsageItem = 1;
    iniItem.itemName = this.Mockarr[0].name;
    iniItem.itemCheckin = this.Mockarr[0].Checkin;
    iniItem.itemCheckout = this.Mockarr[0].Checkout;
    let newdate = new Date(iniItem.itemCheckout);
    let newdate1 = new Date(iniItem.itemCheckin);
    iniItem.Shelflife = Number( Math.abs((newdate1.getTime() - newdate.getTime()) / 60000));
    pk.push(iniItem);
    let checkDup = false;
    for (let i = 1; i < this.Mockarr.length - 1; i++) {


      for (let k = 0; k < pk.length; k++) {
        if (pk[k].itemName == this.Mockarr[i].name) {
          if (pk[k].itemName == this.Mockarr[i].name) {
            pk[k].AmountofUsageItem += 1;
            let newdate4 = new Date(this.Mockarr[i].Checkout);
            let newdate5 = new Date(this.Mockarr[i].Checkin);
            pk[k].Shelflife = Math.abs((newdate4.getTime() - newdate5.getTime()) / 60000);
            pk[k].Shelflife += 1;
            checkDup = true;
            break;
          }
        }
      }


      if (checkDup == false) {

        let newItem = new UsageItem();
        newItem.AmountofUsageItem = 1;
        newItem.itemName = this.Mockarr[i].name;
        newItem.itemCheckin = this.Mockarr[i].Checkin;
        newItem.itemCheckout = this.Mockarr[i].Checkout;
        let newdate2 = new Date(this.Mockarr[i].Checkout);
        let newdate3 = new Date(this.Mockarr[i].Checkin);
        newItem.Shelflife = Math.abs((newdate2.getTime() - newdate3.getTime()) / 60000);
        pk.push(newItem);
      }
    }
    this.OriginalArr = pk.sort((n1,n2) => {
      if(n1.AmountofUsageItem > n2.AmountofUsageItem){
        return -1;
      }
      if (n2.AmountofUsageItem > n1.AmountofUsageItem){
        return 1;
      }
      return 0 ;
    });
    return this.OriginalArr;
  }

  assignDataAmount(): any[] {
    let a =this.extractValues();
    let resultArr = [];
    for(let i = 0;i<a.length;i++){
      resultArr.push(a[i].AmountofUsageItem);
    }
    this.DataArr = resultArr;
    return this.DataArr ;
  }
  assignLabel(): any[] {
    let a =this.extractValues();
    let resultArr = [];
    for(let i = 0;i<a.length;i++){
      resultArr.push(a[i].itemName);
    }

    this.LabelArr = resultArr;
    return this.LabelArr;
  }
  assignDataShelflife(): any[] {
    let a =this.extractValues();
    let resultArr = [];
    for(let i = 0;i<a.length;i++){
      resultArr.push((a[i].Shelflife)/a[i].AmountofUsageItem);
    }
    this.DataArr = resultArr;
    return this.DataArr ;
  }
  ConsumptionRate(): boolean{
    this.topicValue = 1;
    this.assignLabel();
    this.assignDataAmount();
    this.options.hAxis.title = 'Consumption Rate';
    this.columnTypes[1].value = 'Consume item per year';
    return true;
  }
  Shelflife(): boolean {
    this.topicValue = 2;
    this.assignLabel();
    this.assignDataShelflife();

    this.options.hAxis.title = 'Shelf Life';
    this.columnTypes[1].value = 'Item usage per minute';
    return true;
  }
}
