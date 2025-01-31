import { tipoModel } from "src/app/_models/tipo.model";
import { Observable } from "rxjs";

export abstract class TiposService {
  abstract getCategorias: () => Observable<tipoModel[]>;
}
