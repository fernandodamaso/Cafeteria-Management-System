import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosComponent } from './produtos.component';
import { SharedModule } from '../_shared/shared.module';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProdutosRoutingModule,
    MatMenuModule
  ]
})
export class ProdutosModule { }
