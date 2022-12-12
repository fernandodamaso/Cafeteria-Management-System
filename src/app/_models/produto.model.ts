import { categoriaModel } from "./categoria.model";

export interface ProdutoModel {
    id: number;
    nome: string;
    precoVenda: number;
    precoCusto: number;
    tipo: string;
    qtdVendas: number;
    status: boolean;
    categoria: categoriaModel;
  }
