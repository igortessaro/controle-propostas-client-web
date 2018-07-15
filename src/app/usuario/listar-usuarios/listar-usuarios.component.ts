import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from "../../service/usuario.service";
import { Usuario } from "../../model/usuario.model";
import { AuthenticationService } from "../../service/auth.service";

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Usuario[];

  constructor(
    private router: Router, 
    private usuarioService: UsuarioService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.usuarioService.obterUsuarios()
      .subscribe(data => {
        this.usuarios = data;
      });
  }

  deleteUser(usuario: Usuario): void {
    this.usuarioService.deletarUsuario(usuario.cpf)
      .subscribe(data => {
        this.ngOnInit();
      })
  };

  editUser(usuario: Usuario): void {
    localStorage.removeItem("editarUsuarioCpf");
    localStorage.setItem("editarUsuarioCpf", usuario.cpf);
    this.router.navigate(['editar-usuario']);
  };

  addUser(): void {
    this.router.navigate(['adicionar-usuario']);
  };

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
