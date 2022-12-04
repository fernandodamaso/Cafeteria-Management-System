import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VenderRoutingModule } from "./vender-routing.module";
import { VenderComponent } from "./vender.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";

@NgModule({
  declarations: [VenderComponent],
  imports: [CommonModule, VenderRoutingModule, FormsModule, SharedModule],
})
export class VenderModule {}
