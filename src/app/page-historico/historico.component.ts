import { Component, OnInit } from "@angular/core";
import { historicoService } from "../_services/historico.service";
import { historicoModel } from "../_models/historico.model";

@Component({
  selector: "app-historico",
  templateUrl: "./historico.component.html",
  styleUrls: ["./historico.component.scss"],
})
export class HistoricoComponent implements OnInit {
  constructor(private historicoService: historicoService) {}

  dataHistorico: historicoModel[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.historicoService.getHistorico().subscribe({
      next: (data) => (this.dataHistorico = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataHistorico),
    });
  }
}
