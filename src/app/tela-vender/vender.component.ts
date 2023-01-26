import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { SocioModel } from "../_models/socio.model";
import { ProdutoModel } from "../_models/produto.model";
import { produtosService } from "../_services/produtos.service";
import { sociosService } from "../_services/socios.service";
import { tipoModel } from "../_models/tipo.model";
import { vendasService } from "../_services/vendas.service";
import { vendaModel } from "../_models/venda.model";

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
    private vendasService: vendasService,
    private produtosService: produtosService
  ) {}

  dataVendas: vendaModel[] = [];
  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  listaProdutosSelecionados: ProdutoModel[] = [];
  listaAgrupada: any[] = [];
  listaSociosDebito: { nome: string; total: number }[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";
  socioSelecionado: SocioModel;
  jsonDataResult: any;
  produtoSelecionado: Subject<ProdutoModel> = new Subject();
  produtoRemovido: Subject<ProdutoModel> = new Subject();
  socioSelecionadoIndex: number;
  valorTotal: number;

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.dataSocios = await this.sociosService.getSociosArray();
    this.dataVendas = await this.vendasService.getVendasArray();
    this.dataProdutos = await this.produtosService.getProdutosArray();

    console.log(this.dataVendas);
    console.log(this.dataSocios);
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
    this.calcularValorTotal();
  }

  removerProduto(produto: ProdutoModel) {
    // console.log(this.listaProdutosSelecionados);

    const indexProduto = this.listaProdutosSelecionados.indexOf(produto);

    if (this.listaProdutosSelecionados.indexOf(produto) > -1) {
      this.listaProdutosSelecionados.splice(indexProduto, 1);
    }
    this.listaAgrupada = this.agrupaProdutos();
    this.calcularValorTotal();
  }

  calcularQuantidade(produto: ProdutoModel) {

    const produtoListaAgrupada = this.listaAgrupada.find((el) => {
      return el.nome === produto.nome
    });

    return produtoListaAgrupada?.qtd || 0;
  }

  calcularValorTotal() {
    let sum: number = this.listaProdutosSelecionados
      .map((el) => el.precoVenda)
      .reduce(function (el, el2) {
        return el + el2;
      });
    this.valorTotal = sum;
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
    console.log("rodou");
    if (terminouCompraIndex == true) {
      this.listaProdutosSelecionados = [];
      this.socioSelecionadoIndex = undefined!;
      this.getData();
    }
  }
}
