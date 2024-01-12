import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { nucleoModel } from "src/app/_models/nucleo.model";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { vendaModel } from "src/app/_models/venda.model";

@Component({
  selector: "app-lista-socios",
  templateUrl: "./lista-socios.component.html",
  styleUrls: ["./lista-socios.component.scss"],
})
export class ListaSociosComponent implements OnInit {
  @Input() dataVendas: vendaModel[] = [];
  @Input() vendasAbertas: vendaModel[] = [];
  @Input() dataSocios: SocioModel[] = [];
  @Input() dataProdutos: ProdutoModel[] = [];
  @Input() listaNucleos: nucleoModel[] = [];
  @Input() socioSelecionadoIndex: number;
  @Output() socioSelecionadoOutput = new EventEmitter<SocioModel>();
  filterSocios = "";
  filterGrau = "";
  filterNucleo = "";
  socioSelecionado: SocioModel;

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataSocios);
  }

  getSocio(socio: SocioModel, index: number) {
    if (this.socioSelecionado == socio) {
      this.socioSelecionadoIndex = undefined!;
      this.socioSelecionado = undefined!;
    } else {
      this.socioSelecionado = socio;
      this.socioSelecionadoIndex = index;
    }
    this.socioSelecionadoOutput.emit(this.socioSelecionado);
  }
}
