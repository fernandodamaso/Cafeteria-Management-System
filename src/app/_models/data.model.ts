export interface DataModel {
  socios: SocioModel[];
  produtos: ProdutoModel[];
  historico: HistoricoModel[];
  grau: GrauModel[];
  categoria: categoriaModel[];
}

export interface GrauModel {
  id: number;
  nome: string;
}
export interface categoriaModel {
  id: number;
  nome: string;
}

export interface HistoricoModel {
  cliente: string;
  historico: string;
  data: Date;
}

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

export interface SocioModel {
  id: number;
  nome: string;
  telefone: string;
  nucleo: string;
  saldo: number;
  credito: number;
  grau: GrauModel[];
  produtosEmAberto: ProdutoModel[];
}

