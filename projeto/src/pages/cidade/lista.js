let corpoTabela = document.getElementById('corpo-tabela');

async function buscarCidades () {
  let resposta = await fetch('http://localhost:3000/cidades');
  let cidades = await resposta.json();

  for(let cidade of cidades) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = cidade.id;
    tdId.className = 'idCidade';
    tdNome.innerText = cidade.nome;
    tdNome.className = 'nomeCidade';
    tdAcoes.innerHTML = `<a href="./cidade/cidade.html?id=${cidade.id}" class="btn btn-outline-primary">Listar</a>
    <button type="button" class="btn btn-outline-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar cidade</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="formulario-edicao-cidade">
            <div class="modal-body">
              <input id="editar-cidade" class="form-control" type="text" placeholder="Cidade" aria-label="default input example">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>`;

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

let botoesExcluir = document.getElementsByClassName('btn-excluir');

buscarCidades();

document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-editar')) {
    editarCidade(event);
  } else if (event.target.classList.contains('btn-excluir')) {

    let idCidade = event.target.closest('tr').querySelector('.idCidade').innerText;

    if (confirm('Tem certeza de que deseja excluir esta cidade?')) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${idCidade}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Cidade excluído com sucesso!');
          this.location.reload();
        } else {
          alert('Erro ao excluir cidade.');
        }
      } catch (error) {
        console.error('Erro ao excluir cidade:', error);
      }
    }
  }
});

async function editarCidade (event) {
  let nomeCidade = event.target.closest('tr').querySelector('.nomeCidade').innerText;
  let idCidade = event.target.closest('tr').querySelector('.idCidade').innerText;

  let inputEditarCidade = document.getElementById('editar-cidade');
  inputEditarCidade.value = nomeCidade;

  let editarCidade = document.getElementById('formulario-edicao-cidade');

  editarCidade.addEventListener('submit', async (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    let payload = {
      nome: inputEditarCidade.value,
    }

    let resposta = await fetch('http://localhost:3000/cidades/' + idCidade, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Cidade atualizada com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });
}

criarCidade();
async function criarCidade () {
  let formCidade = document.getElementById('form-nova-cidade');
  let novaCidade = document.getElementById('input-nova-cidade');

  formCidade.addEventListener('submit', async function (event) {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: novaCidade.value,
    }

    let resposta = await fetch('http://localhost:3000/cidades', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Cidade criada com sucesso!');
      location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });

}
