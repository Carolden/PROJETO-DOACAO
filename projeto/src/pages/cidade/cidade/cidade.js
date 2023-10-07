const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let listaCds = document.getElementById('lista-cds');
let listaBeneficiarios = document.getElementById('lista-beneficiarios');

let formularioCd = document.getElementById('form-cd');
let inputCd = document.getElementById('input-novo-cd');

let formularioBeneficiario = document.getElementById('form-beneficiario');
let inputBeneficiario = document.getElementById('input-beneficiario');

let corpoTabela = document.getElementById('corpo-tabela');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cidades/' + id);
  if (resposta.ok) {
    let cidade = await resposta.json();
    let cds = cidade.cds;
    let beneficiarios = cidade.beneficiarios;

    let nomeCidade = document.getElementById('nome-cidade');
    nomeCidade.innerText = cidade.nome;

    for(let cd of cds) {
      let tr = document.createElement('tr');
      let tdId = document.createElement('td');
      let tdNome = document.createElement('td');
      let tdAcoes = document.createElement('td');

      tdId.innerText = cd.id;
      tdId.className = 'idCD';
      tdNome.innerText = cd.nome;
      tdNome.className = 'nomeCD';
      // tdAcoes.innerHTML = `<button type="button" class="btn btn-outline-warning btn-excluir">Editar</button>

      tdAcoes.innerHTML = `
      <a href="cd/cd.html?id=${cd.id}" class="btn btn-outline-primary">Acessar</a>
      <button type="button" class="btn btn-outline-warning btn-editar" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
      <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Editar CD</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="formulario-edicao-cd">
              <div class="modal-body">
                <input id="editar-cd" class="form-control" type="text" placeholder="Centro de distribuição" aria-label="default input example">
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

    // for (cd of cds) {
    //   listaCds.innerHTML += `<a href="cd/cd.html?id=${cd.id}"><li class="list-group-item">${cd.nome}</li></a>`;
    // }

    // for (beneficiario of beneficiarios) {
    //   listaBeneficiarios.innerHTML += `<li class="list-group-item">${beneficiario.nome}</li>`;
    // }

  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    console.log(resposta.json());
    alert('Ops, algo deu errado');
  }
}

//Está editando
if (id) {
  buscarDados();
}

formularioCd.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    nome: inputCd.value,
    idCidade: id,
  }

  let resposta = await fetch('http://localhost:3000/cds', {
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

});

// formularioBeneficiario.addEventListener('submit', async (event) => {
//   event.stopPropagation();
//   event.preventDefault();

//   let payload = {
//     nome: inputBeneficiario.value,
//     idCidade: id,
//   }

//   let resposta = await fetch('http://localhost:3000/beneficiarios', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   });

//   if (resposta.ok) {
//     location.reload();
//   } else {
//     alert('Ops, algo deu errado!');
//   }

// });


document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('btn-excluir')) {
    await excluirCd(event);
  }
   else if (event.target.classList.contains('btn-editar')) {
    await editarCd(event);
  }
});

async function excluirCd (event) {
  let idCd = event.target.closest('tr').querySelector('.idCD').innerText;
  if (confirm('Tem certeza de que deseja excluir este Centro de distribuição?')) {
    try {
      const response = await fetch(`http://localhost:3000/cds/${idCd}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Centro de distribuição excluído com sucesso!');
        event.target.closest('tr').remove();
      } else {
        alert('Erro ao excluir Centro de distribuição.');
      }
    } catch (error) {
      console.error('Erro ao excluir Centro de distribuição:', error);
    }
  }
}

async function editarCd (event) {
  let nomeCd = event.target.closest('tr').querySelector('.nomeCD').innerText;
  let idCd = event.target.closest('tr').querySelector('.idCD').innerText;

  let inputEditarCd = document.getElementById('editar-cd');
  inputEditarCd.value = nomeCd;

  let editarCd = document.getElementById('formulario-edicao-cd');

  editarCd.addEventListener('submit', async (event) => {
    event.stopPropagation();
    event.preventDefault();

    let payload = {
      nome: inputEditarCd.value,
    }

    let url = 'http://localhost:3000/cds/' + idCd;
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
      await alert('Centro de distribuição atualizado com sucesso!');
      this.location.reload();
    } else {
      alert('Ops, algo deu errado!');
    }
  });
}
