import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from "./app.routing";
import { AuthenticationService } from "./service/auth.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { UsuarioService } from "./service/usuario.service";
 
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';
  
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdicionarUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuariosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService, 
    UsuarioService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})

export class AppModule { }
