import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from 'src/app/_models/produto.model';
import { tipoModel } from 'src/app/_models/tipo.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { produtosService } from 'src/app/_services/produtos.service';
import { tipoService } from 'src/app/_services/tipos.service';

export interface dialogData {
  editar: boolean;
  produtoData: ProdutoModel;
}

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss'],
})
export class NovoProdutoComponent implements OnInit {
  public model: ProdutoModel;
  public formGroup: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NovoProdutoComponent>,
    private produtosService: produtosService,
    private categoriasService: tipoService,
    @Inject(MAT_DIALOG_DATA) public produtoData: dialogData,
  ) {
    this.model = new ProdutoModel();
    this.formGroup = this.formBuilder.group(this.model);
    if (produtoData) {
      this.informacoesProduto = produtoData.produtoData;
      this.editar = true;
      this.id = this.informacoesProduto.id;
      this.formGroup.patchValue(this.informacoesProduto);
    }
    this.formGroup.addControl('tipoProduto', new FormControl(this.informacoesProduto?.tipo?.id || 0));
  }

  initValidators() {
    this.formGroup.controls.nome.setValidators(Validators.required);
    this.formGroup.controls.precoCusto.setValidators(Validators.required);
    this.formGroup.controls.precoVenda.setValidators(Validators.required);
    this.formGroup.controls.tipoProduto.setValidators(Validators.required);
    this.formGroup.controls.ativo.setValidators(Validators.required);
  }

  nome = '';
  id: number;
  precoCusto: number;
  precoVenda: number;
  tipoProduto: tipoModel;
  editar: boolean;
  ativo = true;
  informacoesProduto: ProdutoModel;
  dataTipo: tipoModel[] = [];

  ngOnInit() {
    if (this.produtoData) {
      this.ativo = this.informacoesProduto.ativo;
      this.nome = this.informacoesProduto.nome;
      this.precoCusto = this.informacoesProduto.precoCusto;
      this.precoVenda = this.informacoesProduto.precoVenda;
      this.tipoProduto = this.informacoesProduto.tipo;
    }
    this.buscaCategorias();
  }

  deletarSocio() {
    this.produtosService.deletarProduto(this.id).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close('Pizza!'),
    });
  }

  buscaCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => (this.dataTipo = data),
      error: (e) => console.error(e),
      complete: () => {},
    });
  }

  abrirSnack(mensagem: string, classe: string, tempo: number) {
    this.snackBar.open(mensagem, 'fechar', {
      duration: tempo,
      panelClass: classe,
    });
  }

  postData() {
    const valoresForms = this.formGroup.value;
    valoresForms.tipo = this.dataTipo.find((el) => {
      return el.id === valoresForms.tipoProduto;
    });
    delete valoresForms.tipoProduto;
    console.log(valoresForms);
    if (this.produtoData) {
      this.produtosService.editarProduto(valoresForms, valoresForms.id).subscribe({
        next: (data) => data,
        error: (e) => {
          console.error(e);
          this.abrirSnack('Erro ao editar produto', 'erro', 3000);
        },
        complete: () => {
          this.abrirSnack('Produto editado com sucesso', 'sucesso', 3000);
          this.dialogRef.close();
        },
      });
    } else {
      this.produtosService.adicionarProduto(valoresForms).subscribe({
        next: (data) => data,
        error: (e) => {
          console.error(e);
          this.abrirSnack('Erro ao adicionar Produto', 'erro', 3000);
        },
        complete: () => {
          this.abrirSnack('Produto adicionado com sucesso', 'sucesso', 3000);
          this.dialogRef.close();
        },
      });
    }
  }
}
