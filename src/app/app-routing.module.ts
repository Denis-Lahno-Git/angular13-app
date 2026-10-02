import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Zadanie8Component } from './zadanie-8/components/zadanie8/zadanie8.component';
import { UserPageComponent } from './zadanie-8/components/user-page/user-page.component';


const routes: Routes = [
  {path: '', component: Zadanie8Component},
  {path: 'user/:creater', component: UserPageComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
