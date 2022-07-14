import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "buscaPalavras",
})
export class BuscaPalavrasPipe implements PipeTransform {
  // o primeiro parametro são os dados que vão entrar
  // o segundo parametro pode ser um array de parametros, como ...args: any[]
  // Ou pode colocar direto o parametro como esta feito abaixo.
  transform(listItems: any[], filterText: string) {
    // ele remove os espaços da string com o trim, e coloca tudo em lowercase

    if (filterText) {
      // Pra cada item, com o includes, ele confere se tem o filterText dentro do items.description
      return listItems.filter((item: any) => item.description.toLowerCase().includes(filterText));
    } else {
      return listItems;
    }
  }
}
