import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NovoProdutoComponent } from "./novo-produto/novo-produto.component";
import { ProdutoModel } from "../_models/produto.model";
import { ProdutosService } from "../_services/produtos/produtos.service";
import { tipoModel } from "../_models/tipo.model";

@Component({
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.scss"],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtosService: ProdutosService, private matDialog: MatDialog) {}

  dataProdutos: ProdutoModel[] = [];
  filterNome = "";
  filterTipo = "";
  listaTipos: string[] = [];

  ngOnInit(): void {
    this.getData();
  }

  buscaFilterNome(event: any) {
    this.filterNome = event;
  }
  buscaFilterTipo(event: any) {
    this.filterTipo = event;
  }

  getListaTipos() {
    // let listaTodosTipos: tipoModel[] = [];
    // this.dataProdutos.forEach((produto) => {
    //   listaTodosTipos.push(produto.tipo);
    // });
    // this.listaTipos = Array.from(new Set(listaTodosTipos.map((el) => el.nome)));
  }

  getData() {
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.dataProdutos = data;
        this.getListaTipos();
      },
      error: (e) => console.error(e),
      complete: () => {},
    });
  }

  deletarProduto(id: number) {
    this.produtosService.deletarProduto(id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => {
        this.getData();
      },
    });
  }

  editarProduto(produto: ProdutoModel) {
    const dialogRef = this.matDialog.open(NovoProdutoComponent, {
      panelClass: "NovoProdutoComponent",
      data: {
        produtoData: produto,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  adicionarProduto() {
    const dialogRef = this.matDialog.open(NovoProdutoComponent, {
      panelClass: "NovoProdutoComponent",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }
}
