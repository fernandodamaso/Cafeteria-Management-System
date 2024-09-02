import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from "@angular/core";
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
  @Input() listaNucleos: string[] = [];
  @Input() socioSelecionadoIndex: number;
  @Output() socioSelecionadoOutput = new EventEmitter<SocioModel>();
  filterSocios = "";
  filterGrau = "";
  filterNucleo = "";
  socioSelecionado: SocioModel;
  windowSize = "";
  modalOpened = false;

  constructor() {}

  ngOnInit(): void {
    this.windowSize = this.getWindowSize();
    console.log(this.windowSize);
  }

  getWindowSize() {
    if (window.innerWidth > 1024) {
      return "desktop";
    } else {
      return "mobile";
    }
  }

  getTitle() {
    if (this.windowSize == "desktop") {
      return "Lista de Sócios:";
    } else {
      return "Vender para:";
    }
  }

  ngOnChanges() {
    this.socioSelecionadoIndex = undefined!;
  }

  openModal() {
    if (this.windowSize == "desktop") {
      return;
    } else {
      this.modalOpened = true;
    }
  }

  closeModal() {
    this.modalOpened = false;
  }

  getSocio(socio: SocioModel, index: number) {
    if (this.socioSelecionado == socio) {
      this.socioSelecionadoIndex = undefined!;
      this.socioSelecionado = undefined!;
    } else {
      this.socioSelecionado = socio;
      this.socioSelecionadoIndex = index;
      this.modalOpened = false;
    }
    this.socioSelecionadoOutput.emit(this.socioSelecionado);
  }
}
