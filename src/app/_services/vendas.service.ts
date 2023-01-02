import { Injectable } from '@angular/core';
import { vendaModel } from '../_models/venda.model';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  constructor(private http: HttpClient) { }

  // getSocios() {
  //   return this.http.get<SocioModel[]>("http://localhost:3000/socios");
  // }

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
