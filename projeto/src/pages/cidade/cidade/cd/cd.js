let tabelaRecebimentos = document.getElementById('corpo-tabela-recebimentos');
let tabelaEntragas = document.getElementById('corpo-tabela-entregas');

async function buscarMovimentacoes () {
  let resposta = await fetch('http://localhost:3000/movimentacoes');
  let movimentacoes = await resposta.json();

  for(let movimentacao of movimentacoes) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdItem = document.createElement('td');
    let tdQuantidade = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = movimentacao.id;
    tdId.className = 'idMovimentacao';

    if (movimentacao.tipo == 'E') {
      tdNome.innerText = movimentacao.beneficiario.nome;
    } else if (movimentacao.tipo == 'S') {
      tdNome.innerText = movimentacao.doador;
    }

    tdItem.innerText = movimentacao.cd_item.itemId;
    tdQuantidade.innerText = movimentacao.quantidade;

    // tdAcoes.innerHTML = `
    // <a href="./formulario/formulario.html?id=${movimentacao.id}" class="btn btn-outline-warning">Editar</a>
    // <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>`;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdItem);
    tr.appendChild(tdQuantidade);
    // tr.appendChild(tdAcoes);

    if (movimentacao.tipo == 'E') {
      tabelaRecebimentos.appendChild(tr);
    } else if (movimentacao.tipo == 'S') {
      tabelaEntregas.appendChild(tr);
    }
  }
}

async function criarMovimentacao() {

}

let botoesExcluir = document.getElementsByClassName('btn-excluir');

buscarMovimentacoes();

document.addEventListener('click', async function (event) {
  console.log('teste');
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





