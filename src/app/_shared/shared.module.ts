import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { buscaTipoPipe } from "./buscaTipoProdutoPipe/busca-tipo-produto.pipe";
import { BuscaPalavrasPipe } from "./buscaPalavrasPipe/busca-palavras.pipe";
import { BuscaGrauPipe } from "./buscaGrauPipe/busca-grau.pipe";
import { PagarComponent } from "../modal-pagar/pagar.component";
import { calculoDebito } from "./calculoDebitoPipe/calculo-debito.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { ReciboComponent } from "../tela-receber/reciboModal/recibo.component";
import { OrdenarSociosPipe } from "./ordernarSociosPipe/ordenar-socios.pipe";
import { OrdernarProdutosPipe } from "./ordenarProdutosPipe/ordernar-produtos.pipe";
import { buscaNucleoPipe } from "./filtroNucleoPipe/filtro-nucleo.pipe";
import { checarProdutosAbertosPipe } from "./checarProdutosAbertosPipe/checar-produtos-abertos.pipe";
import { agrupaProdutosPipe } from "./agrupaProdutosPipe/agrupa-produtos-pipe";

// Modulo para ser compartilhado com toda a aplicação, aqui estão declaradas e exportados os pipes

@NgModule({
  declarations: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
    calculoDebito,
    PagarComponent,
    ReciboComponent,
    OrdenarSociosPipe,
    OrdernarProdutosPipe,
    buscaNucleoPipe,
    checarProdutosAbertosPipe,
    agrupaProdutosPipe,
  ],
  exports: [
    BuscaGrauPipe,
    buscaTipoPipe,
    BuscaPalavrasPipe,
    calculoDebito,
    OrdenarSociosPipe,
    OrdernarProdutosPipe,
    PagarComponent,
    ReciboComponent,
    buscaNucleoPipe,
    checarProdutosAbertosPipe,
    agrupaProdutosPipe,
  ],
  imports: [
    // Caso os pipes tenham alguma dependencia especifica, devem ser importados para funcionar
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
})
export class SharedModule {}
