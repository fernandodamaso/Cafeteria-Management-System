import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { nucleoModel } from "../../_models/nucleo.model";
import { NucleosService } from "./nucleos.service";
import { ApiCreateNucleoDto, ApiNucleo } from "./api.model";

@Injectable({
  providedIn: "root",
})
export class NucleosServiceApiNucleosImpl implements NucleosService {
  constructor(private http: HttpClient) {}

  getNucleos() {
    return this.http.get<ApiNucleo[]>("http://localhost:3000/nucleos")
      .pipe(
        map( nucleos => nucleos.map( nucleo => this.toNucleoModel(nucleo)))
      );
  }

  adicionarNucleo(nucleo: nucleoModel): Observable<nucleoModel> {
    return this.http.post<ApiNucleo>("http://localhost:3000/nucleos", this.toApiCreateNucleoDto(nucleo))
      .pipe(
        map( nucleo => this.toNucleoModel(nucleo) )
      );
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

  private toNucleoModel(apiNucleo: ApiNucleo): nucleoModel {
    return {
      id: apiNucleo.id,
      nome: apiNucleo.name
    }
  }

  private toApiCreateNucleoDto(nucleo: nucleoModel): ApiCreateNucleoDto {
    return {
      name: nucleo.nome
    }
  }
}
