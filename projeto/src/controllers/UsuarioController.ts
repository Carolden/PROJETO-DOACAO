import { getRepository } from 'typeorm';
import { Usuario } from '../models/Usuario';
import { Request, Response } from "express";

const crypto = require('crypto');
const hashMD5 = crypto.createHash('md5');

export class UsuarioController {

  async logar (req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let senha = body.senha;
    let email = body.email;

    hashMD5.update(senha);
    const senhaCriptografada = hashMD5.digest('hex');

    let usuario: Usuario | null = await Usuario.findOne({ where: { email: email, senha: senhaCriptografada } });
    if (usuario) {
      return res.status(200).json();
    } else {
      return res.status(422).json({ error: 'Usuario ou senha incorretos!' });
    }
  }

  async criar (req: Request, res: Response): Promise<Response> {
    let body = req.body;

    hashMD5.update(body.senha);
    const senhaCriptografada = hashMD5.digest('hex');

    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: senhaCriptografada,
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

    hashMD5.update(body.senha);
    const senhaCriptografada = hashMD5.digest('hex');

    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.senha = senhaCriptografada;
    usuario.situacao = body.situacao;
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async listar (req: Request, res: Response): Promise<Response> {
    const usuarioRepository = Usuario;
    let resposta = await usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.situacao != :situacao', { situacao: 'I' })
      .getMany();

    return res.status(200).json(resposta);
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

    let result = await Usuario
      .createQueryBuilder()
      .update(Usuario)
      .set({ situacao: "I" })
      .where({ id: id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(200).json();
    }
    return res.status(422).json({ error: 'Usuário não encontrado!' });
  }

}
