import { getRepository } from 'typeorm';
import { Usuario } from '../models/Usuario';

export class UsuarioController {

  async logar(email: string, senha: string): Promise<number | null> {
    let senhaCriptografada = this.criptografar(senha);

    let usuario: Usuario | null = await Usuario.findOne({ where: { email: email, senha: senhaCriptografada } });
    if (usuario) {
      return usuario.id;
    } else {
      return null;
    }
  }

  async criar (nome: string, email: string, senhaInserida: string): Promise<Usuario> {
    let senha: string = this.criptografar(senhaInserida);
    return await Usuario.create({
      nome,
      email,
      senha,
    }).save();
  }

  async editar (usuario: Usuario, nome: string, email: string, senha: string, situacao: string): Promise<Usuario> {
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = this.criptografar(senha);
    usuario.situacao = situacao;
    await usuario.save();

    return usuario;
  }

  async listar(): Promise<Usuario[]> {
    const usuarioRepository = Usuario;
    return await usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.situacao != :situacao', { situacao: 'I' })
      .getMany();
  }

  async buscar(id: number) {
    let usuario: Usuario | null = await Usuario.findOneBy({ id: id });
    return usuario;
  }

  async deletar(id: number) {
    let result = await Usuario
      .createQueryBuilder()
      .update(Usuario)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return true;
    }
    return false;
  }

  criptografar(senha: string) {
    const crypto = require('crypto');
    const hashMD5 = crypto.createHash('md5');
    hashMD5.update(senha);
    const senhaCriptografada = hashMD5.digest('hex');
    return senhaCriptografada;
  }

}
