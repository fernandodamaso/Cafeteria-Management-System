import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { of } from "rxjs";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { tipoModel } from "src/app/_models/tipo.model";
import { vendaModel } from "src/app/_models/venda.model";
import { sociosService } from "src/app/_services/socios.service";
import { vendasService } from "src/app/_services/vendas.service";

export interface dialogData {
  editar: boolean;
  socioData: SocioModel;
  vendasData: vendaModel[];
}

export class produtosAbertos {
  nome: string;
  valor: number;
  data: Date;
  idVenda: number;
  tipo: tipoModel;
}

@Component({
  selector: "app-pagar",
  templateUrl: "./pagar.component.html",
  styleUrls: ["./pagar.component.scss"],
})
export class PagarComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PagarComponent>,
    private sociosService: sociosService,
    private vendasService: vendasService,

    @Inject(MAT_DIALOG_DATA) public el: dialogData
  ) {
    if (el) {
      this.informacoesSocio = el.socioData;

      let ProdutosFiltrados: ProdutoModel[] = [];

      const vendasFiltradas = el.vendasData.filter(
        (venda: any) =>
          venda.idCliente === el.socioData.id && venda.status === "aberto"
      );

      for (const venda of vendasFiltradas) {
        console.log(venda);

        for (const produto of venda.produtosVendidos) {
          const vendaObj = {
            nome: produto.nome,
            valor: produto.precoVenda,
            data: venda.dataVenda,
            idVenda: venda.id,
            tipo: produto.tipo,
          };

          this.listaProdutosAbertos.push(vendaObj);
          this.produtosAtivos.push(vendaObj);
        }
      }
    }
  }

  listaProdutosAbertos: produtosAbertos[] = [];
  produtosAtivos: produtosAbertos[] = [];

  informacoesSocio: SocioModel;
  listaVendas: vendaModel[];
  valorTotal = 0;
  valorPago = 0;
  desconto = 0;
  debito = 0;
  formaPagamento = "pix";
  date = new FormControl(new Date());
  dataCompra: Date;

  ngOnInit(): void {
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    let listaValores = [];

    for (let i = 0; i < this.produtosAtivos.length; i++) {
      listaValores.push(this.produtosAtivos[i].valor);
    }

    if (this.produtosAtivos.length > 0) {
      let somaTotal: number = listaValores
        .map((a) => a)
        .reduce(function (a, b) {
          return a + b;
        });
        somaTotal = somaTotal * -1;
      this.debito = somaTotal;
      this.valorTotal = somaTotal + this.informacoesSocio.credito + this.desconto;
      this.valorPago = this.valorTotal * -1;
      if (this.valorTotal < 0) {
          this.valorPago = this.valorTotal * -1;
      }
    } else {
      this.valorTotal = 0;
    }
    if (this.valorPago <= 0) {
      this.valorPago = this.valorPago * -1;
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  adicionarVenda(venda: vendaModel) {
    this.vendasService.adicionarVenda(venda).subscribe({
      next: (data) => {
        console.log("venda feita com sucesso");
        this.atualizarSocio(venda);
      },
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close(),
    });
  }

  atualizarSocio(venda: vendaModel) {
    const produtosADeletar = new Set(venda.produtosVendidos);
    const calculoCredito = this.valorPago + this.valorTotal;

    console.log(calculoCredito);

    if (calculoCredito > 0) {
      if (venda.produtosVendidos.length > 0) {
        this.informacoesSocio.credito = calculoCredito;
      } else {
        this.informacoesSocio.credito =
          this.informacoesSocio.credito + calculoCredito;
      }
    } else {
      this.informacoesSocio.credito = 0;
    }

    this.informacoesSocio.produtosEmAberto =
      this.informacoesSocio.produtosEmAberto.filter((produto) => {
        return !produtosADeletar.has(produto);
      });

    this.sociosService
      .editarSocio(this.informacoesSocio, this.informacoesSocio.id)
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
  }

  toggleProduto(produto: any, i: number) {
    const index = this.produtosAtivos.findIndex((index) => {
      return index === produto;
    });
    console.log(index);
    if (index > -1) {
      this.produtosAtivos.splice(index, 1);
    } else {
      this.produtosAtivos.push(produto);
    }
    this.calcularValorTotal();
    console.log(this.produtosAtivos);
  }

  verificaProduto(produto: any) {
    const index = this.produtosAtivos.findIndex((el) => {
      return el === produto;
    });
    return index > -1;
  }


  salvar() {
    // let novaVenda: vendaModel;
    // novaVenda = new vendaModel();
    // novaVenda.dataVenda = this.date.value;
    // novaVenda.desconto = this.desconto;
    // novaVenda.produtosVendidos = this.produtosAtivos;
    // novaVenda.valorRecebido = this.valorPago;
    // this.adicionarVenda(novaVenda);
  }

}
