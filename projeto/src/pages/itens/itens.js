let corpoTabela = document.getElementById('corpo-tabela');

buscarItens();
criarItem();

buscarCategorias();

async function buscarCategorias() {
  let selectCategoria = document.getElementById('select-nova-categoria');
  let respostaCategorias = await fetch('http://localhost:3000/categorias');
  let categorias = await respostaCategorias.json();

  for (categoria of categorias) {
    let opcao = document.createElement('option');
    opcao.value = categoria.id;
    opcao.innerText = categoria.nome;
    selectCategoria.appendChild(opcao);
  }
}

document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-excluir')) {
    await excluirItem(event);
  } else if (event.target.classList.contains('btn-editar')) {
    await editarItem(event);
  }
});

async function buscarItens () {
  let resposta = await fetch('http://localhost:3000/itens');
  let itens = await resposta.json();

  for(let item of itens) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCategoria = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = item.id;
    tdId.className = 'idItem';
    tdNome.innerText = item.nome;
    tdCategoria.innerText = item.categoria.nome;
    tdNome.className = 'nomeItem';
    tdCategoria.className = 'nomeCategoria';
    tdAcoes.innerHTML = `<button type="button" class="btn btn-outline-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar item</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="formulario-edicao-item">
            <div class="modal-body">
              <input id="editar-item" class="form-control" type="text" placeholder="Item" aria-label="default input example">
              <select id="editar-categoria" class="form-select" aria-label="Default select example">
                <option selected disabled>Categoria</option>
              </select>
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
    tr.appendChild(tdCategoria);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function editarItem (event) {
  let nomeItem = event.target.closest('tr').querySelector('.nomeItem').innerText;
  let nomeCategoria = event.target.closest('tr').querySelector('.nomeCategoria').innerText;
  let idItem = event.target.closest('tr').querySelector('.idItem').innerText;

  let selectCategoria = document.getElementById('editar-categoria');
  let respostaCategorias = await fetch('http://localhost:3000/categorias');
  let opcoesCategorias = await respostaCategorias.json();

  for (categoria of opcoesCategorias) {
    let opcao = document.createElement('option');
    opcao.value = categoria.id;
    opcao.innerText = categoria.nome;
    selectCategoria.appendChild(opcao);
  }

  let inputEditarItem = document.getElementById('editar-item');
  let inputEditarCategoria = document.getElementById('editar-categoria');
  inputEditarItem.value = nomeItem;
  inputEditarCategoria.value = nomeCategoria;

  let editarItem = document.getElementById('formulario-edicao-item');

  editarItem.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: inputEditarItem.value,
      idCategoria: inputEditarCategoria.value,
    }

    let url = 'http://localhost:3000/itens/' + idItem;
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
      await alert('Item atualizado com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });
}

async function excluirItem (event) {
  let idItem = event.target.closest('tr').querySelector('.idItem').innerText;
  if (confirm('Tem certeza de que deseja excluir este item?')) {
    try {
      const response = await fetch(`http://localhost:3000/itens/${idItem}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Item excluído com sucesso!');
        event.target.closest('tr').remove();
      } else {
        alert('Erro ao excluir item.');
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  }
}

async function criarItem () {
  let formBeneficiario = document.getElementById('form-novo-item');
  let novoBeneficiario = document.getElementById('input-novo-item');
  let categoria = document.getElementById('select-nova-categoria');

  formBeneficiario.addEventListener('submit', async function (event) {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: novoBeneficiario.value,
      idCategoria: categoria.value,
    }

    let resposta = await fetch('http://localhost:3000/itens', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Item criado com sucesso!');
      location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });

}
