import { categoriaModel } from "./categoria.model";

export class ProdutoModel {
    id: number;
    nome: string;
    precoVenda: number;
    precoCusto: number;
    tipo: string;
    qtdVendas: number;
    status: boolean;
    categoria: categoriaModel;
  }
