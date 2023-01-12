import { tipoModel } from "./tipo.model";

export class ProdutoModel {
    id: number;
    nome: string;
    precoVenda: number;
    precoCusto: number;
    qtdVendas: number;
    ativo: boolean;
    tipo: tipoModel;
    dataCompra?: Date;
    status?: string;
  }
