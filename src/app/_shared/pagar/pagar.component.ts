import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from 'src/app/_models/produto.model';
import { SocioModel } from 'src/app/_models/socio.model';
import { vendaModel } from 'src/app/_models/venda.model';
import { sociosService } from 'src/app/_services/socios.service';
import { VendasService } from 'src/app/_services/vendas.service';

export interface dialogData {
  editar: boolean;
  socioData: SocioModel;
}
@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss'],
})
export class PagarComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PagarComponent>,
    private sociosService: sociosService,
    private VendasService: VendasService,
    @Inject(MAT_DIALOG_DATA) public socioData: dialogData
  ) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
    }
  }

  informacoesSocio: SocioModel;
  valorTotal = 0;
  valorPago = 0;
  desconto = 0;
  debito = 0;
  formaPagamento = 'pix';
  date = new FormControl(new Date());
  dataCompra: Date;
  produtosAtivos: ProdutoModel[] = [];

  ngOnInit(): void {
    for (let x = 0; x < this.informacoesSocio.produtosEmAberto.length; x++) {
      const element = this.informacoesSocio.produtosEmAberto[x];
      this.produtosAtivos.push(element);
    }
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    let listaPrecoVenda = [];

    for (let i = 0; i < this.produtosAtivos.length; i++) {
      listaPrecoVenda.push(this.produtosAtivos[i].precoVenda);
    }

    if (this.produtosAtivos.length > 0) {
      let somaTotal: number = listaPrecoVenda
        .map((a) => a)
        .reduce(function (a, b) {
          return a + b;
        });
      somaTotal = somaTotal * -1;
      this.debito = somaTotal;
      this.valorTotal =
        somaTotal + this.informacoesSocio.credito + this.desconto;
      this.valorPago = this.valorTotal * -1;
      // if (this.valorTotal < 0) {
      //     this.valorPago = this.valorTotal * -1;
      // }
    }
    if (this.valorPago <= 0) {
      this.valorPago = this.valorPago * -1;
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  salvar() {
    let novaVenda: vendaModel;
    novaVenda = new vendaModel();

    novaVenda.cliente = this.informacoesSocio;
    novaVenda.dataVenda = this.date.value;
    novaVenda.desconto = this.desconto;
    novaVenda.produtosVendidos = this.produtosAtivos;
    novaVenda.valorRecebido = this.valorPago;
    this.adicionarVenda(novaVenda);
  }

  adicionarVenda(venda: vendaModel) {
    this.VendasService.adicionarVenda(venda).subscribe({
      next: (data) => {
        console.log('venda feita com sucesso');
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

    console.log(this.informacoesSocio);

    this.sociosService
      .editarSocio(this.informacoesSocio, this.informacoesSocio.id)
      .subscribe({
        next: (data) => console.log(data),
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
  }

  toggleProduto(produto: ProdutoModel, i: number) {
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

  verificaProduto(produto: ProdutoModel) {
    const frutaIndex = this.produtosAtivos.findIndex((el) => {
      return el === produto;
    });
    return frutaIndex > -1;
  }
}
