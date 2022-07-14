export interface DataModel {
  socios:    SocioModel[];
  produtos:  ProdutoModel[];
  historico: HistoricoModel[];
  Grau:      GrauModel[];
}

export interface GrauModel {
  id:   number;
  nome: string;
}

export interface HistoricoModel {
  usuario:   string;
  historico: string;
  data:      Date;
}

export interface ProdutoModel {
  id:    string;
  nome:  string;
  preco: number;
  tipo:  string;
}

export interface SocioModel {
  nome:             string;
  grau:             string;
  credito:          number;
  whatsapp:         string;
  produtosEmAberto: ProdutoModel[];
}
