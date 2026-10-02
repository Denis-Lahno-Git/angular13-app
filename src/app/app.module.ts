import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Zadanie8Component } from './zadanie-8/components/zadanie8/zadanie8.component';
import { ModalZadanie8Component } from './zadanie-8/components/modal-zadanie8/modal-zadanie8.component';
import { ModalLogZadanie8Component } from './zadanie-8/components/modal-log-zadanie8/modal-log-zadanie8.component';
import { UserPageComponent } from './zadanie-8/components/user-page/user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    Zadanie8Component,
    ModalZadanie8Component,
    ModalLogZadanie8Component,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
