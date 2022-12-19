import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReceberComponent } from "./receber.component";
import { receberRoutingModule } from "./receber-routing.module";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from "@angular/material/core";
@NgModule({
  declarations: [ReceberComponent],
  imports: [CommonModule, receberRoutingModule, FormsModule, SharedModule, MatMenuModule],
})
export class ReceberModule {}
