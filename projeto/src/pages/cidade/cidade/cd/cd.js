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
    if (movimentacao.cd_item.id == id) {
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
      <a href="./formulario/formulario.html?id=${movimentacao.id}" class="btn btn-outline-warning">Editar</a>
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

setarItens();

async function setarItens() {
  let resposta = await fetch('http://localhost:3000/cds/' + id);

  let cd = await resposta.json();
  let cdItem = cd.cd_item;

  for ( cdI of cdItem ) {
    let option = document.createElement("option");
    let option2 = document.createElement("option");
    let itemResposta = await fetch('http://localhost:3000/itens/' + cdI.itemId);
    let item = await itemResposta.json();

    option.value = cdI.itemId;
    option.innerText = item.nome;

    option2.value = cdI.itemId;
    option2.innerText = item.nome;

    selectItensEntrada.appendChild(option);
    selectItensSaida.appendChild(option2);

  }
  let beneficiarioResposta = await fetch('http://localhost:3000/beneficiarios/');
  let beneficiarios = await beneficiarioResposta.json();
  for (beneficiario of beneficiarios) {
    // if (cdItem.cidade.id == beneficiario.cidade.id) {
      let optionBeneficiario = document.createElement("option");
      optionBeneficiario.value = beneficiario.id;
      optionBeneficiario.innerText = beneficiario.nome;
      selectBeneficiario.appendChild(optionBeneficiario);
    // }
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
    console.log(payload);
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

buscarMovimentacoes();

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





