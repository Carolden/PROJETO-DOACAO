let inputEmail = document.getElementById('input-email');
let inputSenha = document.getElementById('input-senha');
let btnEntrar = document.getElementById('btn-entrar');
let btnCriar = document.getElementById('btn-criar');
let formulario = document.getElementById('formulario-login');

async function logar (email, senha) {

  let payload = {
    email,
    senha,
  }

  let resposta = await fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = '../home/home.html';
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert('Ops, algo deu errado!');
  }

}

formulario.addEventListener('submit', async (event) => {
  event.preventDefault()
  event.stopPropagation()

  let email = inputEmail.value;
  let senha = inputSenha.value;
  await logar(email, senha);
});
