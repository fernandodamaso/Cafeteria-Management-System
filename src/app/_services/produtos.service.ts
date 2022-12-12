import { Injectable } from "@angular/core";
import { ProdutoModel } from "../_models/produto.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class produtosService {
  constructor(private http: HttpClient) {}

  getProdutos() {
    return this.http.get<ProdutoModel[]>("http://localhost:3000/produtos");
  }

  deletarProduto(id: number) {
    console.log(id)
    return this.http.get<ProdutoModel[]>("http://localhost:3000/produtos");
  }

}
