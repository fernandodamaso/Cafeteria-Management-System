import { ProdutoModel } from "./produto.model";
import { SocioModel } from "./socio.model";

export class vendaModel {
    id: number;
    idCliente: number;
    produtosVendidos: ProdutoModel[];
    status: string;
    desconto: number;
    dataVenda: Date;
    valorRecebido: number;
  }
