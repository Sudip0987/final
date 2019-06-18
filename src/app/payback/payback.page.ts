import { CrudService } from './../services/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
  constructor(
    private formBuilder:FormBuilder,
    
    private crudService: CrudService,
    
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


          
          
        };
      
      })
      console.log(this.Budgets);
      
 
    });
  }
  addData(amount:number,desc:string,name:string){
   
    this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="dsdd";
    this.type="Payback";
    this.name=name;
      let record = {};
      record['amount'] = this.amount;
      record['desc'] = this.desc;
      record['date1'] = this.date1;
      record['date2'] = this.date2;
      record['type'] = this.type;

      record['name'] = this.name;

      this.crudService.addRecord(record).then(resp => {
        this.amount = amount;
    this.desc = desc;
    this.date1=this.currentDate;
    this.date2="dsdd";
    this.type="Payback";
    this.name=name;
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
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

      this.crudService.updateRecord(item.id, record);
    }
    
}
