import { ProdutoModel } from "./produto.model";

export class vendaModel {
    id: number;
    idCliente: number;
    produtosVendidos: ProdutoModel[];
    status: 'aberto'|'fechado';
    desconto: number;
    dataVenda: Date;
    valorRecebido: number;
  }
