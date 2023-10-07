const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


let tabelaRecebimentos = document.getElementById('corpo-tabela-recebimentos');
let tabelaEntregas = document.getElementById('corpo-tabela-entregas');

let selectItensEntrada = document.getElementById('select-item-entrada');
let selectQuantidadeEntrada = document.getElementById('select-quantidade-entrada');
let doador = document.getElementById('input-nome-doador');

let tabelaSaidas = document.getElementById('corpo-tabela-entregas');
let selectItensSaida = document.getElementById('select-item-saida');
let selectQuantidadeSaida = document.getElementById('select-quantidade-saida');
let selectBeneficiario = document.getElementById('select-beneficiario');

async function buscarMovimentacoes () {
  let resposta = await fetch('http://localhost:3000/movimentacoes');
  let movimentacoes = await resposta.json();

  for(let movimentacao of movimentacoes) {
    if (movimentacao.cd_item.cdId == id) {
      let tr = document.createElement('tr');
      let tdId = document.createElement('td');
      let tdNome = document.createElement('td');
      let tdItem = document.createElement('td');
      let tdQuantidade = document.createElement('td');
      let tdAcoes = document.createElement('td');
      tdId.innerText = movimentacao.id;
      tdId.className = 'idMovimentacao';

      if (movimentacao.tipo == 'E') {
        tdNome.innerText = movimentacao.doador;
      } else if (movimentacao.tipo == 'S') {
        tdNome.innerText = movimentacao.beneficiario.nome;
      }


      let itemResposta = await fetch('http://localhost:3000/itens/' + movimentacao.cd_item.itemId);
      let item = await itemResposta.json();

      tdItem.innerText = item.nome;
      tdQuantidade.innerText = movimentacao.quantidade;

      tdAcoes.innerHTML = `

      <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>`;

      tr.appendChild(tdId);
      tr.appendChild(tdNome);
      tr.appendChild(tdItem);
      tr.appendChild(tdQuantidade);
      tr.appendChild(tdAcoes);

      if (movimentacao.tipo == 'E') {
        tabelaRecebimentos.appendChild(tr);
      } else if (movimentacao.tipo == 'S') {
        tabelaEntregas.appendChild(tr);
      }
    }
    }
}

buscarMovimentacoes();

setarItens();

async function setarItens() {
  let resposta = await fetch('http://localhost:3000/cds/' + id);

  let cd = await resposta.json();
  let cdItem = cd.cd_item;

  let nomeCD = document.getElementById('nome-cd');
  nomeCD.innerText = cd.nome;

  let headerCD = document.getElementById('header-cd');
  let divEditar = document.createElement('div');
  divEditar.innerHTML = `
  <button id="botao-editar" type="button" class="btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Editar CD</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="formulario-edicao-cd">
        <div class="modal-body">
          <input id="editar-cd" class="form-control" type="text" placeholder="Centro de distribuição" aria-label="default input example">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </form>
      </div>
    </div>
  </div>`;

  headerCD.appendChild(divEditar);

  let inputEditarCd = document.getElementById('editar-cd');
  inputEditarCd.value = nomeCD.innerText;

  let editarCd = document.getElementById('formulario-edicao-cd');

  editarCd.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: inputEditarCd.value,
    }

    let resposta = await fetch('http://localhost:3000/cds/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Centro de distribuição atualizado com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });

  let itensResposta = await fetch('http://localhost:3000/itens');
  let itemEntrada = await itensResposta.json();
  for (item of itemEntrada) {
    let option = document.createElement("option");
    option.value = item.id;
    option.innerText = item.nome;
    selectItensEntrada.appendChild(option);
  }

  for ( cdI of cdItem ) {
    let option2 = document.createElement("option");
    let itemResposta = await fetch('http://localhost:3000/itens/' + cdI.itemId);
    let item = await itemResposta.json();

    option2.value = cdI.id;
    option2.innerText = item.nome;

    selectItensSaida.appendChild(option2);
  }
  let beneficiarioResposta = await fetch('http://localhost:3000/beneficiarios/');
  let beneficiarios = await beneficiarioResposta.json();

  let cdResposta = await fetch('http://localhost:3000/cds/' + id);
  let centroDistribuicao = await cdResposta.json();

  for (beneficiario of beneficiarios) {
    console.log('cd' + centroDistribuicao.cidade.id);
    console.log(beneficiario.cidade.id);
    if (beneficiario.cidade.id == centroDistribuicao.cidade.id) {
      let optionBeneficiario = document.createElement("option");
      optionBeneficiario.value = beneficiario.id;
      optionBeneficiario.innerText = beneficiario.nome;
      selectBeneficiario.appendChild(optionBeneficiario);
    }
  }

  selectItensEntrada.addEventListener('change', async (event) => {
    selectQuantidadeEntrada.innerHTML = '';
    for (let i = 0; i < 15; i++) {
      let optionQtd = document.createElement("option");
      optionQtd.value = i + 1;
      optionQtd.innerText = i + 1;
      selectQuantidadeEntrada.appendChild(optionQtd);
    }
  });

  selectItensSaida.addEventListener('change', async (event) => {
    selectQuantidadeSaida.innerHTML = '';
    for ( cdI of cdItem ) {
      if (cdI.id == selectItensSaida.value) {
        for (let i = 0; i < cdI.quantidade; i++) {
          let optionQtd1 = document.createElement("option");
          optionQtd1.value = i + 1;
          optionQtd1.innerText = i + 1;
          selectQuantidadeSaida.appendChild(optionQtd1);
        }
      }
    }
  });

}

let formEntrada = document.getElementById('formulario-entrada');
let formSaida = document.getElementById('formulario-saida');

novaEntrada();
novaSaida();


async function novaEntrada () {
  formEntrada.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      tipo: 'E',
      quantidade: selectQuantidadeEntrada.value,
      doador: doador.value,
      itemId: selectItensEntrada.value,
      cdId: id,
    }
    criarMovimentacao(payload);
  });
}

async function novaSaida () {
  formSaida.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      tipo: 'S',
      quantidade: selectQuantidadeSaida.value,
      idBeneficiario: selectBeneficiario.value,
      itemId: selectItensSaida.value,
      cdId: id,
    }
    criarMovimentacao(payload);
  });
}


async function criarMovimentacao(payload) {
  let resposta = await fetch('http://localhost:3000/movimentacoes', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    location.reload();
  } else {
    alert('Ops, algo deu errado!');
  }
}


let botoesExcluir = document.getElementsByClassName('btn-excluir');

document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-excluir')) {

    let idMovimentacao = event.target.closest('tr').querySelector('.idMovimentacao').innerText;

    if (confirm('Tem certeza de que deseja excluir esta movimentação?')) {
      try {
        const response = await fetch(`http://localhost:3000/movimentacoes/${idMovimentacao}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Movimentação excluída com sucesso!');
          event.target.closest('tr').remove();
        } else {
          alert('Erro ao excluir movimentação.');
        }
      } catch (error) {
        console.error('Erro ao excluir movimentação:', error);
      }
    }
  }
});




