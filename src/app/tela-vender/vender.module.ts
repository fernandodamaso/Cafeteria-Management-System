import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VenderRoutingModule } from "./vender-routing.module";
import { VenderComponent } from "./vender.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../_shared/shared.module";
import { BarraVendaComponent } from "./barra-venda/barra-venda.component";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { ListaSociosComponent } from './lista-socios/lista-socios.component';

@NgModule({
  declarations: [VenderComponent, BarraVendaComponent, ListaSociosComponent, ListaSociosComponent],
  imports: [CommonModule, VenderRoutingModule, FormsModule, SharedModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ],
})
export class VenderModule {}
