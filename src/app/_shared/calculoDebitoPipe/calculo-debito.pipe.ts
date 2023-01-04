import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "calculoDebito",
})
export class calculoDebito implements PipeTransform {
  transform(socio: SocioModel) {
    if (socio.produtosEmAberto.length >= 1) {
      let listaPrecoVenda = [];

      for (let i = 0; i < socio.produtosEmAberto.length; i++) {
        listaPrecoVenda.push(socio.produtosEmAberto[i].precoVenda);
      }

      let somaTotal: number = listaPrecoVenda
        .map((a) => a)
        .reduce(function (a, b) {
          return a + b;
        });

      somaTotal = somaTotal * -1;

      return somaTotal + socio.credito;

    } else {
      if (socio.credito >= 1) {
        return socio.credito;
      } else {
        return "0"
      }

    }
  }
}
