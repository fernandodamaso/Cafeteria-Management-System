import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { nucleoModel } from "../_models/nucleo.model";
import { nucleosService } from "../_services/nucleos.service";

@Component({
  selector: "app-novo-nucleo",
  templateUrl: "./novo-nucleo.component.html",
  styleUrls: ["./novo-nucleo.component.scss"],
})
export class NovoNucleoComponent implements OnInit {

  constructor(
    private nucleosService: nucleosService,
    public dialogRef: MatDialogRef<NovoNucleoComponent>
  ) {}

  nome: string;

  ngOnInit(): void {}

  postData() {
    let novoNucleo: nucleoModel;
    novoNucleo = new nucleoModel();
    novoNucleo.nome = this.nome;

    this.nucleosService.adicionarNucleo(novoNucleo).subscribe({
      next: (data) => data,
      error: (e) => console.error(e),
      complete: () => this.dialogRef.close(),
    });
  }
}
