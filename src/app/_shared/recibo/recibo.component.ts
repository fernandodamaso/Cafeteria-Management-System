import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SocioModel } from "src/app/_models/socio.model";

export interface dialogData {
  socioData: SocioModel;
}

@Component({
  selector: "app-recibo",
  templateUrl: "./recibo.component.html",
  styleUrls: ["./recibo.component.scss"],
})
export class ReciboComponent implements OnInit {
  valorTotal = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public socioData: dialogData) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
      // console.log(this.informacoesSocio)
    }
  }

  informacoesSocio: SocioModel;

  ngOnInit(): void {
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    let listaPrecoVenda = [];

    for (let i = 0; i < this.informacoesSocio.produtosEmAberto.length; i++) {
      listaPrecoVenda.push(
        this.informacoesSocio.produtosEmAberto[i].precoVenda
      );
    }

    let somaTotal: number = listaPrecoVenda
      .map((a) => a)
      .reduce(function (a, b) {
        return a + b;
      });
    somaTotal = somaTotal;
    this.valorTotal = somaTotal;
  }
}
