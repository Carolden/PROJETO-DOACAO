const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('input-nome');
let inputEmail = document.getElementById('input-email');
let inputSenha = document.getElementById('input-senha');
let formulario = document.getElementById('input-formulario');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/usuarios/' + id);
  if (resposta.ok) {
    let usuario = await resposta.json();
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputSenha.value = usuario.senha;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops, algo deu errado');
  }
}

//Está editando
if (id) {
  buscarDados();
}

formulario.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    nome: inputNome.value,
    email: inputEmail.value,
    senha: inputSenha.value,
  }

  let url = 'http://localhost:3000/usuarios';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'usuario.html';
  } else {
    alert('Ops, algo deu errado!');
  }
});
