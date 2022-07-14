import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceberComponent } from "./receber.component";
import { VenderRoutingModule } from "../vender/vender-routing.module";
import { receberRoutingModule } from "./receber-routing.module";

@NgModule({
  declarations: [ReceberComponent],
  imports: [CommonModule, receberRoutingModule],
})
export class ReceberModule {}
