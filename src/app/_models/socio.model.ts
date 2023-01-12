import { GrauModel } from "./grau.model";
import { nucleoModel } from "./nucleo.model";
import { ProdutoModel } from "./produto.model";

export class SocioModel {
    id: number;
    nome: string;
    telefone: string;
    nucleo: nucleoModel;
    credito: number;
    historicoValorTotal: number;
    grau: GrauModel[];
    produtosEmAberto: ProdutoModel[];
  }

