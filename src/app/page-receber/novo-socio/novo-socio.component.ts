import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NovoNucleoComponent } from "../../modal-novo-nucleo/novo-nucleo.component";
import { nucleoModel } from "../../_models/nucleo.model";
import { SocioModel } from "../../_models/socio.model";
import { NucleosService } from "../../_services/nucleos/nucleos.service";
import { SociosService } from "../../_services/socios/socios.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  public model: SocioModel;
  public formGroup: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NovoSocioComponent>,
    private sociosService: SociosService,
    private nucleosService: NucleosService,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public socioData: dialogData
  ) {
    this.model = new SocioModel();
    this.formGroup = this.formBuilder.group(this.model);
    if (socioData) {
      this.formGroup = this.formBuilder.group(this.model);
      this.informacoesSocio = socioData.socioData;
      this.editar = true;
      this.formGroup.patchValue(this.informacoesSocio);
    }
    this.formGroup.addControl("idNucleo", new FormControl(this.informacoesSocio?.nucleo?.id || 0));
  }

  initValidators() {
    this.formGroup.controls.nome.setValidators(Validators.required);
    this.formGroup.controls.telefone.setValidators(Validators.required);
    this.formGroup.controls.grau.setValidators(Validators.required);
    this.formGroup.controls.idNucleo.setValidators(Validators.required);
  }

  informacoesSocio: SocioModel;
  editar: boolean;
  nome: string;
  id: number;
  telefone: string;
  nucleos: nucleoModel[];
  nucleoSocio: nucleoModel;
  selectedIdSocio?: number;

  ngOnInit(): void {
    this.initValidators();
    this.getNucleos();
    if (this.socioData) {
      this.nome = this.informacoesSocio.nome;
      this.telefone = this.informacoesSocio.telefone;
    }
    console.log(this.informacoesSocio);
  }

  getNucleos() {
    this.nucleosService.getNucleos().subscribe({
      next: (data) => (this.nucleos = data),
      error: (e) => console.error(e),
      complete: () => {
        this.selectedIdSocio = this.informacoesSocio?.nucleo?.id;
      },
    });
  }

  deletarSocio() {
    this.sociosService.deletarSocio(this.id).subscribe({
      next: (data) => data,
      error: (e) => {
        console.error(e);
        this.snackBar.open("Erro ao deletar sócio", "fechar", {
          duration: 3000,
          panelClass: "erro",
        });
      },
      complete: () => {
        this.snackBar.open(this.informacoesSocio.nome + "  deletado", "fechar", {
          duration: 3000,
          panelClass: "sucesso",
        });
        this.dialogRef.close();
      },
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

  abrirSnack(mensagem: string, classe: string, tempo: number) {
    this.snackBar.open(mensagem, "fechar", {
      duration: tempo,
      panelClass: classe,
    });
  }

  postData() {
    const valoresForms = this.formGroup.value;

    valoresForms.nucleo = this.nucleos.find((el) => {
      return el.id === valoresForms.idNucleo;
    });

    delete valoresForms.idNucleo;

    if (this.informacoesSocio) {
      this.sociosService.editarSocio(valoresForms, valoresForms.id).subscribe({
        next: (data) => data,
        error: (e) => {
          console.error(e);
          this.abrirSnack("Erro ao editar sócio", "erro", 3000);
        },
        complete: () => {
          this.abrirSnack("Sócio editado com sucesso", "sucesso", 3000);
          this.dialogRef.close();
        },
      });
    } else {
      this.sociosService.adicionarSocio(valoresForms).subscribe({
        next: (data) => data,
        error: (e) => {
          console.error(e);
          this.abrirSnack("Erro ao adicionar sócio", "erro", 3000);
        },
        complete: () => {
          this.abrirSnack("Sócio adicionado com sucesso", "sucesso", 3000);
          this.dialogRef.close();
        },
      });
    }
  }
}
