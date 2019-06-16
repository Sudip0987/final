import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 
  {
    path: 'tabs',
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'payback',
    loadChildren: './payback/payback.module#PaybackPageModule'

  },
 
   
  { path: 'login',
   loadChildren: './login/login.module#LoginPageModule'
   },
   {
     path: 'income',
     loadChildren: './income/income.module#IncomePageModule'
   },
   {
    path: 'expense',
    loadChildren: './expense/expense.module#ExpensePageModule'
  },
  {
    path: 'spending',
    loadChildren: './spending/spending.module#SpendingPageModule'
  },
  { path: 'payback', loadChildren: './payback/payback.module#PaybackPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
