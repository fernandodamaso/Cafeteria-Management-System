import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { subscriptionLogsToBeFn } from "rxjs/internal/testing/TestScheduler";
import { GrauModel, SocioModel } from "../_models/data.model";
import { GetDataService } from "../_services/get-data.service";

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
  constructor(public dialogRef: MatDialogRef<NovoSocioComponent>, private GetDataService: GetDataService, @Inject(MAT_DIALOG_DATA) public socioData: dialogData) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
      this.editar = true;
    }
  }

  informacoesSocio: SocioModel;
  editar: boolean;
  nome: string;
  id: number;
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

  deletarSocio() {
    this.GetDataService.deletarSocio(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close("Pizza!"),
    });
  }

  postData() {
    if (this.socioData) {
      this.informacoesSocio.nome = this.nome;
      this.informacoesSocio.telefone = this.telefone;
      this.informacoesSocio.nucleo = this.nucleo;
      this.informacoesSocio.grau[0].nome = this.grau;

      this.GetDataService.editarSocio(this.informacoesSocio, this.informacoesSocio.id).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    } else {
      let novoSocio: SocioModel;
      novoSocio = new SocioModel();
      novoSocio.nome = this.nome;
      novoSocio.telefone = this.telefone;
      novoSocio.nucleo = this.nucleo;
      novoSocio.saldo = 0;
      novoSocio.grau = [];
      let novoGrau: GrauModel;
      novoGrau = {
        nome: this.grau,
      };
      novoSocio.grau.push(novoGrau);

      this.GetDataService.adicionarSocio(novoSocio).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    }
  }
}
