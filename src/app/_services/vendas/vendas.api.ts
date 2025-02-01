import { Injectable } from "@angular/core";
import { vendaModel } from "../../_models/venda.model";
import { HttpClient } from "@angular/common/http";
import { first, map, Observable } from "rxjs";
import { VendasService } from "./vendas.service";
import { ApiCreateOrderDto, ApiOrder } from "./api.model";

@Injectable({
  providedIn: "root",
})
export class VendasServiceApiOrderImpl implements VendasService {
  constructor(private http: HttpClient) {}

  getVendas() {
    return this.http.get<ApiOrder[]>("http://localhost:3000/orders")
      .pipe(
        map( orders => orders.map( order => this.toVendaModel(order) ))
      );
  }

  getVendasArray(): Promise<vendaModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ApiOrder[]>("http://localhost:3000/orders")
        .pipe(
          first(),
          map( orders => orders.map( order => this.toVendaModel(order) ))
        )
        .subscribe({
          next: (v) => resolve(v),
          error: (e) => reject(e)
        })
    });
  }

  editarVenda(venda: vendaModel): Observable<vendaModel> {
    return this.http.put<ApiOrder>(
      "http://localhost:3000/orders/" + venda.id,
      venda
    ).pipe(
      map( order => this.toVendaModel(order) )
    );
  }

  deletarVenda(id: number): Observable<vendaModel> {
    return this.http.delete<ApiOrder>(
      "http://localhost:3000/orders/" + id
    ).pipe(
      map( order => this.toVendaModel(order) )
    );
  }

  adicionarVenda(venda: vendaModel): Observable<vendaModel> {
    return this.http.post<ApiOrder>("http://localhost:3000/orders", this.toApiCreateOrderDto(venda))
      .pipe(
        map( order => this.toVendaModel(order) )
      );
  }

  private toVendaModel(order: ApiOrder): vendaModel {
    return {
      id: order.id,
      idCliente: order.clientId,
      produtosAbertos: order.items.map( orderItem => ({
        id: orderItem.product.id,
        ativo: orderItem.product.product.isActive,
        nome: orderItem.product.product.name,
        precoCusto: 0, // TODO
        precoVenda: orderItem.product.value ?? 0,
        qtdVendas: 0, // TODO
        tipo: {
          id: orderItem.product.product.category.id,
          nome: orderItem.product.product.category.name
        },
        dataCompra: new Date(), // TODO
        status: orderItem.product.product.isActive ? "ativo" : "inativo"
      })),
      produtosVendidos: [],
      status: "aberto", // TODO
      desconto: 0,
      dataVenda: order.createdAt,
      formaPagamento: "pix", // TODO
      dataQuitacao: undefined // TODO
    }
  }

  private toApiCreateOrderDto(venda: vendaModel): ApiCreateOrderDto {
    return {
      clientId: venda.idCliente,
      items: venda.produtosAbertos.map( produto => ({
        productId: produto.id,
        quantity: 1 //TODO
      }))
    }
  }
}
