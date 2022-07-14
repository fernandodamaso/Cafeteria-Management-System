import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "buscaPalavras",
})
export class BuscaPalavrasPipe implements PipeTransform {
  transform(listItems: any[], filterSocios: string) {
    if (filterSocios) {
      return listItems.filter((item: any) => item.nome.toLowerCase().includes(filterSocios));
    } else {
      return listItems;
    }
  }
}
