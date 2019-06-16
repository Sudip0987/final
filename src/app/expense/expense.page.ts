import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {
  expenseForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
  ) 
  { }
  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
      expense: ['',[ Validators.required, Validators.minLength(3) ]]
    });
    this.loadExpense();
  }
  ionViewDidEnter(){
    this.loadExpense();
  }
  loadExpense(){
   
  }
  addExpense( name:string,shopAt:string ,price:string){
   console.log(name);

    
  }
  
}
