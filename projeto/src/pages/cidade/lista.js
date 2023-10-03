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
    tdAcoes.innerHTML = `<a href="./cidade/cidade.html?id=${cidade.id}" class="btn btn-outline-primary">Listar</a>
    <a href="./formulario/formulario.html?id=${cidade.id}" class="btn btn-outline-warning">Editar</a>
    <button type="button" class="btn btn-outline-danger btn-excluir">Excluir</button>`;


    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

let botoesExcluir = document.getElementsByClassName('btn-excluir');

buscarCidades();

document.addEventListener('click', async function (event) {
  console.log('teste');
  if (event.target.classList.contains('btn-excluir')) {

    let idCidade = event.target.closest('tr').querySelector('.idCidade').innerText;

    if (confirm('Tem certeza de que deseja excluir esta cidade?')) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${idCidade}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Cidade excluído com sucesso!');
          event.target.closest('tr').remove();
        } else {
          alert('Erro ao excluir cidade.');
        }
      } catch (error) {
        console.error('Erro ao excluir cidade:', error);
      }
    }
  }
});





