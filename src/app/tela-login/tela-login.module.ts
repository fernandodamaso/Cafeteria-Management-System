import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { TelaLoginRoutingModule } from './tela-login-routing.module';
import { TelaLoginComponent } from './tela-login.component';

@NgModule({
  declarations: [TelaLoginComponent],
  imports: [CommonModule, FormsModule, SharedModule, TelaLoginRoutingModule],
})
export class TelaLoginModule {}
