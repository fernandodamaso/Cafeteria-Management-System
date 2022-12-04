import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buscaTipoPipe } from './buscaTipoProdutoPipe/busca-tipo-produto.pipe';
import { BuscaPalavrasPipe } from './buscaPalavrasPipe/busca-palavras.pipe';
import { BuscaGrauPipe } from './buscaGrauPipe/busca-grau.pipe';

// Modulo para ser compartilhado com toda a aplicação, aqui estão declaradas e exportados os pipes

@NgModule({
  declarations: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
  ],
  exports: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
  ],
  imports: [
    // Caso os pipes tenham alguma dependencia especifica, devem ser importados para funcionar
    CommonModule
  ]
})
export class SharedModule { }
