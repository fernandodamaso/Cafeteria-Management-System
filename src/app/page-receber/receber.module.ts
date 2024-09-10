import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceberComponent } from './receber.component';
import { receberRoutingModule } from './receber-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NovoSocioComponent } from './modal-novo-socio/novo-socio.component';
@NgModule({
  declarations: [ReceberComponent, NovoSocioComponent],
  imports: [
    CommonModule,
    receberRoutingModule,
    FormsModule,
    SharedModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
})
export class ReceberModule {}
