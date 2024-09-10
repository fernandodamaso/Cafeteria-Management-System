import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogData } from 'src/app/modal-pagar/pagar.component';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html',
  styleUrls: ['./dialog-confirmacao.component.scss'],
})
export class DialogConfirmacaoComponent implements OnInit {
  titulo: string = '';
  mensagem: string = '';

  constructor(public dialogRef: MatDialogRef<DialogConfirmacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.titulo = data.titulo;
      this.mensagem = data.mensagem;
    }
  }

  ngOnInit(): void {}

  closeModal(resultado: string) {
    this.dialogRef.close(resultado);
  }
}
