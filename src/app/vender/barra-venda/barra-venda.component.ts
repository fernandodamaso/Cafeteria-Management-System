import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { Subject, Subscription } from "rxjs";
import { ProdutoModel, SocioModel } from "src/app/_models/data.model";

@Component({
  selector: "app-barra-venda",
  templateUrl: "./barra-venda.component.html",
  styleUrls: ["./barra-venda.component.scss"],
})
export class BarraVendaComponent implements OnInit {
  // @Input() socioSelecionado: any;
  // @Input() produtoSelecionado: any;

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
  produtosSelecionadosInterno: ProdutoModel[] = [];
  _val: Subject<ProdutoModel> = new Subject();
  date = new FormControl(new Date());
  eventsSubscription: Subscription;

  ngOnInit() {
    this.eventsSubscription = this._val.subscribe((produto) => {
      console.log(produto);
      this.produtosSelecionadosInterno.push(produto);
    });
  }

  anotar() {
    this.socioSelecionadoInterno = undefined!;
    this.produtosSelecionadosInterno = [];
  }

  deletarProduto(produto: any) {
    console.log(produto);
    this.produtosSelecionadosInterno.splice(produto, 1);
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }
}
