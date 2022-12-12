import { Component, OnInit } from "@angular/core";
import { sociosService } from "../_services/socios.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NovoSocioComponent } from "../novo-socio/novo-socio.component";
import { SocioModel } from "../_models/socio.model";

@Component({
  selector: "app-receber",
  templateUrl: "./receber.component.html",
  styleUrls: ["./receber.component.scss"],
})
export class ReceberComponent implements OnInit {
  socioSelecionado: SocioModel;
  constructor(private sociosService: sociosService, private matDialog: MatDialog) {}

  dataSocios: SocioModel[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";

  ngOnInit(): void {
    this.getData();
  }

  pegarSocio(socio: SocioModel) {
    this.socioSelecionado = socio;
  }

  getData() {
    this.sociosService.getSocios().subscribe({
      next: (data) => (this.dataSocios = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataSocios),
    });
  }

  adicionarNovoSocio() {
    const dialogRef = this.matDialog.open(NovoSocioComponent, {
      panelClass: "NovoSocioComponent",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  editarSocio(socio: SocioModel) {
    const dialogRef = this.matDialog.open(NovoSocioComponent, {
      panelClass: "NovoSocioComponent",
      data: {
        socioData: socio,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }
}
