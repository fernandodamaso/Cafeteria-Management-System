import { ProdutoModel } from "./produto.model";
import { tipoModel } from "./tipo.model";

export class produtosAgrupados {
  nome: string;
  id: number;
  qtd: number;
  tipo: tipoModel;
  listaProdutos: ProdutoModel[];
}
