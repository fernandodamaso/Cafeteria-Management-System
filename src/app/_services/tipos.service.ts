import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tipoModel } from "../_models/tipo.model";
@Injectable({
  providedIn: "root",
})
export class tipoService {
  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<tipoModel[]>("http://localhost:3000/tipos");
  }
}
