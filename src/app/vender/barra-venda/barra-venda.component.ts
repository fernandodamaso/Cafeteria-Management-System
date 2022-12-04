import { Component, OnInit, Input } from "@angular/core";
import { SocioModel } from "src/app/_models/data.model";

@Component({
  selector: "app-barra-venda",
  templateUrl: "./barra-venda.component.html",
  styleUrls: ["./barra-venda.component.scss"],
})
export class BarraVendaComponent implements OnInit {
  @Input() socioSelecionado: any;

  constructor() {}

  nenhumProdutoSelecionado = false;
  socioSelecionadoInterno: SocioModel;

  ngOnChanges() {
    this.socioSelecionadoInterno = this.socioSelecionado;
  }

  ngOnInit(): void {}

  anotar() {
    this.socioSelecionadoInterno = undefined!;
  }
}
