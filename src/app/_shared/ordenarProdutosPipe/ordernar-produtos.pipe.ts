import { Pipe, PipeTransform } from '@angular/core';
import { ProdutoModel } from 'src/app/_models/produto.model';

@Pipe({
  name: 'ordernarProdutos'
})
export class OrdernarProdutosPipe implements PipeTransform {

  transform(produtos: ProdutoModel[]): ProdutoModel[] {

    const produtosOrdenados = produtos.sort(function (a, b) {
      if (a.tipo.nome < b.tipo.nome) {
        return -1;
      }
      if (a.tipo.nome > b.tipo.nome) {
        return 1;
      }

      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });

    return produtosOrdenados;

  }

}
