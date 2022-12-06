import { Component, OnInit, Input } from "@angular/core";
import { Subject, Subscription } from 'rxjs';
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

  eventsSubscription: Subscription;
  ngOnInit() {
    this.eventsSubscription = this._val.subscribe((x) => {
      console.log("event received", x);
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
}
