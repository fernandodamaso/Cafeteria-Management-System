import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoricoComponent } from "./historico.component";

const routes: Routes = [{ path: "", component: HistoricoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoRoutingModule {}
