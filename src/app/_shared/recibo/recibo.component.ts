import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SocioModel } from "src/app/_models/socio.model";
import { tipoModel } from "src/app/_models/tipo.model";
import { vendaModel } from "src/app/_models/venda.model";

export interface dialogData {
  socioData: SocioModel;
  vendas: vendaModel[];
}

export class produtosAbertos {
  nome: string;
  valor: number;
  data: Date;
  idVenda: number;
  tipo: tipoModel;
  selecionado: boolean;
}

@Component({
  selector: "app-recibo",
  templateUrl: "./recibo.component.html",
  styleUrls: ["./recibo.component.scss"],
})
export class ReciboComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public el: dialogData) {
    if (el) {
      this.informacoesSocio = el.socioData;
      this.vendas = el.vendas;

      const vendasFiltradas = this.vendas.filter(
        (venda: any) => venda.idCliente === el.socioData.id && venda.status === "aberto"
      );

      this.filtraProdutos(vendasFiltradas);
      this.calcularValorTotal()
    }
  }

  listaProdutosAbertos: produtosAbertos[] = [];
  informacoesSocio: SocioModel;
  valorTotal = 0;
  vendas: vendaModel[];

  ngOnInit(): void {
    // this.calcularValorTotal();
  }

  filtraProdutos(vendasFiltradas: vendaModel[]) {
    for (const venda of vendasFiltradas) {
      for (const produto of venda.produtosAbertos) {
        const vendaObj = {
          nome: produto.nome,
          valor: produto.precoVenda,
          data: venda.dataVenda,
          idVenda: venda.id,
          tipo: produto.tipo,
          selecionado: true,
        };

        this.listaProdutosAbertos.push(vendaObj);
      }
    }
  }

  calcularValorTotal() {
    let listaPrecoVenda = [];

    for (let i = 0; i < this.listaProdutosAbertos.length; i++) {
      listaPrecoVenda.push(this.listaProdutosAbertos[i].valor);
    }

    let somaTotal: number = listaPrecoVenda
      .map((a) => a)
      .reduce(function (a, b) {
        return a + b;
      });
    somaTotal = somaTotal;
    this.valorTotal = somaTotal;
  }
}
