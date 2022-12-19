import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from 'src/app/_models/produto.model';
import { SocioModel } from 'src/app/_models/socio.model';
import { sociosService } from 'src/app/_services/socios.service';

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
    @Inject(MAT_DIALOG_DATA) public socioData: dialogData
  ) {
    if (socioData) {
      this.informacoesSocio = socioData.socioData;
      console.log(socioData);
    }
  }

  informacoesSocio: SocioModel;
  valorTotal = 0;
  valorReceber = 0;
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
      this.valorTotal = somaTotal + this.informacoesSocio.saldo;
    } else {
      this.valorTotal = 0;
      this.debito = 0;
    }
    this.valorReceber = this.valorTotal;
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  salvar() {}

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
