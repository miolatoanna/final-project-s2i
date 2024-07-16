import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

import { AppComponent } from './app.component';
import { RequestComponent } from './components/request/request.component';
import { ResultComponent } from './components/result/result.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    ResultComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
