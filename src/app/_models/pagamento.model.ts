import { ProdutoModel } from "./produto.model";

export class PagamentoProdutosModel {
    id?: number;
    idCliente: number;
    valorPago: number;
    produtosVendidos: number[];
    formaPagamento: 'pix'|'cartão'|'dinheiro';
    desconto: number;
    dataQuitacao?: Date;
  }
