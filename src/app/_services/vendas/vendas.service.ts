import { Observable } from "rxjs";
import { vendaModel } from "src/app/_models/venda.model";

export abstract class VendasService {
  abstract getVendas: () => Observable<vendaModel[]>;
  abstract getVendasArray: () => Promise<vendaModel[]>;
  abstract adicionarVenda: (venda: vendaModel) => Observable<vendaModel>;
  abstract editarVenda: (venda: vendaModel) => Observable<vendaModel>;
  abstract deletarVenda: (id: number) => Observable<vendaModel>;
}
