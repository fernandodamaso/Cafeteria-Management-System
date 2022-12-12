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
  produtoSelecionado: Subject<ProdutoModel> = new Subject();

  ngOnInit(): void {
    this.getData();
  }

  pegarProduto(produto: ProdutoModel) {
    this.produtoSelecionado.next(produto);
  }

  getData() {
    this.produtosService.getProdutos().subscribe({
      next: (data) => (this.dataProdutos = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataProdutos),
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

  adicionarProduto() {}
}
