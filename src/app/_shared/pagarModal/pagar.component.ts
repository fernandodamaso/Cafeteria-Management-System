import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { of } from "rxjs";
import { ProdutoModel } from "src/app/_models/produto.model";
import { SocioModel } from "src/app/_models/socio.model";
import { tipoModel } from "src/app/_models/tipo.model";
import { vendaModel } from "src/app/_models/venda.model";
import { produtosService } from "src/app/_services/produtos.service";
import { sociosService } from "src/app/_services/socios.service";
import { vendasService } from "src/app/_services/vendas.service";

export interface dialogData {
  editar: boolean;
  socioData: SocioModel;
  vendasData: vendaModel[];
}

export class produtosAbertos {
  idProduto: number;
  nome: string;
  valor: number;
  data: Date;
  idVenda: number;
  tipo: tipoModel;
  selecionado: boolean;
}

@Component({
  selector: "app-pagar",
  templateUrl: "./pagar.component.html",
  styleUrls: ["./pagar.component.scss"],
})
export class PagarComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PagarComponent>, private produtosService: produtosService, private sociosService: sociosService, private vendasService: vendasService, @Inject(MAT_DIALOG_DATA) public el: dialogData) {
    if (el) {
      this.informacoesSocio = el.socioData;
      this.getProdutos();

      this.vendasService.getVendas().subscribe({
        next: (data) => {
          this.listaVendas = data;

          const vendasFiltradas = this.listaVendas.filter((venda: any) => venda.idCliente === el.socioData.id && venda.status === "aberto");

          if (vendasFiltradas.length === 0) {
            this.semCompras = true;
          }

          for (const venda of vendasFiltradas) {
            for (const produto of venda.produtosAbertos) {
              const vendaObj = {
                idProduto: produto.id,
                nome: produto.nome,
                valor: produto.precoVenda,
                data: venda.dataVenda,
                idVenda: venda.id,
                tipo: produto.tipo,
                selecionado: true,
              };

              this.listaProdutosAbertos.push(vendaObj);
              this.produtosAtivos.push(vendaObj);
            }
          }
          this.calcularValorTotal();
        },
      });
    }
  }

  listaProdutosAbertos: produtosAbertos[] = [];
  produtosAtivos: produtosAbertos[] = [];
  dataProdutos: ProdutoModel[] = [];

  informacoesSocio: SocioModel;
  listaVendas: vendaModel[];
  valorTotal = 0;
  valorPago = 0;
  desconto = 0;
  debito = 0;
  formaPagamento: "pix" | "cartão" | "dinheiro" = "pix";
  date = new FormControl(new Date());
  dataCompra: Date;
  semCompras = false;

  ngOnInit(): void {
    // this.calcularValorTotal();
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
      this.valorPago = 0;
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
        this.informacoesSocio.credito = this.informacoesSocio.credito + calculoCredito;
      }
    } else {
      this.informacoesSocio.credito = 0;
    }

    this.informacoesSocio.produtosEmAberto = this.informacoesSocio.produtosEmAberto.filter((produto) => {
      return !produtosADeletar.has(produto);
    });

    this.sociosService.editarSocio(this.informacoesSocio, this.informacoesSocio.id).subscribe({
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
      produto.selecionado = false;
    } else {
      produto.selecionado = true;
      this.produtosAtivos.push(produto);
    }
    this.desconto = 0;
    this.calcularValorTotal();
  }

  toggleCheckboxes() {
    if (this.listaProdutosAbertos.every((val) => val.selecionado == true)) {
      for (const produto of this.listaProdutosAbertos) {
        const index = this.produtosAtivos.findIndex((index) => {
          return index === produto;
        });
        this.produtosAtivos.splice(index, 1);
      }
      this.listaProdutosAbertos.forEach((val) => {
        val.selecionado = false;
      });
    } else {
      this.produtosAtivos = [];
      for (const produto of this.listaProdutosAbertos) {
        this.produtosAtivos.push(produto);
      }
      this.listaProdutosAbertos.forEach((val) => {
        val.selecionado = true;
      });
    }
    this.desconto = 0;
    this.calcularValorTotal();
  }

  verificaListaProdutos(): boolean {
    if (this.listaProdutosAbertos.every((val) => val.selecionado == true)) {
      return true;
    } else {
      return false;
    }
  }

  verificarValorPago() {
    const valorTotalPositivo = this.valorTotal * -1;
    if (this.valorPago < valorTotalPositivo) {
      this.desconto = this.valorPago - valorTotalPositivo;
      this.desconto = this.desconto * -1;
    } else {
      this.desconto = 0;
    }
  }

  calculaCredito(venda: vendaModel, produto: produtosAbertos) {
    const valorTotal = venda.valorRecebido + produto.valor;
    venda.valorRecebido = valorTotal;

    if (this.informacoesSocio.credito > 0) {
      this.informacoesSocio.credito = this.informacoesSocio.credito - valorTotal;
      if (this.informacoesSocio.credito < 0) {
        this.informacoesSocio.credito = 0;
      }
    }
    if (this.valorPago > this.valorTotal) {
      const valorTotalConvertido = this.valorTotal * -1;
      const diferencaValor = this.valorPago - valorTotalConvertido;
      this.informacoesSocio.credito = this.informacoesSocio.credito + diferencaValor;
    }
  }

  deletaProdutosAbertos(venda: vendaModel, produto: produtosAbertos): vendaModel {
    if (venda.produtosAbertos.length > 0) {
      const indexProduto = venda.produtosAbertos.findIndex((el) => {
        return el.nome === produto.nome;
      });
      venda.produtosVendidos.push(venda.produtosAbertos[indexProduto]);
      venda.produtosAbertos.splice(indexProduto, 1);
    }
    return venda;
  }

  async getProdutos(): Promise<void> {
    this.dataProdutos = await this.produtosService.getProdutosArray();
  }

  adicionarVendaProduto(venda: vendaModel, produto: produtosAbertos) {
    const produtoMesmaId: any = this.dataProdutos.find((el) => {
      return el.id === produto.idProduto;
    });

    produtoMesmaId.qtdVendas = produtoMesmaId.qtdVendas + 1;

    this.produtosService.editarProduto(produtoMesmaId, produtoMesmaId.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {},
    });
  }

  salvar() {
    if (this.listaProdutosAbertos.length > 0) {
      for (let produto of this.produtosAtivos) {
        for (let venda of this.listaVendas) {
          if (produto.idVenda !== venda.id || venda.status != "aberto") {
            continue;
          }

          venda.formaPagamento = this.formaPagamento;
          this.calculaCredito(venda, produto);
          this.adicionarVendaProduto(venda, produto);
          venda = this.deletaProdutosAbertos(venda, produto);
        }
      }

      const vendasFiltradas = this.listaVendas.filter((venda: any) => venda.idCliente === this.informacoesSocio.id && venda.status === "aberto");

      for (const venda of vendasFiltradas) {
        if (venda.produtosAbertos.length === 0) {
          venda.status = "fechado";
        }

        this.vendasService.editarVendas(venda).subscribe({
          next: (data) => data,
          error: (e) => console.error(e),
          complete: () => {
            setTimeout(() => {}, 1000);
            this.sociosService.editarSocio(this.informacoesSocio, this.informacoesSocio.id).subscribe({
              next: (data) => data,
              error: (e) => console.error(e),
              complete: () => this.dialogRef.close(),
            });
          },
        });
        setTimeout(() => {}, 2000);
      }
    } else {
      this.informacoesSocio.credito = this.informacoesSocio.credito + this.valorPago;
      this.sociosService.editarSocio(this.informacoesSocio, this.informacoesSocio.id).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    }
  }
}