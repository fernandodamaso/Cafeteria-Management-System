import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "vender", pathMatch: "full" },
  { path: "historico", loadChildren: () => import("./tela-historico/historico.module").then((m) => m.HistoricoModule) },
  { path: "vender", loadChildren: () => import("./tela-vender/vender.module").then((m) => m.VenderModule) },
  { path: "receber", loadChildren: () => import("./tela-receber/receber.module").then((m) => m.ReceberModule) },
  { path: "produtos", loadChildren: () => import("./tela-produtos/produtos.module").then((m) => m.ProdutosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
