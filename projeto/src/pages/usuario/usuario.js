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
    tdId.className = 'idUsuario';
    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `<a href="formulario.html?id=${usuario.id}" class="btn btn-outline-warning">Editar</a>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>`;


    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdSenha);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

let botoesExcluir = document.getElementsByClassName('btn-excluir');

buscarUsuarios();

document.addEventListener('click', async function (event) {
  console.log('teste');
  if (event.target.classList.contains('btn-excluir')) {

    let idUsuario = event.target.closest('tr').querySelector('.idUsuario').innerText;

    if (confirm('Tem certeza de que deseja excluir este usuário?')) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Usuário excluído com sucesso!');
          event.target.closest('tr').remove();
        } else {
          alert('Erro ao excluir o usuário.');
        }
      } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
      }
    }
  }
});





