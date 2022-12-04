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
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [AppComponent, HistoricoComponent, PagarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
