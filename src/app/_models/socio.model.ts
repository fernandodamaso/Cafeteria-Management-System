import { GrauModel } from "./grau.model";
import { nucleoModel } from "./nucleo.model";
import { ProdutoModel } from "./produto.model";

export class SocioModel {
  id: number = 0;
  nome: string = "";
  telefone: string = "";
  nucleo: nucleoModel = new nucleoModel();
  credito: number = 0;
  grau: grauSocioEnum = grauSocioEnum.QS;
  produtosEmAberto: ProdutoModel[] = [];
}

export enum grauSocioEnum {
  VI = "VI",
  QS = "QS",
  CI = "CI",
  CDC = "CDC",
  QM = "QM"
}
