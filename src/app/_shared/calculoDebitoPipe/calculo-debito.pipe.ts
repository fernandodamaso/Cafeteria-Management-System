import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { vendaModel } from "src/app/_models/venda.model";

@Pipe({
  name: "calculoDebito",
})
export class calculoDebito implements PipeTransform {
  transform(socio: SocioModel, vendas: vendaModel[]) {
    console.log(vendas)
    let valorTotalVenda = 0;

    const vendasFiltradas = vendas.filter(
      (venda: any) => venda.idCliente === socio.id && venda.status === "aberto"
    );

    for (const x of vendasFiltradas) {
      const listaPrecoVenda = x.produtosAbertos.map((el) => {
        return el.precoVenda;
      });
      const total = listaPrecoVenda.reduce((a, b) => {
        return a + b;
      });
      valorTotalVenda += total;
    }
    valorTotalVenda = -Math.abs(valorTotalVenda) + socio.credito;
    return valorTotalVenda;
  }
}
