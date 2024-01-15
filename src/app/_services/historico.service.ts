import { Injectable } from "@angular/core";
import { historicoModel } from "../_models/historico.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class historicoService {
  constructor(private http: HttpClient) {}

  getHistorico() {
    return this.http.get<historicoModel[]>("http://localhost:3000/historico");
  }

}
