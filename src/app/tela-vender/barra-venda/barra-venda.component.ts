import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject, Subscription } from "rxjs";
import { SocioModel } from "src/app/_models/socio.model";
import { MatDialog } from "@angular/material/dialog";
import { ProdutoModel } from "src/app/_models/produto.model";
import { PagarComponent } from "src/app/_shared/pagar/pagar.component";
import { sociosService } from "src/app/_services/socios.service";

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

  @Input()
  set produtoSelecionado(val: Subject<ProdutoModel>) {
    this._val = val;
  }

  constructor(private matDialog: MatDialog, private sociosService: sociosService) {}

  nenhumProdutoSelecionado = false;
  socioSelecionadoInterno: SocioModel;
  valorTotal = 0;
  saldoCliente = 0;
  listaProdutos: ProdutoModel[] = [];
  _val: Subject<ProdutoModel> = new Subject();
  date = new FormControl(new Date());
  dataCompra: Date;
  eventsSubscription: Subscription;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.eventsSubscription = this._val.subscribe((produto) => {
      this.listaProdutos.push(produto);
      this.calcularValorTotal();
    });
  }

  calcularValorTotal() {
    let sum: number = this.listaProdutos
      .map((el) => el.precoVenda)
      .reduce(function (el, el2) {
        return el + el2;
      });
    this.valorTotal = sum;
  }

  deletarProduto(produto: any) {
    this.listaProdutos.splice(produto, 1);
    this.calcularValorTotal();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  pagar() {
    // this.socioSelecionadoInterno = undefined!;
    // this.listaProdutos = [];
    const dialogRef = this.matDialog.open(PagarComponent, {
      panelClass: "PagarComponent",
      // data: {
      //   socioData: socio,
      // },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  anotar() {
    this.listaProdutos.forEach((el) => {
      el.dataCompra = this.date.value;
    });

    this.socioSelecionadoInterno.produtosEmAberto = [...this.socioSelecionadoInterno.produtosEmAberto, ...this.listaProdutos];

    this.sociosService.editarSocio(this.socioSelecionadoInterno, this.socioSelecionadoInterno.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {
        let listaNomes = [];

        for (let i = 0; i < this.listaProdutos.length; i++) {
          listaNomes.push(this.listaProdutos[i].nome);
        }

        this.socioSelecionadoInterno = undefined!;
        this.listaProdutos = [];

        this.terminouCompra.emit(true);
      },
    });
  }
}
