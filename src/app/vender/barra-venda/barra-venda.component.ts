import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { ProdutoModel, SocioModel } from "src/app/_models/data.model";

@Component({
  selector: "app-barra-venda",
  templateUrl: "./barra-venda.component.html",
  styleUrls: ["./barra-venda.component.scss"],
})
export class BarraVendaComponent implements OnInit {
  // @Input() socioSelecionado: any;
  // @Input() produtoSelecionado: any;

  @Input()
  set socioSelecionado(value: SocioModel) {
    this.socioSelecionadoInterno = value;
  }
  @Input()
  set produtoSelecionado(value: ProdutoModel) {
    if (value) {
      console.log("tem");
      this.produtosSelecionadosInterno.push(value);
    }
  }

  constructor() {}

  nenhumProdutoSelecionado = false;
  socioSelecionadoInterno: SocioModel;
  produtosSelecionadosInterno: ProdutoModel[] = [];

  // ngOnChanges() {
  //   this.socioSelecionadoInterno = this.socioSelecionado;
  //   this.produtosSelecionados = this.produtoSelecionado;
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes["socioSelecionado"])
  // }

  ngOnInit(): void {}

  anotar() {
    this.socioSelecionadoInterno = undefined!;
    this.produtosSelecionadosInterno = [];
  }

  deletarProduto(produto: any) {
    console.log(produto);
    this.produtosSelecionadosInterno.splice(produto, 1)
  }
}
