import { Component, OnInit } from "@angular/core";
import { SocioModel } from "../_models/data.model";
import { GetDataService } from "../_services/get-data.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { VenderComponent } from "../vender/vender.component";
import { NovoSocioComponent } from "../novo-socio/novo-socio.component";

@Component({
  selector: "app-receber",
  templateUrl: "./receber.component.html",
  styleUrls: ["./receber.component.scss"],
})
export class ReceberComponent implements OnInit {
  socioSelecionado: SocioModel;
  constructor(private GetDataService: GetDataService, private matDialog: MatDialog) {}

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
    this.GetDataService.getSocios().subscribe({
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
