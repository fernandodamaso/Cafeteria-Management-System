import { Component, OnInit } from "@angular/core";
import { ProdutoModel, SocioModel } from "../_models/data.model";
import { GetDataService } from "../_services/get-data.service";

@Component({
  selector: "app-vender",
  templateUrl: "./vender.component.html",
  styleUrls: ["./vender.component.scss"],
})
export class VenderComponent implements OnInit {
  constructor(private GetDataService: GetDataService) {}

  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";

  jsonDataResult: any;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.GetDataService.getSocios().subscribe({
      next: (data) => (this.dataSocios = data),
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.dataSocios);
      },
    });

    this.GetDataService.getProdutos().subscribe({
      next: (data) => (this.dataProdutos = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataProdutos),
    });
  }
}
