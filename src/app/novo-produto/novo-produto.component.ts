import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from '../_models/data.model';
import { produtosService } from '../_services/produtos.service';

export interface dialogData {
  editar: boolean;
  produtoData: ProdutoModel;
}

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NovoProdutoComponent>, private produtosService: produtosService, @Inject(MAT_DIALOG_DATA) public produtoData: dialogData) {
    if (produtoData) {
      this.informacoesProduto = produtoData.produtoData;
      this.editar = true;
    }
  }
  nome: any;
  id: number;
  precoCusto: any;
  precoVenda: any;
  categoriaProduto: any;
  editar: boolean;
  informacoesProduto: any;


  ngOnInit(): void {
  }

  deletarSocio() {
    this.produtosService.deletarProduto(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close("Pizza!"),
    });
  }

  postData() {
    // if (this.produtoData) {
    //   this.informacoesProduto.nome = this.nome;
    //   this.informacoesProduto.telefone = this.telefone;
    //   this.informacoesProduto.nucleo = this.nucleo;
    //   this.informacoesProduto.grau[0].nome = this.grau;

    //   this.produtosService.editarSocio(this.informacoesProduto, this.informacoesProduto.id).subscribe({
    //     next: (data) => data,
    //     error: (e) => console.error(e),
    //     complete: () => this.dialogRef.close(),
    //   });
    // } else {
    //   let novoSocio: ProdutoModel;
    //   novoSocio = new SocioModel();
    //   novoSocio.nome = this.nome;
    //   novoSocio.telefone = this.telefone;
    //   novoSocio.nucleo = this.nucleo;
    //   novoSocio.saldo = 0;
    //   novoSocio.grau = [];
    //   let novoGrau: GrauModel;
    //   novoGrau = {
    //     nome: this.grau,
    //   };
    //   novoSocio.grau.push(novoGrau);

    //   this.produtosService.adicionarSocio(novoSocio).subscribe({
    //     next: (data) => data,
    //     error: (e) => console.error(e),
    //     complete: () => this.dialogRef.close(),
    //   });
    // }
  }

}
