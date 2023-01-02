import { ProdutoModel } from "./produto.model";
import { SocioModel } from "./socio.model";

export class vendaModel {
    id: number;
    cliente: SocioModel;
    produtosVendidos: ProdutoModel[];
    desconto: number;
    dataVenda: Date;
    valorRecebido: number;
  }
