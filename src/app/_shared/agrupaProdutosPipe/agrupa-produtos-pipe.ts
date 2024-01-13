import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { produtosAgrupados } from "src/app/_models/produtosAgrupados.model";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "agrupaProdutos",
})
export class agrupaProdutosPipe implements PipeTransform {
  transform(listaProdutosSelecionados: ProdutoModel[]) {
    const arrAgrupado: produtosAgrupados[] = [];

    for (const item of listaProdutosSelecionados) {
      const produtoDentroArray = arrAgrupado.some((el) => el.id === item.id);

      if (!produtoDentroArray) {
        const arrFiltrado = listaProdutosSelecionados.filter((el) => el.id === item.id);

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
}
