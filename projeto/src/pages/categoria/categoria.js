let corpoTabela = document.getElementById('corpo-tabela');

buscarCategorias();
criarCategoria();
document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-excluir')) {
    await excluirCategoria(event);
  } else if (event.target.classList.contains('btn-editar')) {
    await editarCategoria(event);
  }
});

async function buscarCategorias () {
  let resposta = await fetch('http://localhost:3000/categorias');
  let categorias = await resposta.json();

  for(let categoria of categorias) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = categoria.id;
    tdId.className = 'idCategoria';
    tdNome.innerText = categoria.nome;
    tdNome.className = 'nomeCategoria';
    tdAcoes.innerHTML = `<button type="button" class="btn btn-outline-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar categoria</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="formulario-edicao-categoria">
            <div class="modal-body">
              <input id="editar-categoria" class="form-control" type="text" placeholder="Categoria" aria-label="default input example">
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

async function editarCategoria (event) {
  let nomeCategoria = event.target.closest('tr').querySelector('.nomeCategoria').innerText;
  let idCategoria = event.target.closest('tr').querySelector('.idCategoria').innerText;

  let inputEditarCategoria = document.getElementById('editar-categoria');
  inputEditarCategoria.value = nomeCategoria;

  let editarCategoria = document.getElementById('formulario-edicao-categoria');

  editarCategoria.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: inputEditarCategoria.value,
    }

    let url = 'http://localhost:3000/categorias/' + idCategoria;
    let method = 'PUT';

    let resposta = await fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Categoria atualizada com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });
}

async function excluirCategoria (event) {
  let idCategoria = event.target.closest('tr').querySelector('.idCategoria').innerText;
  if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
    try {
      const response = await fetch(`http://localhost:3000/categorias/${idCategoria}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Categoria excluída com sucesso!');
        event.target.closest('tr').remove();
      } else {
        alert('Erro ao excluir categoria.');
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  }
}

async function criarCategoria () {
  let formCategoria = document.getElementById('form-nova-categoria');
  let novaCategoria = document.getElementById('input-nova-categoria');

  formCategoria.addEventListener('submit', async function (event) {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: novaCategoria.value,
    }

    let resposta = await fetch('http://localhost:3000/categorias', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Categoria criada com sucesso!');
      location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });

}
