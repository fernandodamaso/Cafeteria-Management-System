import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoricoComponent } from "./historico/historico.component";
import { ReceberComponent } from "./receber/receber.component";

const routes: Routes = [
  { path: "", redirectTo: "vender", pathMatch: "full" },
  { path: "historico", component: HistoricoComponent },
  { path: "vender", loadChildren: () => import("./vender/vender.module").then((m) => m.VenderModule) },
  { path: "receber", loadChildren: () => import("./receber/receber.module").then((m) => m.ReceberModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
