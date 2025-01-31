import { Injectable } from "@angular/core";
import { ProdutoModel } from "../../_models/produto.model";
import { HttpClient } from "@angular/common/http";
import { first, map, Observable } from "rxjs";
import { ProdutosService } from "./produtos.service";
import { ApiCreateProductDto, ApiProduct, ApiUpdateProductDto } from "./api.model";

@Injectable({
  providedIn: "root",
})
export class ProdutosServiceApiProductsImpl implements ProdutosService {
  constructor(private http: HttpClient) {}

  getProdutos(): Observable<ProdutoModel[]> {
    return this.http.get<ApiProduct[]>("http://localhost:3000/products")
      .pipe(
        map(products => products.map(product => this.toProdutoModel(product)))
      );
  }

  getProdutosArray(): Promise<ProdutoModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get<ApiProduct[]>("http://localhost:3000/products")
        .pipe(
          first(),
          map(products => products.map(product => this.toProdutoModel(product)))
        )
        .subscribe({
          next: (v) => resolve(v),
          error: (e) => reject(e)
        })
    });
  }

  adicionarProduto(produto: ProdutoModel): Observable<ProdutoModel> {
    return this.http.post<ApiProduct>("http://localhost:3000/products", this.toApiCreateProductDto(produto))
      .pipe(
        map(product => this.toProdutoModel(product))
      );
  }

  editarProduto(produto: ProdutoModel, id: number): Observable<ProdutoModel> {
    return this.http.patch<ApiProduct>("http://localhost:3000/products/" + id, this.toApiUpdateProductDto(produto))
      .pipe(
        map(product => this.toProdutoModel(product))
      );
  }

  deletarProduto(id: number): Observable<ProdutoModel> {
    return this.http.delete<ProdutoModel>("http://localhost:3000/products/" + id);
  }

  private toProdutoModel(product: ApiProduct): ProdutoModel {
    return {
      id: product.id,
      ativo: product.isActive,
      nome: product.name,
      precoCusto: 0, // TODO
      precoVenda: product.value ?? 0,
      qtdVendas: 0, // TODO
      tipo: {
        id: product.category.id,
        nome: product.category.name
      },
      dataCompra: new Date(), // TODO
      status: product.isActive ? "ativo" : "inativo"
    }
  }

  private toApiCreateProductDto(produto: ProdutoModel): ApiCreateProductDto {
    return {
      name: produto.nome,
      value: produto.precoVenda,
      categoryId: produto.tipo.id,
      description: undefined // TODO
    }
  }

  private toApiUpdateProductDto(produto: ProdutoModel): ApiUpdateProductDto {
    return {
      name: produto.nome,
      value: produto.precoVenda,
      categoryId: produto.tipo.id,
      description: undefined // TODO
    }
  }

}
