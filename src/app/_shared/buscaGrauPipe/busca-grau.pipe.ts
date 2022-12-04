import { Pipe, PipeTransform } from "@angular/core";
import { SocioModel } from "src/app/_models/data.model";

@Pipe({
  name: "buscaGrau",
})
export class BuscaGrauPipe implements PipeTransform {
  transform(listItems: SocioModel[], grau: string) {
    if (grau) {
      return listItems.filter((item: any) => item.grau.includes(grau));
    } else {
      return listItems;
    }
  }
}
