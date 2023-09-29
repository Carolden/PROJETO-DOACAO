let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCidades () {
  let resposta = await fetch('http://localhost:3000/cidades');
  let cidades = await resposta.json();

  for (let cidade of cidades) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = cidade.nome;
    tdAcoes.innerHTML = `
      <a href="cadastrarCidade.html?id=${cidade.id}">Editar</a>
      <button onclick="excluir(${cidade.id})">Excluir</button>
    `;

    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  await fetch('http://localhost:3000/cidades/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
}

buscarCidades();
