import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutosComponent } from './produtos.component';
import { SharedModule } from '../_shared/shared.module';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

@NgModule({
  declarations: [ProdutosComponent, NovoProdutoComponent],
  imports: [CommonModule, FormsModule, SharedModule, ProdutosRoutingModule, MatMenuModule, ReactiveFormsModule],
})
export class ProdutosModule {}
