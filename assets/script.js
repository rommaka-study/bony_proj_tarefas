const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

const tarefas = [];

function renderizarLista() {
  listaTarefas.innerHTML = '';

  if (tarefas.length === 0) {
    const mensagem = document.createElement('p');
    mensagem.className = 'lista-vazia';
    mensagem.textContent = 'Nenhuma tarefa adicionada.';
    listaTarefas.appendChild(mensagem);
    return;
  }

  tarefas.forEach(function (tarefa, indice) {
    const item = document.createElement('li');
    item.className = 'item-tarefa';

    const texto = document.createElement('span');
    texto.className = 'texto-tarefa';
    texto.textContent = tarefa.texto;

    if (tarefa.concluida) {
      texto.classList.add('concluida');
    }

    const btnConcluir = document.createElement('button');
    btnConcluir.className = 'btn btn-concluir';
    btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
    btnConcluir.addEventListener('click', function () {
      alternarConclusao(indice);
    });

    const btnDeletar = document.createElement('button');
    btnDeletar.className = 'btn btn-deletar';
    btnDeletar.textContent = 'Deletar';
    btnDeletar.addEventListener('click', function () {
      deletarTarefa(indice);
    });

    item.appendChild(texto);
    item.appendChild(btnConcluir);
    item.appendChild(btnDeletar);
    listaTarefas.appendChild(item);
  });
}

function adicionarTarefa(texto) {
  const textoLimpo = texto.trim();

  if (textoLimpo === '') {
    return;
  }

  tarefas.push({
    texto: textoLimpo,
    concluida: false
  });

  renderizarLista();
}

function alternarConclusao(indice) {
  tarefas[indice].concluida = !tarefas[indice].concluida;
  renderizarLista();
}

function deletarTarefa(indice) {
  tarefas.splice(indice, 1);
  renderizarLista();
}

formTarefa.addEventListener('submit', function (evento) {
  evento.preventDefault();
  adicionarTarefa(inputTarefa.value);
  inputTarefa.value = '';
  inputTarefa.focus();
});

renderizarLista();
