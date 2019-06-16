import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage {
  incomeForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
  ) 
  { }
  ngOnInit() {
    this.incomeForm = this.formBuilder.group({
      income: ['',[ Validators.required, Validators.minLength(3) ]]
    });
    this.loadIncome();
  }
  ionViewDidEnter(){
    this.loadIncome();
  }
  loadIncome(){
   
  }
  addIncome( name:string,shopAt:string ,price:string){
   console.log(name);

    
  }
  tickOffItem( id:number ){
  
}
}
