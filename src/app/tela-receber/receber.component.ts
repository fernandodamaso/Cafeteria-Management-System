import { Component, OnInit } from "@angular/core";
import { sociosService } from "../_services/socios.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NovoSocioComponent } from "../novo-socio/novo-socio.component";
import { SocioModel } from "../_models/socio.model";
import { PagarComponent } from "../_shared/pagar/pagar.component";
import { ReciboComponent } from "../_shared/recibo/recibo.component";
import { vendasService } from "../_services/vendas.service";
import { produtosService } from "../_services/produtos.service";
import { ProdutoModel } from "../_models/produto.model";
import { vendaModel } from "../_models/venda.model";

@Component({
  selector: "app-receber",
  templateUrl: "./receber.component.html",
  styleUrls: ["./receber.component.scss"],
})
export class ReceberComponent implements OnInit {
  socioSelecionado: SocioModel;
  constructor(
    private sociosService: sociosService,
    private vendasService: vendasService,
    private produtosService: produtosService,

    private matDialog: MatDialog
  ) {}

  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";
  dataVendas: vendaModel[] = [];
  vendasAbertas: vendaModel[] = [];
  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.dataSocios = await this.sociosService.getSociosArray();
    this.dataVendas = await this.vendasService.getVendasArray();
    this.dataProdutos = await this.produtosService.getProdutosArray();
    this.getVendasAbertas();
    // this.abrirRecibo(this.dataSocios[0])
  }

  getVendasAbertas() {
    this.vendasAbertas = this.dataVendas.filter(
      (venda: any) => venda.status === "aberto"
    );
  }

  adicionarNovoSocio() {
    const dialogRef = this.matDialog.open(NovoSocioComponent, {
      panelClass: "NovoSocioComponent",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  deletarSocio(id: number) {
    this.sociosService.deletarSocio(id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {
        console.log("Sócio deletado");
        this.getData();
      },
    });
  }

  abrirPagar(socio: SocioModel) {
    const dialogRef = this.matDialog.open(PagarComponent, {
      panelClass: "PagarComponent",
      data: {
        socioData: socio,
        vendasData: this.dataVendas,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  abrirRecibo(socio: SocioModel) {
    const dialogRef = this.matDialog.open(ReciboComponent, {
      panelClass: "reciboComponent",
      data: {
        socioData: socio,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
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
