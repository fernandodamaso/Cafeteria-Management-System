import { GrauModel } from "./grau.model";
import { ProdutoModel } from "./produto.model";

export class SocioModel {
    id: number;
    nome: string;
    telefone: string;
    nucleo: string;
    credito: number;
    historicoValorTotal: number;
    grau: GrauModel[];
    produtosEmAberto: ProdutoModel[];
  }

