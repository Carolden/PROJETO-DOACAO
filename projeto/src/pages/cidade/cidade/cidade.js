const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let listaCds = document.getElementById('lista-cds');
let listaBeneficiarios = document.getElementById('lista-beneficiarios');

let formularioCd = document.getElementById('form-cd');
let inputCd = document.getElementById('input-cd');

let formularioBeneficiario = document.getElementById('form-beneficiario');
let inputBeneficiario = document.getElementById('input-beneficiario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cidades/' + id);
  if (resposta.ok) {
    let cidade = await resposta.json();
    let cds = cidade.cds;
    let beneficiarios = cidade.beneficiarios;

    let nomeCidade = document.getElementById('nome-cidade');
    nomeCidade.innerText = cidade.nome;

    for (cd of cds) {
      listaCds.innerHTML += `<a href="cd/cd.html?id=${cd.id}"><li class="list-group-item">${cd.nome}</li></a>`;
    }

    for (beneficiario of beneficiarios) {
      listaBeneficiarios.innerHTML += `<li class="list-group-item">${beneficiario.nome}</li>`;
    }

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

formularioBeneficiario.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    nome: inputBeneficiario.value,
    idCidade: id,
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
    location.reload();
  } else {
    alert('Ops, algo deu errado!');
  }

});
