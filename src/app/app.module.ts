import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NovoSocioComponent } from './novo-socio/novo-socio.component';
import { FormsModule } from "@angular/forms";
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [AppComponent,  NovoSocioComponent, NovoProdutoComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatPaginatorModule, MatDialogModule, BrowserAnimationsModule, FormsModule, MatSlideToggleModule, MatNativeDateModule],

  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
