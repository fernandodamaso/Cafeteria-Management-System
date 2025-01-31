import { ProdutoModel } from "../../_models/produto.model";
import { Observable } from "rxjs";

export abstract class ProdutosService {
  abstract getProdutos: () => Observable<ProdutoModel[]>;
  abstract getProdutosArray: () => Promise<ProdutoModel[]>;
  abstract adicionarProduto: (produto: ProdutoModel) => Observable<ProdutoModel>;
  abstract editarProduto: (produto: ProdutoModel, id: number) => Observable<ProdutoModel>;
  abstract deletarProduto: (id: number) => Observable<ProdutoModel>;
}
