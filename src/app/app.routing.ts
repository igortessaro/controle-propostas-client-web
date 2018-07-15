import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";

import { AdicionarUsuarioComponent } from "./usuario/adicionar-usuario/adicionar-usuario.component";
import { ListarUsuariosComponent } from "./usuario/listar-usuarios/listar-usuarios.component";
import { EditarUsuarioComponent } from "./usuario/editar-usuario/editar-usuario.component";
import { HomeComponent } from "./home/home.component";

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'adicionar-usuario', component: AdicionarUsuarioComponent },
    { path: 'listar-usuarios', component: ListarUsuariosComponent },
    { path: 'editar-usuario', component: EditarUsuarioComponent },
    { path: '', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'home', redirectTo: ''},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);