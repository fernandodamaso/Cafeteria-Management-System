import { Component, OnInit } from "@angular/core";
import { SocioModel } from "../_models/data.model";
import { GetDataService } from "../_services/get-data.service";
import { MatDialog } from "@angular/material/dialog";
import { VenderComponent } from "../vender/vender.component";

@Component({
  selector: "app-receber",
  templateUrl: "./receber.component.html",
  styleUrls: ["./receber.component.scss"],
})
export class ReceberComponent implements OnInit {
  constructor(private GetDataService: GetDataService, private matDialog: MatDialog) {}

  dataSocios: SocioModel[] = [];
  filterSocios = "";
  filterProdutos = "";
  filterGrau = "";
  filterTipo = "";

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.GetDataService.getSocios().subscribe({
      next: (data) => (this.dataSocios = data),
      error: (e) => console.error(e),
      complete: () => console.log(this.dataSocios),
    });
  }

  // openDialog() {
  //   this.matDialog.open(VenderComponent);
  // }
}
