import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buscaTipoPipe } from './buscaTipoProdutoPipe/busca-tipo-produto.pipe';
import { BuscaPalavrasPipe } from './buscaPalavrasPipe/busca-palavras.pipe';
import { BuscaGrauPipe } from './buscaGrauPipe/busca-grau.pipe';
import { PagarComponent } from './pagar/pagar.component';
import { calculoDebito } from './calculoDebitoPipe/calculo-debito.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Modulo para ser compartilhado com toda a aplicação, aqui estão declaradas e exportados os pipes

@NgModule({
  declarations: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
    calculoDebito,
    PagarComponent
  ],
  exports: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
    calculoDebito,
    PagarComponent
  ],
  imports: [
    // Caso os pipes tenham alguma dependencia especifica, devem ser importados para funcionar
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule

  ]
})
export class SharedModule { }
