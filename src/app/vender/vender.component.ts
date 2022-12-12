import { Component, OnInit } from "@angular/core";
import { Subject } from 'rxjs';
import { ProdutoModel, SocioModel } from "../_models/data.model";
import { GetDataService } from "../_services/get-data.service";
import { produtosService } from "../_services/produtos.service";
import { sociosService } from "../_services/socios.service";

@Component({
  selector: "app-vender",
  templateUrl: "./vender.component.html",
  styleUrls: ["./vender.component.scss"],
})
export class VenderComponent implements OnInit {
  constructor(private sociosService: sociosService, private produtosService: produtosService) {}

  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";
  socioSelecionado: SocioModel;
  jsonDataResult: any;

  produtoSelecionado: Subject<ProdutoModel> = new Subject();


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sociosService.getSocios().subscribe({
      next: (data) => (this.dataSocios = data),
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.dataSocios);
      },
    });

    this.produtosService.getProdutos().subscribe({
      next: (data) => (this.dataProdutos = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataProdutos),
    });
  }

  pegarSocio(socio: SocioModel) {
    this.socioSelecionado = socio;
  }

  pegarProduto(produto: ProdutoModel) {
    this.produtoSelecionado.next(produto);
  }

}
