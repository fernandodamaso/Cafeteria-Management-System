import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NovoNucleoComponent } from "../novo-nucleo/novo-nucleo.component";
import { GrauModel } from "../_models/grau.model";
import { nucleoModel } from "../_models/nucleo.model";
import { SocioModel } from "../_models/socio.model";
import { nucleosService } from "../_services/nucleos.service";
import { sociosService } from "../_services/socios.service";

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
    public dialogRef: MatDialogRef<NovoSocioComponent>,
    private sociosService: sociosService,
    private nucleosService: nucleosService,
    private matDialog: MatDialog,
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
  id: number;
  telefone: string;
  nucleos: nucleoModel[];
  nucleo: nucleoModel;
  grau = "";

  ngOnInit(): void {
    this.getNucleos();
    if (this.socioData) {
      this.nome = this.informacoesSocio.nome;
      this.telefone = this.informacoesSocio.telefone;
      this.nucleo = this.informacoesSocio.nucleo;
      this.grau = this.informacoesSocio.grau[0].nome;
    }
  }

  getNucleos() {
    this.nucleosService.getNucleos().subscribe({
      next: (data) => this.nucleos = data,
      error: (e) => console.error(e),
      complete: () => {}
    });
  }

  deletarSocio() {
    this.sociosService.deletarSocio(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close("Pizza!"),
    });
  }

  adicionarNovoNucleo() {
    const dialogRef = this.matDialog.open(NovoNucleoComponent, {
      panelClass: "novoNucleoComponent",
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getNucleos();
    });
  }

  postData() {
    if (this.socioData) {
      this.informacoesSocio.nome = this.nome;
      this.informacoesSocio.telefone = this.telefone;
      this.informacoesSocio.nucleo = this.nucleo;
      this.informacoesSocio.grau[0].nome = this.grau;

      this.sociosService
        .editarSocio(this.informacoesSocio, this.informacoesSocio.id)
        .subscribe({
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
      novoSocio.credito = 0;
      novoSocio.grau = [];
      novoSocio.produtosEmAberto = [];
      let novoGrau: GrauModel;
      novoGrau = {
        nome: this.grau,
      };
      novoSocio.grau.push(novoGrau);

      this.sociosService.adicionarSocio(novoSocio).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    }
  }
}
