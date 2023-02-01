import { ProdutoModel } from "./produto.model";

export class vendaModel {
    id: number;
    idCliente: number;
    produtosAbertos: ProdutoModel[];
    produtosVendidos: ProdutoModel[];
    status: 'aberto'|'fechado';
    formaPagamento: 'pix'|'cartão'|'dinheiro';
    desconto: number;
    dataVenda: Date;
    dataQuitacao?: Date;
    valorRecebido: number;
  }
