let participantes = [];

const totalObjetos = localStorage.length;

for (i = 0; i < totalObjetos; i++) {
  const chave = localStorage.key(i);
  const objeto = JSON.parse(localStorage.getItem(chave));

  participantes.push(objeto);
}

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn);
  let botaoApagar = ``;

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `;
    botaoApagar = `
      <button 
        style="color: #f56565" 
        id="apagar"
        data-email="${participante.email}"
        onclick="apagarParticipante(event)"
      >
        X
      </button>
    `;
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
    <td>${botaoApagar}</td>
  </tr>
  `;
};

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault();

  const dadosDoFormulario = new FormData(event.target);

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  );

  if (participanteExiste) {
    alert("participante já cadastrado!");
    return;
  }

  participantes = [participante, ...participantes];
  atualizarLista(participantes);
  localStorage.setItem(participante.email, JSON.stringify(participante));

  //limpando formulário
  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Deseja realizar o Check-In?";

  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  //encontrando participantes na lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  //atualizando o checkin
  participante.dataCheckIn = new Date();
  //atualizando no localstorage
  var objetoArmazenado = localStorage.getItem(participante.email);
  var objeto = JSON.parse(objetoArmazenado);
  objeto.dataCheckIn = new Date();
  localStorage.setItem(participante.email, JSON.stringify(objeto));
  //atualizando lista
  atualizarLista(participantes);
};

const apagarParticipante = (event) => {
  const mensagemConfirmacao = "Deseja apagar esse participante?";

  if (confirm(mensagemConfirmacao) == false) {
    return;
  }

  //encontrando participantes na lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email;
  });
  //atualizando o checkin
  let index = participantes.indexOf(participante);
  participantes.splice(index, 1);
  //apagando no localstorage
  localStorage.removeItem(participante.email);
  //atualizando lista
  atualizarLista(participantes);
};
