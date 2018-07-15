export class Usuario {
    nome: string;
    cpf: string;
    email: string;
    dataNascimento: Date;
    perfil: number;
    perfilDescricao: string;
    senha: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}