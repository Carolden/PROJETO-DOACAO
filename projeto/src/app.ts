// import DB from './db';
// import {UsuarioController} from './controllers/UsuarioController';
// import PromptSync from 'prompt-sync';
// import { Usuario } from './models/Usuario';
// import { ItemController } from './controllers/ItemController';
// import { CategoriaController } from './controllers/CategoriaController';
// import { Categoria } from './models/Categoria';
// import { CdController } from './controllers/CdController';
// import { CD } from './models/CD';
// import { Item } from './models/Item';
// import { CidadeController } from './controllers/CidadeController';
// import { Cidade } from './models/Cidade';

// var prompt = require('prompt-sync')();



// async function main(): Promise<void> {
//   await DB.initialize();

//   let usuario: UsuarioController = new UsuarioController();
//   let itemController: ItemController = new ItemController();
//   let categoriaController: CategoriaController = new CategoriaController();
//   let cdController: CdController = new CdController();
//   let cidadeController: CidadeController = new CidadeController();



//   let input: string | null = '';

//   do {
//     console.clear();
//     console.log('1 - Cadastrar usuário');
//     console.log('2 - Listar usuário');
//     console.log('3 - Editar usuário');
//     console.log('4 - Deletar usuário');
//     console.log('5 - Cadastrar categoria');
//     console.log('6 - Listar categoria');
//     console.log('7 - Editar categoria');
//     console.log('8 - Deletar categoria');
//     console.log('9 - Cadastrar CD');
//     console.log('10 - Listar CD');
//     console.log('11 - Editar CD');
//     console.log('12 - Deletar CD');
//     console.log('13 - Cadastrar item');
//     console.log('14 - Listar item');
//     console.log('15 - Editar item');
//     console.log('16 - Deletar item');
//     console.log('17 - Cadastrar cidade');
//     console.log('18 - Listar cidade');
//     console.log('19 - Editar cidade');
//     console.log('20 - Deletar cidade');



//     console.log('0 - Sair');

//     input = prompt('Selecione a opção desejada: ');

//     switch (input) {
//       // case '1':
//       //   let nome = prompt("Digite seu nome: ")
//       //   let email = prompt('Digite seu email: ')
//       //   let senha = prompt('Digite sua senha: ')

//       //   await usuario.criar(nome, email, senha);
//       //   break;
//       case '2':
//         let user = await usuario.listar();
//         console.table(user);
//         break;
//       case '3':
//         let listaUserEdit = await usuario.listar();
//         console.table(listaUserEdit);
//         let id: number = Number(prompt('Qual o ID? '));
//         let buscarUsuario: Usuario | null = await usuario.buscar(id);
//         if (buscarUsuario) {
//           let nome = prompt(`Nome (${buscarUsuario.nome}): `, buscarUsuario.nome);
//           let email = prompt(`E-mail (${buscarUsuario.email}): `, buscarUsuario.email);
//           let senha = prompt(`Senha (${buscarUsuario.senha}): `, buscarUsuario.senha);
//           let situacao = prompt(`Situação(${buscarUsuario.situacao}): `, buscarUsuario.situacao);
//           buscarUsuario = await usuario.editar(buscarUsuario, nome, email, senha, situacao);
//           console.log(`Cliente ID #${buscarUsuario.id} atualizado com sucesso!`);
//           } else {
//             console.log('Cliente não encontrado!');
//           }
//         break;
//       case '4':
//         let listaUserDelete = await usuario.listar();
//         console.table(listaUserDelete);
//         let IdDeletar: number = Number(prompt('Qual o ID? '));
//         if (IdDeletar) {
//           await usuario.deletar(IdDeletar);
//           console.log(`Cliente ID #${IdDeletar} excluído com sucesso!`);
//         } else {
//           console.log('Cliente não encontrado!');
//         }
//         break;
//       case '5':
//         let categoria = prompt("Digite o nome da categoria: ")
//         await categoriaController.criar(categoria);
//         break;
//       case '6':
//         let cat = await categoriaController.listar();
//         console.table(cat);
//         break;
//       case '7':
//         let listaCat = await categoriaController.listar();
//         console.table(listaCat);
//         let idCat: number = Number(prompt('Qual o ID? '));
//         let buscarCat: Categoria | null = await categoriaController.buscar(idCat);
//         if (buscarCat) {
//           let catNome = prompt(`Categoria (${buscarCat.nome}): `, buscarCat.nome);
//           let catSituacao = prompt(`Situação (${buscarCat.situacao}): `, buscarCat.situacao);
//           buscarCat = await categoriaController.editar(buscarCat, catNome, catSituacao);
//           console.log(`Categoria ID #${buscarCat.id} atualizado com sucesso!`);
//           } else {
//             console.log('Categoria não encontrada!');
//           }
//         break;
//       case '8':
//         let listaCatDelete = await categoriaController.listar();
//         console.table(listaCatDelete);
//         let catDeletar: number = Number(prompt('Qual o ID? '));
//         if (catDeletar) {
//           await categoriaController.deletar(catDeletar);
//           console.log(`Cliente ID #${catDeletar} excluído com sucesso!`);
//         } else {
//           console.log('Cliente não encontrado!');
//         }
//         break;
//       case '9':
//         let nomeCD = prompt("Digite o nome do CD: ")
//         await cdController.criar(nomeCD);
//         break;
//       case '10':
//         let cdListar = await cdController.listar();
//         console.table(cdListar);
//         break;
//       case '11':
//         let listaCd = await cdController.listar();
//         console.table(listaCd);
//         let idCd: number = Number(prompt('Qual o ID? '));
//         let buscarCd: CD | null = await cdController.buscar(idCd);
//         if (buscarCd) {
//           let cdNome = prompt(`CD (${buscarCd.nome}): `, buscarCd.nome);
//           let cdSituacao = prompt(`Situação (${buscarCd.situacao}): `, buscarCd.situacao);
//           buscarCd = await cdController.editar(buscarCd, cdNome, cdSituacao);
//           console.log(`Categoria ID #${buscarCd.id} atualizado com sucesso!`);
//           } else {
//             console.log('Categoria não encontrada!');
//           }
//         break;
//       case '12':
//         let listaCdDelete = await cdController.listar();
//         console.table(listaCdDelete);
//         let cdDeletar: number = Number(prompt('Qual o ID? '));
//         if (cdDeletar) {
//           await cdController.deletar(cdDeletar);
//           console.log(`Cliente ID #${cdDeletar} excluído com sucesso!`);
//         } else {
//           console.log('Cliente não encontrado!');
//         }
//         break;
//       case '13':
//         let nomeItem = prompt("Digite o nome do item: ");
//         let listaCatRelaciona = await categoriaController.listar();
//         console.table(listaCatRelaciona);
//         let idCategoriaItem: number = Number(prompt("Digite o id da categoria do item: "));


//         await itemController.criar(nomeItem, idCategoriaItem);
//         break;

//       case '14':
//         let listaItem = await itemController.listar();
//         for (let i = 0; i < listaItem.length; i++) {
//           console.log(listaItem[i].id + ' | ' + listaItem[i].nome.toString() + ' | ' + listaItem[i].situacao + ' | ' + listaItem[i].categoria.id.toString() + ' | ' + listaItem[i].movimentacao);
//         }
//         break;

//       case '15':
//         let listaItemEdit = await itemController.listar();
//         console.table(listaItemEdit);
//         let idListaItem: number = Number(prompt('Qual o ID? '));
//         let buscarItem: Item | null = await itemController.buscar(idListaItem);
//         if (buscarItem) {
//           let nomeItem = prompt(`Nome (${buscarItem.nome}): `, buscarItem.nome);
//           let situacaoItem = prompt(`Situação (${buscarItem.situacao}): `, buscarItem.situacao);
//           let idCategoria = prompt(`Categoria - informe o id: `);

//           buscarItem = await itemController.editar(buscarItem, nomeItem, situacaoItem, idCategoria);

//           console.log(`Item ID #${buscarItem.id} atualizado com sucesso!`);
//           } else {
//             console.log('Item não encontrado!');
//           }
//           break;

//       case '16':
//         let listaItemDelete = await itemController.listar();
//         console.table(listaItemDelete);
//         let idItem: number = Number(prompt('Qual o ID? '));

//         if (idItem) {
//           await itemController.deletar(idItem);
//           console.log(`Cliente ID #${idItem} excluído com sucesso!`);
//         } else {
//           console.log('Cliente não encontrado!');
//         }
//         break;

//       case '17':
//         let nomeCidade: string = prompt('Qual é o nome da cidade? ');
//         await cidadeController.criar(nomeCidade);
//         break;
//       case '18':
//         let cidade = await cidadeController.listar();
//         console.table(cidade);
//         break;
//       case '19':
//         let listaCidadeEdit = await cidadeController.listar();
//         console.table(listaCidadeEdit);
//         let idCidade: number = Number(prompt('Qual o ID? '));
//         let buscarCidade: Cidade | null = await cidadeController.buscar(idCidade);
//         if (buscarCidade) {
//           let nomeCidade = prompt(`Nome (${buscarCidade.nome}): `, buscarCidade.nome);
//           buscarCidade = await cidadeController.editar(idCidade, nomeCidade);
//           console.log(`Cidade ID #${buscarCidade?.id} atualizado com sucesso!`);
//           } else {
//             console.log('Cidade não encontrada!');
//           }
//         break;
//       case '20':
//       let listaCidadeDelete = await cidadeController.listar();
//       console.table(listaCidadeDelete);
//       let cidadeDeletar: number = Number(prompt('Qual o ID? '));
//       if (cidadeDeletar) {
//         await cidadeController.deletar(cidadeDeletar);
//         console.log(`Cidade ID #${cidadeDeletar} excluída com sucesso!`);
//       } else {
//         console.log('Cidade não encontrada!');
//       }
//       break;

//         }
//     prompt('Pressione enter para continuar');
//   } while (input != '0');
// }

// main();

import DB from './db';
import server from './server';

async function main(): Promise<void> {
  await DB.initialize();

  server.start();
}

main();

