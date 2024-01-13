import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { produtosAgrupados } from "src/app/_models/produtosAgrupados.model";

@Component({
  selector: "app-lista-produtos",
  templateUrl: "./lista-produtos.component.html",
  styleUrls: ["./lista-produtos.component.scss"],
})
export class ListaProdutosComponent implements OnInit {
  @Input() listaTipos: string[] = [];
  @Input() dataProdutos: ProdutoModel[] = [];
  @Input() qtdProdutosSelecionadosInput: number = 0;
  @Input() listaProdutosAgrupadaInput: produtosAgrupados[] = [];

  @Output() adicionaProdutoOutput = new EventEmitter<ProdutoModel>();
  @Output() removeProdutOutput = new EventEmitter<ProdutoModel>();

  filterProdutos: string = "";
  filterTipo: string = "";

  constructor() {}

  ngOnInit(): void {}

  adicionarProduto(produto: ProdutoModel) {
    this.adicionaProdutoOutput.emit(produto);
  }

  calcularQuantidade(produto: ProdutoModel) {
    const produtoListaProdutosAgrupada = this.listaProdutosAgrupadaInput.find((el) => {
      return el.nome === produto.nome;
    });

    return produtoListaProdutosAgrupada?.qtd || 0;
  }

  removerProduto(produto: ProdutoModel) {
    this.removeProdutOutput.emit(produto);
  }
}
