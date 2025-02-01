import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject, Subscription } from "rxjs";
import { SocioModel } from "src/app/_models/socio.model";
import { MatDialog } from "@angular/material/dialog";
import { ProdutoModel } from "src/app/_models/produto.model";
import { PagarComponent } from "src/app/modal-pagar/pagar.component";
import { vendaModel } from "src/app/_models/venda.model";
import { VendasService } from "src/app/_services/vendas/vendas.service";
import { ProdutosService } from "src/app/_services/produtos/produtos.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { produtosAgrupados } from "src/app/_models/produtosAgrupados.model";

@Component({
  selector: "app-barra-venda",
  templateUrl: "./barra-venda.component.html",
  styleUrls: ["./barra-venda.component.scss"],
})
export class BarraVendaComponent implements OnInit {
  @Output() terminouCompra = new EventEmitter<boolean>();

  @Input()
  set socioSelecionado(value: SocioModel) {
    this.socioSelecionadoInterno = value;
  }

  @Input() dataVendas: vendaModel[];
  @Input() valorTotal: number;
  @Input() produtosAgrupados: produtosAgrupados[];
  @Input() listaProdutosSelecionados: ProdutoModel[];

  constructor(
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private vendasService: VendasService,
    private produtosService: ProdutosService
  ) {}

  nenhumProdutoSelecionado = false;
  socioSelecionadoInterno: SocioModel;
  saldoCliente = 0;
  listaProdutos: ProdutoModel[] = [];
  _val: Subject<ProdutoModel> = new Subject();
  date = new FormControl(new Date());
  dataCompra: Date;
  eventsSubscription: Subscription;

  ngOnInit() {}

  deletarProduto(produto: any) {
    this.listaProdutos.splice(produto, 1);
  }

  anotar(pagarAgora: boolean) {
    let venda: vendaModel;
    venda = new vendaModel();

    venda.idCliente = this.socioSelecionadoInterno.id;
    venda.produtosAbertos = this.listaProdutosSelecionados;
    venda.produtosVendidos = [];
    venda.status = "aberto";
    venda.desconto = 0;
    venda.dataVenda = this.date.value!;

    this.vendasService.adicionarVenda(venda).subscribe(
      (data) => {
        if (pagarAgora === true) {
          const dialogRef = this.matDialog.open(PagarComponent, {
            panelClass: "PagarComponent",
            data: {
              socioData: this.socioSelecionadoInterno,
            },
          });
          dialogRef.afterClosed().subscribe(() => {
            this.reiniciarVenda();
            this.abrirSnack("Compra feita com sucesso", "sucesso", 3000);
          });
        } else {
          this.reiniciarVenda();
          this.abrirSnack("Compra feita com sucesso", "sucesso", 3000);
        }
      },
      (error) => {
        console.error(error);
        this.abrirSnack("Erro ao efetuar compra", "erro", 3000);
      }
    );
  }

  private reiniciarVenda() {
    this.socioSelecionadoInterno = undefined!;
    this.listaProdutos = [];
    this.listaProdutosSelecionados = [];
    this.produtosAgrupados = [];
    this.terminouCompra.emit(true);
  }

  abrirSnack(mensagem: string, classe: string, tempo: number) {
    this.snackBar.open(mensagem, "fechar", {
      duration: tempo,
      panelClass: classe,
    });
  }
}
