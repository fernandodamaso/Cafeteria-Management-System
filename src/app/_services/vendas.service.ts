import { Injectable } from "@angular/core";
import { vendaModel } from "../_models/venda.model";
import { HttpClient } from "@angular/common/http";
import { first, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class vendasService {
  constructor(private http: HttpClient) {}

  getVendas() {
    return this.http.get<vendaModel[]>("http://localhost:3000/vendas");
  }

  getVendasArray(): Promise<vendaModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<vendaModel[]>("http://localhost:3000/vendas")
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

  editarVendas(venda: vendaModel): Observable<Object> {
    return this.http.put<vendaModel>(
      "http://localhost:3000/vendas/" + venda.id,
      venda
    );
  }

  deletarVenda(id: number): Observable<Object> {
    return this.http.delete<vendaModel>(
      "http://localhost:3000/vendas/" + id
    );
  }

  adicionarVenda(venda: vendaModel): Observable<Object> {
    return this.http.post<vendaModel>("http://localhost:3000/vendas/", venda);
  }
}
