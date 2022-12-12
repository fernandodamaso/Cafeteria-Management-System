import { Component, Input, OnInit } from '@angular/core';
import { HistoricoModel } from '../_models/historico.model';
import { GetDataService } from '../_services/get-data.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  constructor(private GetDataService: GetDataService) { }

  dataHistorico: HistoricoModel[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.GetDataService.getHistorico().subscribe({
      next: (data) => this.dataHistorico = data,
      error: (e) => console.error(e),
      complete: () => console.log(this.dataHistorico),
    });
  }

}
