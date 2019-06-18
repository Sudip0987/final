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

  title = 'Firestore CRUD Operations Students App';
  currentDate:string = new Date().toLocaleDateString();

  Budgets: any;
  amount: number;
  desc: string;
  date1:string;
  date2:string;
  name:string;
  type:string;
  constructor(
    private formBuilder:FormBuilder,
    private crudService: CrudService,
    
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


          
          
        };
      
      })
      console.log(this.Budgets);
      
 
    });
  }
  
  addIncome(amount:number,desc:string){
   
    this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="";
    this.type="Income";
    this.name=""
      let record = {};
      record['amount'] = this.amount;
      record['desc'] = this.desc;
      record['date1'] = this.currentDate;
      record['date2'] = this.date2;
      record['type'] = this.type;

      record['name'] = this.name;

      this.crudService.addRecord(record).then(resp => {
        this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="";
    this.type="Income";
    this.name=""
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    

    
  }
  
}
