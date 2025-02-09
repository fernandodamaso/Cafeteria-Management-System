import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { PagamentosService } from "./pagamentos.service";
import { ApiCreateOrderItemPaymentDto, ApiEPaymentMethod, ApiEPaymentType, ApiOrderItemPayment } from "./api.model";
import { PagamentoProdutosModel } from "src/app/_models/pagamento.model";

@Injectable({
  providedIn: "root",
})
export class PagamentosServiceApiPaymentImpl implements PagamentosService {
  constructor(private http: HttpClient) {}

  adicionarPagamentoProdutos(pagamentoProdutos: PagamentoProdutosModel): Observable<any> {
    return this.http.post<ApiOrderItemPayment>("http://localhost:3000/payments", this.toApiCreateOrderItemPaymentDto(pagamentoProdutos))
      .pipe(
        map( order => this.toPagamentoProdutosModel(order) )
      );
  }

  private toPagamentoProdutosModel(orderItemPayment: ApiOrderItemPayment): PagamentoProdutosModel {
    return {
      id: orderItemPayment.id,
      idCliente: orderItemPayment.userId,
      desconto: orderItemPayment.discount,
      formaPagamento:
        orderItemPayment.method === ApiEPaymentMethod.PIX         ? "pix"    :
        orderItemPayment.method === ApiEPaymentMethod.CARD_CREDIT ? "cartão" :
        "dinheiro",
      valorPago: orderItemPayment.amount,
      produtosVendidos: orderItemPayment.orderItemIds,
      dataQuitacao: orderItemPayment.createdAt
    }
  }

  private toApiCreateOrderItemPaymentDto(pagamentoProdutos: PagamentoProdutosModel): ApiCreateOrderItemPaymentDto {
    return {
      type: ApiEPaymentType.ORDER_ITEM,
      method: 
        pagamentoProdutos.formaPagamento === "pix"    ? ApiEPaymentMethod.PIX         :
        pagamentoProdutos.formaPagamento === "cartão" ? ApiEPaymentMethod.CARD_CREDIT :
        ApiEPaymentMethod.CASH,
      amount: pagamentoProdutos.valorPago ?? 0,
      discount: pagamentoProdutos.desconto ?? 0,
      userId: pagamentoProdutos.idCliente,
      orderItemIds: pagamentoProdutos.produtosVendidos,
      useCredit: true
    }
  }
}
