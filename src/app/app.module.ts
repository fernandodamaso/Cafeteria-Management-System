import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HistoricoComponent } from "./historico/historico.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagarComponent } from "./pagar/pagar.component";

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeNl);

@NgModule({
  declarations: [AppComponent, HistoricoComponent, PagarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatPaginatorModule, MatDialogModule, BrowserAnimationsModule],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
