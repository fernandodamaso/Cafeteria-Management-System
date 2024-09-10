import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoricoRoutingModule } from "./historico-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { HistoricoComponent } from "./historico.component";

@NgModule({
  declarations: [HistoricoComponent],
  imports: [CommonModule, HistoricoRoutingModule, FormsModule, SharedModule],
})
export class HistoricoModule {}
