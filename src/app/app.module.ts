import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PagarComponent } from "./pagar/pagar.component";
import { NovoSocioComponent } from './novo-socio/novo-socio.component';
import { FormsModule } from "@angular/forms";
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

@NgModule({
  declarations: [AppComponent, PagarComponent, NovoSocioComponent, NovoProdutoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatPaginatorModule, MatDialogModule, BrowserAnimationsModule, FormsModule],

  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
