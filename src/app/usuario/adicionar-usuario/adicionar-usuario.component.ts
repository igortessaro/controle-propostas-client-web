import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../../service/usuario.service";
import { Router } from "@angular/router";
import { Usuario } from "../../model/usuario.model";
import { ListItem } from "../../model/listItem.model";

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrls: ['./adicionar-usuario.component.css']
})
export class AdicionarUsuarioComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) { }

  submitted: boolean = false;
  usuario: Usuario;
  addForm: FormGroup;
  perfis: ListItem[];

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', Validators.required],
      perfil: ['', Validators.required],
      perfilDescricao: [],
      chaveAcesso: ['', Validators.required],
      confirmSenha: ['', Validators.required]
    });

    this.usuarioService.obterPerfis()
      .subscribe(data => {
        this.perfis = data;
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    if (this.addForm.controls.chaveAcesso.value != this.addForm.controls.confirmSenha.value) {
      alert('Senhas não conferem.');
      return;
    }

    this.usuarioService.criarUsuario(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['listar-usuarios']);
      });
  }

}