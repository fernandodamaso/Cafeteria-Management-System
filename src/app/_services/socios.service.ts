import { Injectable } from "@angular/core";
import { SocioModel } from "../_models/socio.model";
import { HttpClient } from "@angular/common/http";
import { first, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class sociosService {
  constructor(private http: HttpClient) {}

  getSocios() {
    return this.http.get<SocioModel[]>("http://localhost:3000/socios");
  }

  // to do: Verificar para utilizar o rxjs

  getSociosArray(): Promise<SocioModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<SocioModel[]>("http://localhost:3000/socios")
        .pipe(first())
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  adicionarSocio(socio: SocioModel): Observable<Object> {
    return this.http.post<SocioModel>("http://localhost:3000/socios", socio);
  }

  editarSocio(socio: SocioModel, id: number): Observable<Object> {
    return this.http.put<SocioModel>(
      "http://localhost:3000/socios/" + id,
      socio
    );
  }

  deletarSocio(id: number): Observable<Object> {
    return this.http.delete<SocioModel>("http://localhost:3000/socios/" + id);
  }
}
