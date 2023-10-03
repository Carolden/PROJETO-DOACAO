const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let listaCds = document.getElementById('lista-cds');
let listaBeneficiarios = document.getElementById('lista-beneficioarios');

async function buscarDados () {
  let resposta = await fetch('http://localhost:3000/cidades/' + id);
  if (resposta.ok) {
    let cidade = await resposta.json();
    let cds = cidade.cds;
    let beneficiarios = cidade.beneficiarios;

    for (cd of cds) {
      listaCds.innerHTML += `<li class="list-group-item">${cd.nome}</li>`;
    }

    for (pessoa of beneficiarios) {
      listaBeneficiarios.innerHTML = `<li class="list-group-item">${pessoa.nome}</li>`;
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



// formulario.addEventListener('submit', async (event) => {
//   event.stopPropagation();
//   event.preventDefault();

//   let payload = {
//     nome: inputNome.value,
//     email: inputEmail.value,
//     senha: inputSenha.value,
//   }

//   let url = 'http://localhost:3000/usuarios';
//   let method = 'POST';
//   if (id) {
//     url += '/' + id;
//     method = 'PUT';
//   }

//   let resposta = await fetch(url, {
//     method: method,
//     headers: {
//       'Content-type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(payload)
//   });

//   if (resposta.ok) {
//     await alert('Usuário atualizado com sucesso!');
//     window.location.href = 'usuario.html';
//   } else {
//     alert('Ops, algo deu errado!');
//   }
// });
