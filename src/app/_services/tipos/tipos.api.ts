import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tipoModel } from "../../_models/tipo.model";
import { TiposService } from "./tipos.service";
import { ApiProductCategory } from "./api.model";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TiposServiceApiProductCategoryImpl implements TiposService {
  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<ApiProductCategory[]>("http://localhost:3000/productcategories")
      .pipe(
        map( productCategories => productCategories.map( productCategory => this.toTipoModel(productCategory) ) )
      )
  }

  private toTipoModel(productCategory: ApiProductCategory): tipoModel {
    return {
      id: productCategory.id,
      nome: productCategory.name
    }
  }
}
