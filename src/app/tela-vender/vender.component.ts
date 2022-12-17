import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { SocioModel } from "../_models/socio.model";
import { ProdutoModel } from "../_models/produto.model";
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
  socioSelecionadoIndex: number;

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

  pegarSocio(socio: SocioModel, index: number) {
    if (this.socioSelecionado == socio) {
      this.socioSelecionadoIndex = undefined!;
      this.socioSelecionado = undefined!;
    } else {
      this.socioSelecionadoIndex = index;
      this.socioSelecionado = socio;
    }
  }

  pegarProduto(produto: ProdutoModel) {
    this.produtoSelecionado.next(produto);
  }

  terminouCompra(terminouCompraIndex: boolean) {
    if (terminouCompraIndex == true) {
      this.socioSelecionadoIndex = undefined!;
      this.getData();
    }
  }
}
