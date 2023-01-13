import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { SocioModel } from "../_models/socio.model";
import { ProdutoModel } from "../_models/produto.model";
import { produtosService } from "../_services/produtos.service";
import { sociosService } from "../_services/socios.service";
import { tipoModel } from "../_models/tipo.model";

export class produtosAgrupados {
  nome: string;
  id: number;
  qtd: number;
  tipo: tipoModel;
  listaProdutos: ProdutoModel[];
}

@Component({
  selector: "app-vender",
  templateUrl: "./vender.component.html",
  styleUrls: ["./vender.component.scss"],
})
export class VenderComponent implements OnInit {
  constructor(
    private sociosService: sociosService,
    private produtosService: produtosService
  ) {}

  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  listaProdutosSelecionados: ProdutoModel[] = [];
  listaAgrupada: any[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";
  socioSelecionado: SocioModel;
  jsonDataResult: any;
  produtoSelecionado: Subject<ProdutoModel> = new Subject();
  produtoRemovido: Subject<ProdutoModel> = new Subject();
  socioSelecionadoIndex: number;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sociosService.getSocios().subscribe({
      next: (data) => (this.dataSocios = data),
      error: (e) => console.error(e),
      complete: () => {
        // console.log(this.dataSocios);
      },
    });

    this.produtosService.getProdutos().subscribe({
      next: (data) => (this.dataProdutos = data),
      error: (e) => console.error(e),
      // complete: () => console.log(this.dataProdutos),
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

  adicionarProduto(produto: ProdutoModel) {
    this.listaProdutosSelecionados.push(produto);
    this.listaAgrupada = this.agrupaProdutos();
  }

  removerProduto(produto: ProdutoModel) {
    console.log(this.listaProdutosSelecionados);

    const indexProduto = this.listaProdutosSelecionados.indexOf(produto);

    if (this.listaProdutosSelecionados.indexOf(produto) > -1) {
      this.listaProdutosSelecionados.splice(indexProduto, 1);
    }
    this.listaAgrupada = this.agrupaProdutos();
    // this.listaProdutosSelecionados.splice()
    // console.log(this.listaAgrupada);
  }

  /**
   * Retorna um array agrupado de acordo com id a lista de produtos selecionados
   * @returns lista de produtos agrupados
   */

  agrupaProdutos(): produtosAgrupados[] {
    const arrAgrupado: produtosAgrupados[] = [];

    for (const item of this.listaProdutosSelecionados) {
      const produtoDentroArray = arrAgrupado.some((el) => el.id === item.id);

      if (!produtoDentroArray) {
        // Filter Retorna um array filtrado por ID
        const arrFiltrado = this.listaProdutosSelecionados.filter(
          (el) => el.id === item.id
        );

        const obj = {
          nome: item.nome,
          tipo: item.tipo,
          id: item.id,
          qtd: arrFiltrado.length,
          listaProdutos: arrFiltrado,
        };
        arrAgrupado.push(obj);
      }
    }

    return arrAgrupado;
  }

  terminouCompra(terminouCompraIndex: boolean) {
    if (terminouCompraIndex == true) {
      this.socioSelecionadoIndex = undefined!;
      this.getData();
    }
  }
}
