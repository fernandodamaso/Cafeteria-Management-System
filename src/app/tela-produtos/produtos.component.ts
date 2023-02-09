import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { NovoProdutoComponent } from "../novo-produto/novo-produto.component";
import { ProdutoModel } from "../_models/produto.model";
import { produtosService } from "../_services/produtos.service";

@Component({
  templateUrl: "./produtos.component.html",
  styleUrls: ["./produtos.component.scss"],
})
export class ProdutosComponent implements OnInit {
  constructor(private produtosService: produtosService, private matDialog: MatDialog) {}

  dataProdutos: ProdutoModel[] = [];
  filterProdutos = "";
  filterTipo = "";

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.produtosService.getProdutos().subscribe({
      next: (data) => (this.dataProdutos = data),
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
