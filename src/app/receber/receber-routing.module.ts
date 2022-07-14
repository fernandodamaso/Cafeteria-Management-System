import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceberComponent } from "./receber.component";

const routes: Routes = [{ path: "", component: ReceberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class receberRoutingModule {}
