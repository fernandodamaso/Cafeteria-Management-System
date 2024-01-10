import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { vendaModel } from "src/app/_models/venda.model";

@Pipe({
  name: "checarProdutosAbertos",
})
export class checarProdutosAbertosPipe implements PipeTransform {
  transform(socio: SocioModel, vendas: vendaModel[]) {
    const vendasFiltradas = vendas.filter(
      (venda: any) => venda.idCliente === socio.id && venda.status === "aberto"
    );

    if (vendasFiltradas.length > 0) {
      return true;
    }

    return false;
  }
}
