import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";

@Pipe({
  name: "ordernarProdutos",
})
export class OrdernarProdutosPipe implements PipeTransform {
  transform(produtos: ProdutoModel[]): ProdutoModel[] {
    const produtosOrdenados = produtos.sort((a, b) => a.tipo.nome.localeCompare(b.tipo.nome) || a.nome.localeCompare(b.nome));
    return produtosOrdenados;
  }
}
