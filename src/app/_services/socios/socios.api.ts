import { Injectable } from "@angular/core";
import { grauSocioEnum, SocioModel } from "../../_models/socio.model";
import { HttpClient } from "@angular/common/http";
import { first, map, Observable } from "rxjs";
import { SociosService } from "./socios.service";
import { ApiCreateUserDto, ApiUser } from "./api.model";

@Injectable({
  providedIn: "root",
})
export class SociosServiceApiUserImpl implements SociosService {
  constructor(private http: HttpClient) {}

  getSocios(): Observable<SocioModel[]> {
    return this.http.get<ApiUser[]>("http://localhost:3000/users")
      .pipe(
        map( users => users.map( user => this.toSocioModel(user) ))
      )
  }

  getSociosArray(): Promise<SocioModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ApiUser[]>("http://localhost:3000/users")
        .pipe(
          first(),
          map( users => users.map( user => this.toSocioModel(user) ))
        )
        .subscribe({
          next: (v) => resolve(v),
          error: (e) => reject(e)
        })
    });
  }

  adicionarSocio(socio: SocioModel): Observable<SocioModel> {
    return this.http.post<ApiUser>("http://localhost:3000/users", this.toApiCreateUserDto(socio))
      .pipe(
        map( user => this.toSocioModel(user) )
      );
  }

  editarSocio(socio: SocioModel, id: number): Observable<SocioModel> {
    return this.http.put<ApiUser>("http://localhost:3000/users/" + id, this.toApiCreateUserDto(socio))
      .pipe(
        map( user => this.toSocioModel(user) )
      );
  }

  deletarSocio(id: number): Observable<SocioModel> {
    return this.http.delete<SocioModel>("http://localhost:3000/users/" + id);
  }

  private toSocioModel(user: ApiUser): SocioModel {
    return {
      id: user.id,
      nome: user.name,
      grau: user.degree.name as grauSocioEnum,
      credito: 0, // TODO
      nucleo: {
        id: user.nucleo.id,
        nome: user.nucleo.name
      },
      telefone: user.mobileNumber
    }
  } 

  private toApiCreateUserDto(socio: SocioModel): ApiCreateUserDto {
    return {
      name: socio.nome,
      mobileNumber: socio.telefone,
      degreeCode: socio.grau,
      nucleoId: socio.nucleo.id ?? 0
    }
  }
}
