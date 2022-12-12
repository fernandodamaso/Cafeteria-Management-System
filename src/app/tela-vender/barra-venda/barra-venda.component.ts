import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject, Subscription } from "rxjs";
import { SocioModel } from "src/app/_models/socio.model";
import { ProdutoModel } from "src/app/_models/produto.model";

@Component({
  selector: "app-barra-venda",
  templateUrl: "./barra-venda.component.html",
  styleUrls: ["./barra-venda.component.scss"],
})
export class BarraVendaComponent implements OnInit {

  @Input()
  set socioSelecionado(value: SocioModel) {
    this.socioSelecionadoInterno = value;
  }

  @Input()
  set produtoSelecionado(val: Subject<ProdutoModel>) {
    this._val = val;
  }

  constructor() {}

  nenhumProdutoSelecionado = false;
  socioSelecionadoInterno: SocioModel;
  valorTotal = 0;
  saldoCliente = 0;
  listaProdutos: ProdutoModel[] = [];
  _val: Subject<ProdutoModel> = new Subject();
  date = new FormControl(new Date());
  eventsSubscription: Subscription;

  ngOnInit() {
    this.eventsSubscription = this._val.subscribe((produto) => {
      console.log(produto);
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

  anotar() {
    this.socioSelecionadoInterno = undefined!;
    this.listaProdutos = [];
  }

  deletarProduto(produto: any) {
    this.listaProdutos.splice(produto, 1);
    this.calcularValorTotal();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }
}
