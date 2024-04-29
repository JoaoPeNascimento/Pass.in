let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null,
    botaoApagar: null,
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: null,
    botaoApagar: null,
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20),
    botaoApagar: null,
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: null,
    botaoApagar: null,
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null,
    botaoApagar: null,
  },
];

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
  //atualizando lista
  atualizarLista(participantes);
};
