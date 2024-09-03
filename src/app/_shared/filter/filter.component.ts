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
  @Input() filterLocation: string = "";

  @Output() filterSociosOutput = new EventEmitter<string>();
  @Output() filterNucleoOutput = new EventEmitter<string>();
  @Output() filterProdutosOutput = new EventEmitter<string>();
  @Output() filterGrauOutput = new EventEmitter<string>();

  filterSocios: string = "";
  filterGrau: string = "";
  filterNucleo: string = "";

  ngOnInit(): void {}

  filterChange(event: any, filterChanged: string) {
    if (filterChanged == 'socios') {
      this.filterSocios = event;
      this.filterSociosOutput.emit(this.filterSocios);
    }
    if (filterChanged == 'grau') {
      this.filterGrau = event;
      this.filterGrauOutput.emit(this.filterGrau);
    }
    if (filterChanged == 'nucleos') {
      this.filterNucleo = event;
      this.filterNucleoOutput.emit(this.filterNucleo);
    }

  }
}
