import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProdutoModel } from "../_models/produto.model";
import { tipoModel } from "../_models/tipo.model";
import { tipoService } from "../_services/tipos.service";
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
  constructor(public dialogRef: MatDialogRef<NovoProdutoComponent>, private produtosService: produtosService,private categoriasService: tipoService, @Inject(MAT_DIALOG_DATA) public produtoData: dialogData) {
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
  tipoProduto : tipoModel;
  editar: boolean;
  ativo = true;
  informacoesProduto: ProdutoModel;
  dataTipo: tipoModel[] = [];

  ngOnInit() {
    if (this.produtoData) {
      console.log(this.produtoData)
      this.ativo = this.informacoesProduto.ativo;
      this.nome = this.informacoesProduto.nome;
      this.precoCusto = this.informacoesProduto.precoCusto;
      this.precoVenda = this.informacoesProduto.precoVenda;
      this.tipoProduto = this.informacoesProduto.tipo;
    }
    this.buscaCategorias()
  }

  deletarSocio() {
    this.produtosService.deletarProduto(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close("Pizza!"),
    });
  }

  buscaCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => (this.dataTipo = data),
      error: (e) => console.error(e),
      complete: () => {},
    });
  }

  postData() {
    if (this.produtoData) {
      this.informacoesProduto.nome = this.nome;
      this.informacoesProduto.ativo = this.ativo;
      this.informacoesProduto.precoCusto = this.precoCusto;
      this.informacoesProduto.precoVenda = this.precoVenda;
      this.informacoesProduto.tipo = this.tipoProduto;

      this.produtosService.editarProduto(this.informacoesProduto, this.informacoesProduto.id).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    } else {
      let novoSocio: ProdutoModel;
      novoSocio = new ProdutoModel();
      novoSocio.ativo = this.ativo;
      novoSocio.nome = this.nome;
      novoSocio.precoCusto = this.precoCusto;
      novoSocio.precoVenda = this.precoVenda;
      novoSocio.qtdVendas = 0;
      novoSocio.tipo = this.tipoProduto;


      this.produtosService.adicionarProduto(novoSocio).subscribe({
        next: (data) => data,
        error: (e) => console.error(e),
        complete: () => this.dialogRef.close(),
      });
    }
  }
}
