import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "buscaPalavras",
})
export class BuscaPalavrasPipe implements PipeTransform {
  transform(listItems: any[], busca: string) {
    if (busca) {

      function replaceSpecialChars(str :string) {

        str = str.toLowerCase();
        str = str.replace(/[àáâãäå]/, "a");
        str = str.replace(/[èéêë]/, "e");
        str = str.replace(/[ií]/,"i");
        str = str.replace(/[óõô]/,"o");
        str = str.replace(/[uúû]/,"u");
        str = str.replace(/[ç]/, "c");

        return str.replace(/[^a-z]/gi, ""); // remove caracteres que não são letras
      }

      let buscaFiltrada = replaceSpecialChars(busca)
      console.log(buscaFiltrada);

      return listItems.filter(function(item){
        let nomeFiltrado = replaceSpecialChars(item.nome);
        return nomeFiltrado.toLowerCase().includes(buscaFiltrada)
      })
    } else {
      return listItems;
    }
  }
}
