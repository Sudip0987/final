import { AuthenticateService } from './../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CrudService } from './../services/crud.service';
import { environment } from './../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

export interface dataArray{
  name:string;
  address:string;
}
@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})

export class IncomePage {
  incomeForm:FormGroup;

  currentDate:string = new Date().toLocaleDateString();

  Budgets: any;
  check:string;
  amount: number;
  desc: string;
  date1:string;
  date2:string;
  name:string;
  type:string;
  userEmail:string;
  constructor(
    private formBuilder:FormBuilder,
    private crudService: CrudService,
    private afAuth:AngularFireAuth,
 private authService: AuthenticateService,

  ) 
  { 

  }
  ngOnInit() {


    this.incomeForm = this.formBuilder.group({
      income: ['',[ Validators.required, Validators.minLength(3) ]]
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
          User: e.payload.doc.data()['userEmail']


          
          
        };
      
      })
      console.log(this.Budgets);
      
 
    });
   this.userEmail= this.authService.userDetails().email;
  }
  
  addIncome(amount:number,desc:string){
    this.afAuth.authState.subscribe( (user) => {
      if(user){
        this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="";
    this.type="Income";
    this.name="";
    this.userEmail = user.email;

      let record = {};
      record['amount'] = this.amount;
      record['desc'] = this.desc;
      record['date1'] = this.currentDate;
      record['date2'] = this.date2;
      record['type'] = this.type;

      record['name'] = this.name;
      record['userEmail'] = this.userEmail;
      this.crudService.addRecord(record).then(resp => {
        this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="";
    this.type="Income";
        this.name=""
        this.userEmail = user.email;

        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    

    
      }
    });
    
  }
  
}
