import { Observable } from "rxjs";
import { PagamentoProdutosModel } from "src/app/_models/pagamento.model";

export abstract class PagamentosService {
  abstract adicionarPagamentoProdutos: (pagamentoProdutos: PagamentoProdutosModel) => Observable<any>;
}
