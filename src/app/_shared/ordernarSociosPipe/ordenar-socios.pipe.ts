import { Pipe, PipeTransform } from "@angular/core";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "ordenarSocios",
})
export class OrdenarSociosPipe implements PipeTransform {
  transform(socios: SocioModel[]): SocioModel[] {

    const sociosOrdenados = socios.sort((a, b) => {
      const rankPriority = ["QM", "CDC", "CI", "QS", "VI"];
      const rankA = rankPriority.indexOf(a.grau);
      const rankB = rankPriority.indexOf(b.grau);

      if (rankA > rankB) {
        return 1;
      } else if (rankA < rankB) {
        return -1;
      } else {
        if (a.nome < b.nome) {
          return -1;
        } else if (a.nome > b.nome) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    return sociosOrdenados;
  }
}
