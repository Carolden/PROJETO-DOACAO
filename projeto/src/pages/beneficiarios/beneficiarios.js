let corpoTabela = document.getElementById('corpo-tabela');

buscarBeneficiarios();
criarBeneficiario();

buscarCidades();
async function buscarCidades() {
  let selectCidade = document.getElementById('select-nova-cidade');
  let respostaCidades = await fetch('http://localhost:3000/cidades');
  let novasCidades = await respostaCidades.json();

  for (cidade of novasCidades) {
    let opcao = document.createElement('option');
    opcao.value = cidade.id;
    opcao.innerText = cidade.nome;
    selectCidade.appendChild(opcao);
  }
}

document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-excluir')) {
    await excluirBeneficiario(event);
  } else if (event.target.classList.contains('btn-editar')) {
    await editarBeneficiario(event);
  }
});

async function buscarBeneficiarios () {
  let resposta = await fetch('http://localhost:3000/beneficiarios');
  let beneficiarios = await resposta.json();

  for(let beneficiario of beneficiarios) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCidade = document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdId.innerText = beneficiario.id;
    tdId.className = 'idBeneficiario';
    tdNome.innerText = beneficiario.nome;
    tdCidade.innerText = beneficiario.cidade.nome;
    tdNome.className = 'nomeBeneficiario';
    tdCidade.className = 'nomeCidade';
    tdAcoes.innerHTML = `<button type="button" class="btn btn-outline-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar beneficiario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="formulario-edicao-beneficiario">
            <div class="modal-body">
              <input id="editar-beneficiario" class="form-control" type="text" placeholder="Beneficiário" aria-label="default input example">
              <select id="editar-cidade" class="form-select" aria-label="Default select example">
                <option selected disabled>Cidade</option>
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
    tr.appendChild(tdCidade);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function editarBeneficiario (event) {
  let nomeBeneficiario = event.target.closest('tr').querySelector('.nomeBeneficiario').innerText;
  let nomeCidade = event.target.closest('tr').querySelector('.nomeCidade').innerText;
  let idBeneficiario = event.target.closest('tr').querySelector('.idBeneficiario').innerText;

  let selectCidade = document.getElementById('editar-cidade');
  let respostaCidades = await fetch('http://localhost:3000/cidades');
  let opcoesCidades = await respostaCidades.json();

  for (cidade of opcoesCidades) {
    let opcao = document.createElement('option');
    opcao.value = cidade.id;
    opcao.innerText = cidade.nome;
    selectCidade.appendChild(opcao);
  }

  let inputEditarBeneficiario = document.getElementById('editar-beneficiario');
  let inputEditarCidade = document.getElementById('editar-cidade');
  inputEditarBeneficiario.value = nomeBeneficiario;
  inputEditarCidade.value = nomeCidade;

  let editarBeneficiario = document.getElementById('formulario-edicao-beneficiario');

  editarBeneficiario.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: inputEditarBeneficiario.value,
      idCidade: inputEditarCidade.value,
    }

    let url = 'http://localhost:3000/beneficiarios/' + idBeneficiario;
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
      await alert('Beneficiario atualizado com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });
}

async function excluirBeneficiario (event) {
  let idBeneficiario = event.target.closest('tr').querySelector('.idBeneficiario').innerText;
  if (confirm('Tem certeza de que deseja excluir este beneficiário?')) {
    try {
      const response = await fetch(`http://localhost:3000/beneficiarios/${idBeneficiario}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Beneficiário excluído com sucesso!');
        event.target.closest('tr').remove();
      } else {
        alert('Erro ao excluir beneficiário.');
      }
    } catch (error) {
      console.error('Erro ao excluir beneficiário:', error);
    }
  }
}

async function criarBeneficiario () {
  let formBeneficiario = document.getElementById('form-novo-beneficiario');
  let novoBeneficiario = document.getElementById('input-novo-beneficiario');
  let novaCidade = document.getElementById('select-nova-cidade');

  formBeneficiario.addEventListener('submit', async function (event) {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: novoBeneficiario.value,
      cidade: novaCidade.value,
    }

    let resposta = await fetch('http://localhost:3000/beneficiarios', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      await alert('Beneficiário criado com sucesso!');
      location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });

}
