import { Observable } from "rxjs";
import { SocioModel } from "src/app/_models/socio.model";

export abstract class SociosService {
  abstract getSocios: () => Observable<SocioModel[]>;
  abstract getSociosArray: () => Promise<SocioModel[]>;
  abstract adicionarSocio: (socio: SocioModel) => Observable<SocioModel>;
  abstract editarSocio: (socio: SocioModel, id: number) => Observable<SocioModel>;
  abstract deletarSocio: (id: number) => Observable<SocioModel>;
}
