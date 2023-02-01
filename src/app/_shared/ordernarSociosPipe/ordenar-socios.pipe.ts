import { Pipe, PipeTransform } from "@angular/core";
import { SocioModel } from "src/app/_models/socio.model";

@Pipe({
  name: "ordenarSocios",
})
export class OrdenarSociosPipe implements PipeTransform {
  transform(socios: SocioModel[]): SocioModel[] {

    const sociosOrdenados = socios.sort(function (a, b) {
      if (a.grau === "QM" && b.grau !== "QM") {
        return -1;
      }
      if (a.grau !== "QM" && b.grau === "QM") {
        return 1;
      }

      if (a.grau === "CDC" && b.grau !== "CDC") {
        return -1;
      }
      if (a.grau !== "CDC" && b.grau === "CDC") {
        return 1;
      }

      if (a.grau === "CI" && b.grau !== "CI") {
        return -1;
      }
      if (a.grau !== "CI" && b.grau === "CI") {
        return 1;
      }

      if (a.grau === "QS" && b.grau !== "QS") {
        return -1;
      }
      if (a.grau !== "QS" && b.grau === "QS") {
        return 1;
      }

      if (a.grau === "VI" && b.grau !== "VI") {
        return -1;
      }
      if (a.grau !== "VI" && b.grau === "VI") {
        return 1;
      }

      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });

    return sociosOrdenados;
  }
}
