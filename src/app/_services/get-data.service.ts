import { Injectable } from "@angular/core";
import { GrauModel, HistoricoModel, ProdutoModel, SocioModel } from "../_models/data.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class GetDataService {
  constructor(private http: HttpClient) {}

  getGraus() {
    return this.http.get<GrauModel[]>("http://localhost:3000/graus");
  }

  getHistorico() {
    return this.http.get<HistoricoModel[]>("http://localhost:3000/historico");
  }

}
