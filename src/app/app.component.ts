import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HistoricoComponent } from "./historico/historico.component";
import { VenderComponent } from "./vender/vender.component";
import { SocioModel } from "./_models/data.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {}

}
