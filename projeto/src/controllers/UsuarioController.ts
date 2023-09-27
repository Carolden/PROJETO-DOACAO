import { getRepository } from 'typeorm';
import { Usuario } from '../models/Usuario';
import { Request, Response } from "express";


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

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: body.senha,
      situacao: body.situacao,
    }).save();

    return res.status(200).json(usuario);
  }

  async atualizar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.senha = body.senha;
    usuario.situacao = body.situacao;
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async listar (req: Request, res: Response): Promise<Response> {
    let users: Usuario[] = await Usuario.find();

    return res.status(200).json(users);
  };

  async buscar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    return res.status(200).json(usuario);
  }

  async deletar (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario|null = await Usuario.findOneBy({ id });
    if (! usuario) {
      return res.status(422).json({ error: 'Usuario não encontrado!' });
    }

    usuario.remove();

    return res.status(200).json();
  }

  criptografar(senha: string) {
    const crypto = require('crypto');
    const hashMD5 = crypto.createHash('md5');
    hashMD5.update(senha);
    const senhaCriptografada = hashMD5.digest('hex');
    return senhaCriptografada;
  }

}
