let corpoTabela = document.getElementById('corpo-tabela');

async function buscarUsuarios () {
  let resposta = await fetch('http://localhost:3000/usuarios');
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdSenha = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `
      <a href="cadastrarUsuario.html?id=${usuario.id}">Editar</a>
      <button onclick="excluir(${usuario.id})">Excluir</button>
    `;

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  await fetch('http://localhost:3000/usuarios/' + id, {
    method: 'DELETE'
  });

  window.location.reload();
}

buscarUsuarios();
