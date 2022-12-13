import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdutoModel } from "../_models/produto.model";
import { produtosService } from "../_services/produtos.service";

export interface dialogData {
  editar: boolean;
  produtoData: ProdutoModel;
}

@Component({
  selector: "app-novo-produto",
  templateUrl: "./novo-produto.component.html",
  styleUrls: ["./novo-produto.component.scss"],
})
export class NovoProdutoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<NovoProdutoComponent>, private produtosService: produtosService, @Inject(MAT_DIALOG_DATA) public produtoData: dialogData) {
    if (produtoData) {
      this.informacoesProduto = produtoData.produtoData;
      this.editar = true;
      this.id = this.informacoesProduto.id;
      console.log(produtoData);
    }
  }
  nome = "";
  id: number;
  precoCusto: number;
  precoVenda: number;
  categoriaProduto = "";
  editar: boolean;
  status = true;
  informacoesProduto: ProdutoModel;

  ngOnInit() {
    if (this.produtoData) {
      this.status = this.informacoesProduto.status;
      this.nome = this.informacoesProduto.nome;
      this.precoCusto = this.informacoesProduto.precoCusto;
      this.precoVenda = this.informacoesProduto.precoVenda;
      this.categoriaProduto = this.informacoesProduto.tipo;
    }
  }

  deletarSocio() {
    this.produtosService.deletarProduto(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close("Pizza!"),
    });
  }

  postData() {
    if (this.produtoData) {
      this.informacoesProduto.nome = this.nome;
      this.informacoesProduto.status = this.status;
      this.informacoesProduto.precoCusto = this.precoCusto;
      this.informacoesProduto.precoVenda = this.precoVenda;
      this.informacoesProduto.tipo = this.categoriaProduto;

      this.produtosService.editarProduto(this.informacoesProduto, this.informacoesProduto.id).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    } else {
      let novoSocio: ProdutoModel;
      novoSocio = new ProdutoModel();
      novoSocio.status = this.status;
      novoSocio.nome = this.nome;
      novoSocio.precoCusto = this.precoCusto;
      novoSocio.precoVenda = this.precoVenda;
      novoSocio.tipo = this.categoriaProduto;

      this.produtosService.adicionarProduto(novoSocio).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    }
  }
}
