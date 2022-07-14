import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VenderRoutingModule } from "./vender-routing.module";
import { VenderComponent } from "./vender.component";
import { BuscaPalavrasPipe } from "../buscaPalavrasPipe/busca-palavras.pipe";
import { FormsModule } from "@angular/forms";
import { BuscaGrauPipe } from "../buscaGrauPipe/busca-grau.pipe";
import { buscaTipoPipe } from "../buscaTipoProdutoPipe/busca-tipo-produto.pipe";

@NgModule({
  declarations: [VenderComponent, BuscaPalavrasPipe, BuscaGrauPipe, buscaTipoPipe],
  imports: [CommonModule, VenderRoutingModule, FormsModule],
})
export class VenderModule {}
