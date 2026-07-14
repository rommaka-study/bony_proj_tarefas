const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

const tarefas = []; //todas as tarefas serão salvas nesse array, que começa sempre vazio
/*
  TODA FUNÇÃO TEM SÓ UM RETORNO
  QUANDO NÃO TEM O RETORNO É INDEFINIDO
  UMA FUNÇÃO NÃO PODE RETORNAR MAIS DE UMA VEZ
  E NÃO EXECUTA MAIS NADA DEPOIS DESSE RETORNO
  */
 
function renderizarLista() {//esta função pega a lista e mostra na tela
  listaTarefas.innerHTML = '';//limpa a lista
 /*
  DURANTE A VERIFICAÇÃO HÁ UMA TÉCNICA
  PRIMEIRO LIDA COM AS ALTERNATIVAS NEGATIVAS
  E DEPOIS COM OS POSITIVOS
  */
  if (tarefas.length === 0) {//verificação se não tiver tarefa
    const mensagem = document.createElement('p');//cria a mensagem
    mensagem.className = 'lista-vazia';//classe da mensagem acima
    mensagem.textContent = 'Nenhuma tarefa adicionada.';//criou um texto
    listaTarefas.appendChild(mensagem);//appendChild faz o link do novo elemente a um que já existe na pagina, adicionou o novo elemento na lista de mensagens
    return;//retorno sem nada
  }

  
  tarefas.forEach(function (tarefa, indice) {
    const item = document.createElement('li');//cria um li
    item.className = 'item-tarefa';//adiciona uma classe no li

    const texto = document.createElement('span');//cria um span
    texto.className = 'texto-tarefa';//adiciona class no span
    texto.textContent = tarefa.texto;//adiciona o texto do span na tarefa

    if (tarefa.concluida) {//se a tarefa for concluida
      texto.classList.add('concluida');//adiciona uma class que está no css

    const btnConcluir = document.createElement('button');//botão de concluir e funções
    btnConcluir.className = 'btn btn-concluir';//adiciona class
    btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';//explicação abaixo
    btnConcluir.addEventListener('click', function () {//evento de click
      alternarConclusao(indice);//altera a conclusão e envia o indice para o array
    });
    /*
      ESSA ESTRUTURA CHAMA IF TERNARIO
      condicional feita em uma só linha

      VARIAVEL = PROPOSITO ?(SE) CONDIÇÃO 1 (caso positivo)  :(CASO CONTRARIO) CONDIÇÃO 2 (caso negativo)

        btnConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';//explicação abaixo
      btnConcluir.textContent = tarefa.concluida - se a tarefa foi concluida
      ? 'Desfazer' - o texto fica desfazer
      : 'Concluir'; caso contrario o texto é concluir

    */
    const btnDeletar = document.createElement('button');//botão de deletar e funções
    btnDeletar.className = 'btn btn-deletar';//adiciona class
    btnDeletar.textContent = 'Deletar';//deleta texto
    btnDeletar.addEventListener('click', function () {//evento de click
      deletarTarefa(indice);//envia o indice para deletar a tarefa do array
    });

    item.appendChild(texto);//adiciona o texto
    item.appendChild(btnConcluir);//adiciona o botão de concluir
    item.appendChild(btnDeletar);//adicona o botão de deletar
    listaTarefas.appendChild(item);//pega o item e adiciona na lista de tarefa
  });
}

function adicionarTarefa(texto) {
  const textoLimpo = texto.trim();//limpa o texto

  if (textoLimpo === '') {//verifica se tem algo digitado
    return;//se não tiver para aqui a funçao
  }
//push com um objeto
  tarefas.push({
    texto: textoLimpo,
    concluida: false
  });

  renderizarLista();//atualiza a lista na exibição
}
/*
a ! exclamação inverte a informação = QUANDO BOOLEAN
então a tarefe concluida com false vira true, E O INVERSO
ASSIM ALTERNA ENTRE TRUE E FALSE
*/
function alternarConclusao(indice) {
  tarefas[indice].concluida = !tarefas[indice].concluida;//pega a tarefa pelo indice
  renderizarLista();//renderiza a atualização
}
/*
SPLICE
comando que corta o ou os elementos definidos pelos parametros
-tem dois parametros
1. o inicio do corte, posiciona o cursor
2. quantos itens vai remover

este comando splice altera o array
*/
function deletarTarefa(indice) {
  tarefas.splice(indice, 1);//posiciona antes do indice e remove um item
  renderizarLista();//atualiza a renderização
}

formTarefa.addEventListener('submit', function (evento) {//quando o form é enviado
  evento.preventDefault();//pára o evento principal
  adicionarTarefa(inputTarefa.value);//executa a função adicionar tarefa
  inputTarefa.value = '';//limpa o campo
  inputTarefa.focus();//foca para uma nova informação
});

renderizarLista();
