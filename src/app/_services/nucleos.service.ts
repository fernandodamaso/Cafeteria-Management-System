import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { nucleoModel } from "../_models/nucleo.model";
@Injectable({
  providedIn: "root",
})

export class nucleosService {
  constructor(private http: HttpClient) {}

  getNucleos() {
    return this.http.get<nucleoModel[]>("http://localhost:3000/nucleos");
  }

  adicionarNucleo(nucleo: nucleoModel): Observable<Object> {
    return this.http.post<nucleoModel>("http://localhost:3000/nucleos", nucleo);
  }

  // editarSocio(nucleo: nucleoModel, id: number): Observable<Object> {
  //   return this.http.put<nucleoModel>(
  //     "http://localhost:3000/nucleos/" + id,
  //     nucleo
  //   );
  // }

  // deletarSocio(id: number): Observable<Object> {
  //   return this.http.delete<nucleoModel>("http://localhost:3000/nucleos/" + id);
  // }
}
