import { NgModule } from '@angular/core';
import {RequestComponent} from "./request.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    CommonModule
  ],
  exports: [
    RequestComponent
  ],
  providers: []
})
export class RequestModule { }
