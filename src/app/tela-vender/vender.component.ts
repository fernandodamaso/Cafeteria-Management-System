import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { SocioModel } from "../_models/socio.model";
import { ProdutoModel } from "../_models/produto.model";
import { produtosService } from "../_services/produtos.service";
import { sociosService } from "../_services/socios.service";
import { tipoModel } from "../_models/tipo.model";
import { vendasService } from "../_services/vendas.service";
import { vendaModel } from "../_models/venda.model";
import { OrdenarSociosPipe } from "../_shared/ordernarSociosPipe/ordenar-socios.pipe";
import { OrdernarProdutosPipe } from "../_shared/ordenarProdutosPipe/ordernar-produtos.pipe";
import { nucleoModel } from "../_models/nucleo.model";
import { agrupaProdutosPipe } from "../_shared/agrupaProdutosPipe/agrupa-produtos-pipe";
import { produtosAgrupados } from "../_models/produtosAgrupados.model";

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
  vendasAbertas: vendaModel[] = [];
  listaNucleos: string[] = [];
  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  listaProdutosSelecionados: ProdutoModel[] = [];
  listaProdutosAgrupada: produtosAgrupados[] = [];
  listaSociosDebito: { nome: string; total: number }[] = [];
  filterProdutos = "";
  filterTipo = "";
  jsonDataResult: any;
  produtoSelecionado: Subject<ProdutoModel> = new Subject();
  produtoRemovido: Subject<ProdutoModel> = new Subject();
  valorTotal: number;
  socioSelecionado: SocioModel;
  socioSelecionadoIndex: number;
  listaTipos: string[] = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.dataSocios = await this.sociosService.getSociosArray();
    this.dataVendas = await this.vendasService.getVendasArray();
    this.dataProdutos = await this.produtosService.getProdutosArray();
    this.getListaTipos();
    this.getVendasAbertas();
    this.getListaNucleos();
  }

  getListaNucleos() {
    this.listaNucleos = Array.from(new Set(this.dataSocios.map((el) => el.nucleo.nome)));
  }

  getListaTipos() {
    let listaTodosTipos: tipoModel[] = [];
    this.dataProdutos.forEach((produto) => {
      listaTodosTipos.push(produto.tipo);
    });
    this.listaTipos = Array.from(new Set(listaTodosTipos.map((el) => el.nome)));
  }

  adicionarProduto(produto: ProdutoModel) {
    this.listaProdutosSelecionados.push(produto);
    this.updateListAndTotal();
  }

  removerProduto(produto: ProdutoModel) {
    const indexProduto = this.listaProdutosSelecionados.indexOf(produto);
    if (indexProduto > -1) {
      this.listaProdutosSelecionados.splice(indexProduto, 1);
    }
    this.updateListAndTotal();
  }

  getVendasAbertas() {
    this.vendasAbertas = this.dataVendas.filter((venda: any) => venda.status === "aberto");
  }

  atualizaProduto(produto: ProdutoModel) {
    console.log(produto);
  }

  agrupaProdutos() {
    let agrupa = new agrupaProdutosPipe();
    let listaProdutosAgrupada = agrupa.transform(this.listaProdutosSelecionados);
    this.listaProdutosAgrupada = listaProdutosAgrupada;
  }

  updateListAndTotal() {
    this.agrupaProdutos();
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    this.valorTotal = this.listaProdutosSelecionados
      .map((el) => el.precoVenda)
      .reduce((el, el2) => el + el2, 0);
  }

  calcularQuantidade(produto: ProdutoModel) {
    const produtoListaProdutosAgrupada = this.listaProdutosAgrupada.find((el) => {
      return el.nome === produto.nome;
    });

    return produtoListaProdutosAgrupada?.qtd || 0;
  }

  atualizaSocio(socio: any) {
    this.socioSelecionado = socio;
  }

  // agrupaProdutos(): produtosAgrupados[] {
  //   const arrAgrupado: produtosAgrupados[] = [];

  //   for (const item of this.listaProdutosSelecionados) {
  //     const produtoDentroArray = arrAgrupado.some((el) => el.id === item.id);

  //     if (!produtoDentroArray) {
  //       const arrFiltrado = this.listaProdutosSelecionados.filter((el) => el.id === item.id);

  //       const obj = {
  //         nome: item.nome,
  //         tipo: item.tipo,
  //         id: item.id,
  //         qtd: arrFiltrado.length,
  //         listaProdutos: arrFiltrado,
  //       };
  //       arrAgrupado.push(obj);
  //     }
  //   }

  //   return arrAgrupado;
  // }

  terminouCompra(terminouCompraIndex: boolean) {
    if (terminouCompraIndex == true) {
      this.listaProdutosSelecionados = [];
      this.listaProdutosAgrupada = [];
      this.socioSelecionadoIndex = undefined!;
      this.getData();
    }
  }
}
