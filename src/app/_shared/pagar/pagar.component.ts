import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SocioModel } from "src/app/_models/socio.model";
import { sociosService } from "src/app/_services/socios.service";

export interface dialogData {
  editar: boolean;
  socioData: SocioModel;
}
@Component({
  selector: "app-pagar",
  templateUrl: "./pagar.component.html",
  styleUrls: ["./pagar.component.scss"],
})
export class PagarComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PagarComponent>, private sociosService: sociosService, @Inject(MAT_DIALOG_DATA) public socioData: dialogData) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
      console.log(socioData);
    }
  }

  informacoesSocio: SocioModel;
  valorTotal: number;
  valorRecebel: number;
  desconto: number;
  date = new FormControl(new Date());
  dataCompra: Date;

  ngOnInit(): void {
    this.calcularValorTotal();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    // this.dataCompra = event;
  }

  calcularValorTotal() {
    let listaPrecoVenda = [];

    for (let i = 0; i < this.informacoesSocio.produtosEmAberto.length; i++) {
      listaPrecoVenda.push(this.informacoesSocio.produtosEmAberto[i].precoVenda);
    }

    let somaTotal: number = listaPrecoVenda
      .map((a) => a)
      .reduce(function (a, b) {
        return a + b;
      });

    somaTotal = somaTotal * -1;
    this.valorTotal = somaTotal + this.informacoesSocio.saldo;
  }
}
