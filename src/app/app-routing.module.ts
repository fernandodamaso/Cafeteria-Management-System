import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'vender', pathMatch: 'full' },
  { path: 'historico', loadChildren: () => import('./page-historico/historico.module').then((m) => m.HistoricoModule), canActivate: [AuthGuard] },
  { path: 'vender', loadChildren: () => import('./page-vender/vender.module').then((m) => m.VenderModule), canActivate: [AuthGuard] },
  { path: 'receber', loadChildren: () => import('./page-receber/receber.module').then((m) => m.ReceberModule), canActivate: [AuthGuard] },
  { path: 'produtos', loadChildren: () => import('./page-produtos/produtos.module').then((m) => m.ProdutosModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./page-login/login.module').then((m) => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
