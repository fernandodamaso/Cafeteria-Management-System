import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { nucleoModel } from "src/app/_models/nucleo.model";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Input() listaNucleos: string[] = [];
  @Input() listaTipos: string[] = [];
  @Input() filterLocation: string = "";

  @Output() filterNomeOutput = new EventEmitter<string>();
  @Output() filterNucleoOutput = new EventEmitter<string>();
  @Output() filterProdutosOutput = new EventEmitter<string>();
  @Output() filterGrauOutput = new EventEmitter<string>();
  @Output() filterTipoOutput = new EventEmitter<string>();


  buscaNome: string = "";
  filterGrau: string = "";
  filterNucleo: string = "";
  filterTipo: string = "";

  ngOnInit(): void {}

  filterChange(event: any, filterChanged: string) {
    if (filterChanged == 'nome') {
      this.buscaNome = event;
      this.filterNomeOutput.emit(this.buscaNome);
    }
    if (filterChanged == 'grau') {
      this.filterGrau = event;
      this.filterGrauOutput.emit(this.filterGrau);
    }
    if (filterChanged == 'nucleos') {
      this.filterNucleo = event;
      this.filterNucleoOutput.emit(this.filterNucleo);
    }
    if (filterChanged == 'tipo') {
      this.filterTipo = event;
      this.filterTipoOutput.emit(this.filterTipo);
    }

  }
}
