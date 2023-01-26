import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject, Subscription } from "rxjs";
import { SocioModel } from "src/app/_models/socio.model";
import { MatDialog } from "@angular/material/dialog";
import { ProdutoModel } from "src/app/_models/produto.model";
import { PagarComponent } from "src/app/_shared/pagar/pagar.component";
import { sociosService } from "src/app/_services/socios.service";
import { produtosAgrupados } from "../vender.component";
import { vendaModel } from "src/app/_models/venda.model";
import { vendasService } from "src/app/_services/vendas.service";
import { produtosService } from "src/app/_services/produtos.service";

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
    private matDialog: MatDialog,
    private vendasService: vendasService,
    private produtosService: produtosService
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

  addEvent(event: MatDatepickerInputEvent<Date>) {}

  pagar() {
    this.anotar();
    const dialogRef = this.matDialog.open(PagarComponent, {
      panelClass: "PagarComponent",
      data: {
        socioData: this.socioSelecionadoInterno,
      },
    });
  }

  anotar() {
    let venda: vendaModel;
    venda = new vendaModel();

    venda.idCliente = this.socioSelecionadoInterno.id;
    venda.produtosAbertos = this.listaProdutosSelecionados;
    venda.status = "aberto";
    venda.desconto = 0;
    venda.dataVenda = this.date.value;
    venda.valorRecebido = 0;

    this.vendasService.adicionarVenda(venda).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {
        this.socioSelecionadoInterno = undefined!;
        this.listaProdutos = [];
        this.listaProdutosSelecionados = [];
        this.produtosAgrupados = [];
        this.terminouCompra.emit(true);
      },
    });
  }
}
