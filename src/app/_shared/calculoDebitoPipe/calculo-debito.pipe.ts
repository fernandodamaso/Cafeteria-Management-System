import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { vendaModel } from "src/app/_models/venda.model";

@Pipe({
  name: "calculoDebito",
})
export class calculoDebito implements PipeTransform {
  transform(socioId: number, vendas: vendaModel[]) {
    let valorTotalVenda = 0;

    const vendasFiltradas = vendas.filter(
      (venda: any) => venda.idCliente === socioId && venda.status === "aberto"
    );

    for (const x of vendasFiltradas) {
      const listaPrecoVenda = x.produtosVendidos.map((el) => {
        return el.precoVenda;
      });
      const total = listaPrecoVenda.reduce((a, b) => {
        return a + b;
      });
      valorTotalVenda += total;
    }
    return valorTotalVenda;
  }
}
