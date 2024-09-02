import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { nucleoModel } from "src/app/_models/nucleo.model";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { vendaModel } from "src/app/_models/venda.model";
import { WindowSizeService } from "src/app/_services/window-size.service";

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
  @Output() socioSelecionadoOutput = new EventEmitter<SocioModel>();
  filterSocios = "";
  filterGrau = "";
  filterNucleo = "";
  socioSelecionadoIndex!: number;
  socioSelecionado: SocioModel;
  windowSize = "";
  modalOpened = false;

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit(): void {
    this.windowSize = this.windowSizeService.getWindowSize();
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
    this.socioSelecionado = undefined!;
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
      console.log(1)
      this.socioSelecionadoIndex = undefined!;
      this.socioSelecionado = undefined!;
      this.modalOpened = false;
    } else {
      console.log(12)
      this.socioSelecionado = socio;
      this.socioSelecionadoIndex = index;
      this.modalOpened = false;
      console.log(this.socioSelecionado)
      console.log(this.socioSelecionadoIndex)
    }
    this.socioSelecionadoOutput.emit(this.socioSelecionado);
  }
}
