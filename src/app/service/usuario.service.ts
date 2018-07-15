import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from "../model/usuario.model";
import { ListItem } from '../model/listItem.model';

@Injectable()
export class UsuarioService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:50480/api/usuario';

    obterUsuarios() {
        return this.http.get<Usuario[]>(this.baseUrl);
    }

    obterUsuarioPorCpf(cpf: string) {
        return this.http.get<Usuario>(this.baseUrl + '/' + cpf);
    }

    criarUsuario(usuario: Usuario) {
        return this.http.post(this.baseUrl, usuario);
    }

    atualizarUsuario(usuario: Usuario) {
        return this.http.put(this.baseUrl + '/' + usuario.cpf, usuario);
    }

    deletarUsuario(cpf: string) {
        console.log('deletarUsuario-' + cpf);
        return this.http.delete(this.baseUrl + '/' + cpf);
    }

    obterPerfis() {
        return this.http.get<ListItem[]>(this.baseUrl + '/perfis');
    }
}
