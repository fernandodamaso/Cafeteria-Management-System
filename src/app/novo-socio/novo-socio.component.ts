import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { subscriptionLogsToBeFn } from "rxjs/internal/testing/TestScheduler";
import { GrauModel, SocioModel } from "../_models/data.model";

export interface dialogData {
  editar: boolean;
  socioData: SocioModel;
}

@Component({
  selector: "app-novo-socio",
  templateUrl: "./novo-socio.component.html",
  styleUrls: ["./novo-socio.component.scss"],
})
export class NovoSocioComponent implements OnInit {
  constructor(
    // @Inject(MAT_DIALOG_DATA) public socioData: dialogData
    @Inject(MAT_DIALOG_DATA) public socioData: dialogData
  ) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
      this.editar = true;
    }
  }

  informacoesSocio: SocioModel;
  editar: boolean;
  nome: string;
  telefone: string;
  nucleo: string;
  grau: string;

  ngOnInit(): void {
    if (this.socioData) {
      this.nome = this.informacoesSocio.nome;
      this.telefone = this.informacoesSocio.telefone;
      this.nucleo = this.informacoesSocio.nucleo;
      this.grau = this.informacoesSocio.grau[0].nome;
    }
  }
}
