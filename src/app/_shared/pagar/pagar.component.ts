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
      console.log("Lista inicial de vendas:");
      console.log(el.vendasData);
      this.listaVendas = el.vendasData;
      this.informacoesSocio = el.socioData;

      const vendasFiltradas = el.vendasData.filter(
        (venda: any) =>
          venda.idCliente === el.socioData.id && venda.status === "aberto"
      );

      for (const venda of vendasFiltradas) {
        // console.log(venda);

        for (const produto of venda.produtosAbertos) {
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
  formaPagamento : "pix" | "cartão" | "dinheiro" = "pix";
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
      this.valorTotal =
        somaTotal + this.informacoesSocio.credito + this.desconto;

      if (this.valorTotal > 0) {
        this.valorPago = 0;
      } else {
        this.valorPago = this.valorTotal * -1;
      }

      // if (this.valorTotal < 0) {
      //   this.valorPago = this.valorTotal * -1;
      // }
    } else {
      this.valorTotal = 0;
    }
    // if (this.valorPago <= 0) {
    // this.valorPago = this.valorPago * -1;
    // }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  atualizarSocio(venda: vendaModel) {
    const produtosADeletar = new Set(venda.produtosAbertos);
    const calculoCredito = this.valorPago + this.valorTotal;

    if (calculoCredito > 0) {
      if (venda.produtosAbertos.length > 0) {
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

    if (index > -1) {
      this.produtosAtivos.splice(index, 1);
    } else {
      this.produtosAtivos.push(produto);
    }
    this.calcularValorTotal();
  }

  verificaProduto(produto: any) {
    const index = this.produtosAtivos.findIndex((el) => {
      return el === produto;
    });
    return index > -1;
  }

  salvar() {
    for (const produto of this.produtosAtivos) {
      for (const venda of this.listaVendas) {
        if (produto.idVenda !== venda.id || venda.status != "aberto") {
          continue;
        }

        const valorTotal = venda.valorRecebido + produto.valor;
        venda.valorRecebido = valorTotal;

        if (this.informacoesSocio.credito > 0) {
          this.informacoesSocio.credito =
            this.informacoesSocio.credito - valorTotal;
          if (this.informacoesSocio.credito < 0) {
            this.informacoesSocio.credito = 0;
          }
        }

        if (this.valorPago > this.valorTotal) {
          const valorTotalConvertido = this.valorTotal * -1;
          const diferencaValor = this.valorPago - valorTotalConvertido;
          this.informacoesSocio.credito = this.informacoesSocio.credito + diferencaValor;
        }

        const indexProduto = venda.produtosAbertos.findIndex((el) => {
          return el.nome === produto.nome;
        });
        venda.produtosAbertos.splice(indexProduto, 1);
        venda.formaPagamento = this.formaPagamento;
      }
    }

    const vendasFiltradas = this.listaVendas.filter(
      (venda: any) =>
        venda.idCliente === this.informacoesSocio.id &&
        venda.status === "aberto"
    );

    for (const venda of vendasFiltradas) {
      console.log(venda);

      if (venda.produtosAbertos.length === 0) {
        venda.status = "fechado";
      }

      this.vendasService.editarVendas(venda).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => {
          setTimeout(() => {}, 1000);
          this.sociosService
            .editarSocio(this.informacoesSocio, this.informacoesSocio.id)
            .subscribe({
              next: (data) => data,
              error: (e) => console.error(e),
              complete: () => this.dialogRef.close(),
            });
        },
      });
      setTimeout(() => {}, 2000);
    }
    // this.dialogRef.close();
  }
}
