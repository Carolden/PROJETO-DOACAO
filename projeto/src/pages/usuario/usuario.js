let corpoTabela = document.getElementById('corpo-tabela');

async function buscarUsuarios () {
  let resposta = await fetch('http://localhost:3000/usuarios');
  let usuarios = await resposta.json();

  for(let usuario of usuarios) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdSenha = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = usuario.id;
    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `<a href="formulario.html?id=${usuario.id}" class="btn btn-outline-warning">Editar</a>
    <a href="#" class="btn btn-outline-danger">Excluir</a>`;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdSenha);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

buscarUsuarios();
