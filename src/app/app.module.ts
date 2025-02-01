import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NovoNucleoComponent } from './modal-novo-nucleo/novo-nucleo.component';
import { AuthService } from './_services/authService.service';
import { AuthGuard } from './_services/auth.guard';
import { ProdutosService, ProdutosServiceApiProductsImpl } from './_services/produtos';
import { TiposService, TiposServiceApiProductCategoryImpl } from './_services/tipos';
import { SociosService } from './_services/socios/socios.service';
import { SociosServiceApiUserImpl } from './_services/socios/socios.api';
import { NucleosService } from './_services/nucleos/nucleos.service';
import { NucleosServiceApiNucleosImpl } from './_services/nucleos/nucleos.api';
import { VendasService } from './_services/vendas/vendas.service';
import { VendasServiceApiOrderImpl } from './_services/vendas/vendas.api';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent, NovoNucleoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
  ],

  providers: [
    AuthService, 
    AuthGuard,
    {
      provide: ProdutosService, useClass: ProdutosServiceApiProductsImpl
    },
    { 
      provide: TiposService, useClass: TiposServiceApiProductCategoryImpl
    },
    { 
      provide: SociosService, useClass: SociosServiceApiUserImpl
    },
    { 
      provide: NucleosService, useClass: NucleosServiceApiNucleosImpl
    },
    { 
      provide: VendasService, useClass: VendasServiceApiOrderImpl
    }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
