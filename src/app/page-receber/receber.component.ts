import { Component, OnInit } from '@angular/core';
import { SociosService } from '../_services/socios/socios.service';
import { MatDialog } from '@angular/material/dialog';
import { NovoSocioComponent } from './novo-socio/novo-socio.component';
import { SocioModel } from '../_models/socio.model';
import { PagarComponent } from '../modal-pagar/pagar.component';
import { ReciboComponent } from './reciboModal/recibo.component';
import { VendasService } from '../_services/vendas/vendas.service';
import { ProdutosService } from '../_services/produtos/produtos.service';
import { ProdutoModel } from '../_models/produto.model';
import { vendaModel } from '../_models/venda.model';
import { DialogConfirmacaoComponent } from '../_shared/dialog-confirmacao/dialog-confirmacao.component';

@Component({
  selector: 'app-receber',
  templateUrl: './receber.component.html',
  styleUrls: ['./receber.component.scss'],
})
export class ReceberComponent implements OnInit {
  socioSelecionado: SocioModel;
  constructor(
    private sociosService: SociosService,
    private vendasService: VendasService,
    private produtosService: ProdutosService,

    private matDialog: MatDialog,
  ) {}

  filterSocios = '';
  filterProdutos = '';
  filterGrau = '';
  filterTipo = '';
  filterNome = '';
  filterNucleo = '';
  dataVendas: vendaModel[] = [];
  vendasAbertas: vendaModel[] = [];
  dataSocios: SocioModel[] = [];
  dataProdutos: ProdutoModel[] = [];
  listaNucleos: string[] = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.dataSocios = await this.sociosService.getSociosArray();
    this.dataVendas = await this.vendasService.getVendasArray();
    this.dataProdutos = await this.produtosService.getProdutosArray();
    this.getVendasAbertas();
    this.getListaNucleos();
  }

  getListaNucleos() {
    this.listaNucleos = Array.from(new Set(this.dataSocios.map((el) => el.nucleo.nome)));
  }

  getVendasAbertas() {
    this.vendasAbertas = this.dataVendas.filter((venda: any) => venda.status === 'aberto');
  }

  adicionarNovoSocio() {
    const dialogRef = this.matDialog.open(NovoSocioComponent, {
      panelClass: 'NovoSocioComponent',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }

  deletarSocioModal(id: number) {
    const dialogRef = this.matDialog.open(DialogConfirmacaoComponent, {
      panelClass: 'dialogConfirmacao',
      data: {
        titulo: 'Deletar Sócio',
        mensagem: 'Deseja realmente deletar este sócio?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Sim') {
        this.deletarSocio(id);
      }
    });
  }

  deletarSocio(id: number) {
    this.sociosService.deletarSocio(id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {
        console.log('Sócio deletado');
        this.getData();
      },
    });
  }

  abrirPagar(socio: SocioModel) {
    console.log(socio);
    const dialogRef = this.matDialog.open(PagarComponent, {
      panelClass: 'PagarComponent',
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
      panelClass: 'reciboComponent',
      data: {
        socioData: socio,
        vendas: this.vendasAbertas,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  editarSocio(socio: SocioModel) {
    const dialogRef = this.matDialog.open(NovoSocioComponent, {
      panelClass: 'NovoSocioComponent',
      data: {
        socioData: socio,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  buscaFilterNome(event: any) {
    this.filterNome = event;
  }
  buscaFiltroGrau(event: any) {
    this.filterGrau = event;
  }
  buscaFilterNucleo(event: any) {
    this.filterNucleo = event;
  }
}
