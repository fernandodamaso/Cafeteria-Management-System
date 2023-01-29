import { tipoModel } from "./tipo.model";

export class ProdutoModel {
  id: number = 0;
  nome: string = "";
  precoVenda: number = 0;
  precoCusto: number = 0;
  qtdVendas: number = 0;
  ativo: boolean = true;
  tipo: tipoModel = new tipoModel();
  dataCompra?: Date = new Date();
  status?: "ativo" | "inativo" = "ativo";
}
