import { Pipe, PipeTransform } from "@angular/core";
import { ProdutoModel } from "../_models/data.model";

@Pipe({
  name: "buscaTipo",
})
export class buscaTipoPipe implements PipeTransform {
  transform(listItems: ProdutoModel[], tipo: string) {
    if (tipo) {
      console.log(tipo);
      return listItems.filter((item: any) => item.tipo.includes(tipo));
    } else {
      return listItems;
    }
  }
}
