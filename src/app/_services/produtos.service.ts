import { Injectable } from "@angular/core";
import { ProdutoModel } from "../_models/produto.model";
import { HttpClient } from "@angular/common/http";
import { first, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class produtosService {
  constructor(private http: HttpClient) {}

  getProdutos() {
    return this.http.get<ProdutoModel[]>("http://localhost:3000/produtos");
  }

  getProdutosArray(): Promise<ProdutoModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ProdutoModel[]>("http://localhost:3000/produtos")
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

  adicionarProduto(produto: ProdutoModel): Observable<Object> {
    return this.http.post<ProdutoModel>("http://localhost:3000/produtos", produto);
  }

  editarProduto(produto: ProdutoModel, id: number): Observable<Object> {
    return this.http.put<ProdutoModel>("http://localhost:3000/produtos/" + id, produto);
  }

  deletarProduto(id: number): Observable<Object> {
    return this.http.delete<ProdutoModel>("http://localhost:3000/produtos/" + id);
  }

}
