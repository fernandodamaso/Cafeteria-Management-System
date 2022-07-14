import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenderRoutingModule } from './vender-routing.module';
import { VenderComponent } from './vender.component';


@NgModule({
  declarations: [
    VenderComponent
  ],
  imports: [
    CommonModule,
    VenderRoutingModule
  ]
})
export class VenderModule { }
