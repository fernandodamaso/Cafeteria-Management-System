import { Observable } from "rxjs";
import { nucleoModel } from "src/app/_models/nucleo.model";

export abstract class NucleosService {
  abstract getNucleos: () => Observable<nucleoModel[]>;
  abstract adicionarNucleo: (nucleo: nucleoModel) => Observable<nucleoModel>;
}
