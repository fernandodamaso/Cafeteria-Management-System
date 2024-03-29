import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NovoSocioComponent } from "./modal-novo-socio/novo-socio.component";
import { NovoProdutoComponent } from "./modal-novo-produto/novo-produto.component";
import { NovoNucleoComponent } from "./modal-novo-nucleo/novo-nucleo.component";

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [AppComponent, NovoSocioComponent, NovoProdutoComponent, NovoNucleoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatPaginatorModule, MatDialogModule, BrowserAnimationsModule, FormsModule, MatSlideToggleModule, MatNativeDateModule, ReactiveFormsModule, MatSnackBarModule, NgxMaskModule.forRoot(), ],

  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
