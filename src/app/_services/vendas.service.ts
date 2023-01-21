import { Injectable } from '@angular/core';
import { vendaModel } from '../_models/venda.model';
import { HttpClient } from "@angular/common/http";
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class vendasService {

  constructor(private http: HttpClient) { }

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

  adicionarVenda(venda: vendaModel): Observable<Object> {
    return this.http.post<vendaModel>("http://localhost:3000/vendas", venda);
  }

  // editarSocio(socio: SocioModel, id: number): Observable<Object> {
  //   return this.http.put<SocioModel>("http://localhost:3000/socios/" + id, socio);
  // }

  // deletarSocio(id: number): Observable<Object> {
  //   return this.http.delete<SocioModel>("http://localhost:3000/socios/" + id);
  // }

}
