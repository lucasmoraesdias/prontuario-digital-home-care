function chaveRegistros() {
  const usuario = usuarioLogado();
  return "prontuariosHomeCare_" + usuario.email;
}

function iniciarSistema() {
  protegerPagina();

  const usuario = usuarioLogado();
  document.getElementById("nomeLogado").textContent = "Usuário: " + usuario.nome;

  carregarRegistros();

  const form = document.getElementById("formProntuario");
  form.addEventListener("submit", salvarRegistro);
}

function obterRegistros() {
  return JSON.parse(localStorage.getItem(chaveRegistros())) || [];
}

function salvarRegistros(registros) {
  localStorage.setItem(chaveRegistros(), JSON.stringify(registros));
}

function salvarRegistro(event) {
  event.preventDefault();

  const registro = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    telefone: document.getElementById("telefone").value,
    data: document.getElementById("data").value,
    endereco: document.getElementById("endereco").value,
    pressao: document.getElementById("pressao").value,
    glicemia: document.getElementById("glicemia").value,
    temperatura: document.getElementById("temperatura").value,
    saturacao: document.getElementById("saturacao").value,
    medicacoes: document.getElementById("medicacoes").value,
    evolucao: document.getElementById("evolucao").value,
    observacoes: document.getElementById("observacoes").value
  };

  const registros = obterRegistros();
  const indiceEdicao = document.getElementById("indiceEdicao").value;

  if (indiceEdicao === "") {
    registros.push(registro);
  } else {
    registros[indiceEdicao] = registro;
  }

  salvarRegistros(registros);
  novoRegistro();
  carregarRegistros();

  alert("Registro salvo com sucesso!");
}

function carregarRegistros() {
  const lista = document.getElementById("listaRegistros");
  const registros = obterRegistros();

  lista.innerHTML = "";

  if (registros.length === 0) {
    lista.innerHTML = "<tr><td colspan='5'>Nenhum registro salvo.</td></tr>";
    return;
  }

  registros.forEach((registro, index) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        <strong>${registro.nome}</strong><br>
        Idade: ${registro.idade}<br>
        Contato: ${registro.telefone || "Não informado"}
      </td>
      <td>${registro.data}</td>
      <td>
        PA: ${registro.pressao || "-"}<br>
        Glicemia: ${registro.glicemia || "-"}<br>
        Temp.: ${registro.temperatura || "-"}<br>
        Sat.: ${registro.saturacao || "-"}
      </td>
      <td>${registro.evolucao || "-"}</td>
      <td class="acoes-tabela">
        <button class="btn-neutro" onclick="editarRegistro(${index})">Editar</button>
        <button class="btn-alerta" onclick="excluirRegistro(${index})">Excluir</button>
      </td>
    `;

    lista.appendChild(linha);
  });
}

function editarRegistro(index) {
  const registros = obterRegistros();
  const registro = registros[index];

  document.getElementById("indiceEdicao").value = index;
  document.getElementById("nome").value = registro.nome;
  document.getElementById("idade").value = registro.idade;
  document.getElementById("telefone").value = registro.telefone;
  document.getElementById("data").value = registro.data;
  document.getElementById("endereco").value = registro.endereco;
  document.getElementById("pressao").value = registro.pressao;
  document.getElementById("glicemia").value = registro.glicemia;
  document.getElementById("temperatura").value = registro.temperatura;
  document.getElementById("saturacao").value = registro.saturacao;
  document.getElementById("medicacoes").value = registro.medicacoes;
  document.getElementById("evolucao").value = registro.evolucao;
  document.getElementById("observacoes").value = registro.observacoes;

  window.scrollTo(0, 0);
}

function excluirRegistro(index) {
  if (confirm("Deseja excluir este registro?")) {
    const registros = obterRegistros();
    registros.splice(index, 1);
    salvarRegistros(registros);
    carregarRegistros();
  }
}

function novoRegistro() {
  document.getElementById("formProntuario").reset();
  document.getElementById("indiceEdicao").value = "";
}

function limparTudo() {
  if (confirm("Deseja apagar todos os registros deste usuário neste navegador?")) {
    localStorage.removeItem(chaveRegistros());
    carregarRegistros();
  }
}

function exportarDados() {
  const registros = obterRegistros();
  const conteudo = JSON.stringify(registros, null, 2);
  const blob = new Blob([conteudo], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "prontuarios_homecare.json";
  link.click();

  URL.revokeObjectURL(url);
}
