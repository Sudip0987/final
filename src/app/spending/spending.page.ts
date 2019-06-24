import { AuthenticateService } from './../services/authentication.service';
import { Platform } from '@ionic/angular';
import { AppModule } from './../app.module';
import { CrudService } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';
declare var google;
@Component({
  selector: 'app-spending',
  templateUrl: './spending.page.html',
  styleUrls: ['./spending.page.scss'],
})
export class SpendingPage implements OnInit {
  currentDate:string = new Date().toLocaleDateString();

  Budgets: any;
  amount: number;
  desc: string;
  date1:string;
  date2:string;
  name:string;
  type:string;
  user:string;
  jsonData:string;
  allData:string;

  userEmail:string="";

  constructor(
    private crudService:CrudService,
    private  platform:Platform,
    private authService: AuthenticateService
    ) { }

  ngOnInit() {
    this.userEmail = this.authService.userDetails().email;
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

  
     // console.log(this.Budgets);
     
      this.jsonData = JSON.stringify(this.Budgets);
      this.allData = this.jsonData["Date1"];
      
 
    });
    


 
  }



  




   showChart(month:string) {
     var totalRent=0,totalGro=0,totalTrans=0,totalOther=0,totalIncome=0,totalExpense=0;
     
     var amount;
    for(let budget of this.Budgets){
      if(this.userEmail==budget.User){
        this.amount = budget.Amount;
        amount = this.amount;
        this.date1 = budget.Date1;
        this.desc = budget.desc;
        this.type= budget.Type;
      // console.log(this.desc);
       // if(month==this.date1.substring(0,2)){
       
         if(this.type=="Income"){
           totalIncome = totalIncome+parseInt(amount);
         }else if(this.type=="Expense"){
           totalExpense = totalExpense+parseInt(amount);
         }
          if(this.desc=="Rent"){
           totalRent=totalRent+parseInt(amount);
           console.log("check"+totalRent);
          }
          if(this.desc=="Transportation"){
           totalTrans=totalTrans+parseInt(amount);
           console.log("check"+totalTrans);
          }
 
          if(this.desc=="Grocery"){
           totalGro=totalGro+parseInt(amount);
           console.log("check"+totalGro);
          }
 
          if(this.desc=="Other"){
           totalOther=totalOther+parseInt(amount);
           console.log("check"+totalOther);
          }
 
        
               }
       //}
     //  console.log(this.totalRent+"--"+this.totalGro+"--"+this.totalTrans+"--"+this.totalOther);

    }
    console.log(totalRent);
    console.log(totalGro);
    console.log(totalTrans);
    console.log(totalOther);




   console.log(month);
    // Create the data table.
    
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Income');
    data.addColumn('number', 'Expense');
    
    data.addRows([
      ['Rent', totalRent],
      ['Grocery', totalGro],
      ['Transportation', totalTrans],
      ['Other', 20],
    ]);

    // Set chart options
    var options = {'title':'Total Income    :  '+totalIncome+'$'+'\nTotal Expense : '+totalExpense+'$',
                   'width':400,
                   'height':250};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
  ionViewDidLoad(){
    console.log("fucker");
  }
}
