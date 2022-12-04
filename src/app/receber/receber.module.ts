import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceberComponent } from "./receber.component";
import { receberRoutingModule } from "./receber-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";

@NgModule({
  declarations: [ReceberComponent],
  imports: [CommonModule, receberRoutingModule, FormsModule, SharedModule],
})
export class ReceberModule {}
