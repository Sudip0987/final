import { AuthenticateService } from './../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { CrudService } from './../services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-payback',
  templateUrl: './payback.page.html',
  styleUrls: ['./payback.page.scss'],
})
export class PaybackPage implements OnInit {
  paybackForm:FormGroup;

  title = 'Firestore CRUD Operations Students App';
  currentDate:string = new Date().toLocaleDateString();

  Budgets: any;
  amount: number;
  desc: string;
  date1:string;
  date2:string;
  name:string;
  type:string;
  userEmail:string;
  constructor(
    private formBuilder:FormBuilder,
    private localNotify: LocalNotifications,
    private crudService: CrudService,
    private afAuth:AngularFireAuth,
    private authService: AuthenticateService
  ) { }

  ngOnInit() {
    this.paybackForm = this.formBuilder.group({
      payback: ['',[ Validators.required, Validators.minLength(3) ]]
    });
    this.crudService.readRecord().subscribe(data => {
 
      this.Budgets = data.map(e => {
       
        return {
          id: e.payload.doc.id,
          isEdit: false,
          
          Amount: e.payload.doc.data()['amount'],
          desc: e.payload.doc.data()['desc'],
          Date1: e.payload.doc.data()['date1'],
          Date2: e.payload.doc.data()['date2'],
          Name: e.payload.doc.data()['name'],
          Type: e.payload.doc.data()['type'],
          User: e.payload.doc.data()['userEmail'],
          
          
          
        };
      
      })
      console.log(this.Budgets);
      
 
    });
    this.userEmail= this.authService.userDetails().email;

  }
  addData(amount:number,desc:string,name:string,nDate:number){
   this.afAuth.authState.subscribe(user => {
    if(user){

    this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="dsdd";
    this.type="Payback";
    this.name=name;
    this.userEmail = user.email;

      let record = {};
      record['amount'] = this.amount;
      record['desc'] = this.desc;
      record['date1'] = this.date1;
      record['date2'] = this.date2;
      record['type'] = this.type;

      record['name'] = this.name;
      record['userEmail'] = this.userEmail;

      this.crudService.addRecord(record).then(resp => {
        this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="dsdd";
    this.type="Payback";
    this.name=name;
    this.userEmail = user.email;

        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    
      this.addNotification(nDate,desc,name,amount);
    }
   });
    
  }
  tickOffItem(item){

      let record = {};
      
console.log(item.Amount+"/"+item.desc);
console.log(item.Date1+"/"+item.Date2);
console.log(item.Type+"/"+item.Name);

      record['amount'] = item.Amount;
      record['desc'] = item.desc;
      record['date1'] = item.Date1;

      record['date2'] = "Paid";


      record['type'] = item.Type;
      record['name'] = item.Name;
      record['user'] = item.User;

      this.crudService.updateRecord(item.id, record);
    }

    addNotification(days:number,desc:string,name:string,amount:NumberSymbol){
      console.log(days);
      

      if(desc=="Lent"){
        var message = name+" is supposed to pay you "+ amount +"$ today" ; 
      }else{
        var message = "You need to pay "+ amount + "$ to "+ name +" today" ; 

      }
      this.localNotify.schedule({
        title:'Payback Reminder',
       
        text:message,
        trigger:{
          //at:new Date(new Date().getTime()+days)
        in:days,
        unit:ELocalNotificationTriggerUnit.SECOND
        },

      });
    }
    
}
