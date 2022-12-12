import { Injectable } from "@angular/core";
import { SocioModel } from "../_models/data.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})

export class sociosService {
  constructor(private http: HttpClient) {}

  getSocios() {
    return this.http.get<SocioModel[]>("http://localhost:3000/socios");
  }

  adicionarSocio(socio: SocioModel): Observable<Object> {
    return this.http.post<SocioModel>("http://localhost:3000/socios", socio);
  }

  editarSocio(socio: SocioModel, id: number): Observable<Object> {
    return this.http.put<SocioModel>("http://localhost:3000/socios/" + id, socio);
  }

  deletarSocio(id: number): Observable<Object> {
    return this.http.delete<SocioModel>("http://localhost:3000/socios/" + id);
  }

}
