import { Component, OnInit } from '@angular/core'
import { UsuarioService } from "../service/usuario.service";
import { Router } from "@angular/router";
import { Usuario } from "../model/usuario.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { ListItem } from "../model/listItem.model";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {
  submitted: boolean = false;
  usuario: Usuario;
  editForm: FormGroup;
  perfis: ListItem[];

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    let cpf = localStorage.getItem("editarUsuarioCpf");
    if (!cpf) {
      alert("Invalid action.")
      this.router.navigate(['listar-usuarios']);
      return;
    }

    this.editForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      perfil: ['', Validators.required],
      perfilDescricao: []
    });

    this.usuarioService.obterUsuarioPorCpf(cpf)
      .subscribe(data => {
        this.editForm.setValue(data);
      });

    this.usuarioService.obterPerfis()
      .subscribe(data => {
        this.perfis = data;
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }

    this.usuarioService.atualizarUsuario(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['listar-usuarios']);
        },
        error => {
          alert(error);
        });
  }
}
