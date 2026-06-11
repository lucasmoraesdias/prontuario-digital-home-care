function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuariosHomeCare")) || [];
}

function salvarUsuarios(usuarios) {
  localStorage.setItem("usuariosHomeCare", JSON.stringify(usuarios));
}

function usuarioLogado() {
  return JSON.parse(sessionStorage.getItem("usuarioLogadoHomeCare"));
}

function protegerPagina() {
  if (!usuarioLogado()) {
    window.location.href = "index.html";
  }
}

function sair() {
  sessionStorage.removeItem("usuarioLogadoHomeCare");
  window.location.href = "index.html";
}

const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nomeUsuario").value.trim();
    const email = document.getElementById("emailCadastro").value.trim().toLowerCase();
    const senha = document.getElementById("senhaCadastro").value;

    const usuarios = obterUsuarios();
    const existe = usuarios.some(usuario => usuario.email === email);

    if (existe) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    usuarios.push({ nome, email, senha });
    salvarUsuarios(usuarios);

    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
  });
}

const formLogin = document.getElementById("formLogin");
if (formLogin) {
  formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;

    const usuarios = obterUsuarios();
    const usuario = usuarios.find(item => item.email === email && item.senha === senha);

    if (!usuario) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    sessionStorage.setItem("usuarioLogadoHomeCare", JSON.stringify({
      nome: usuario.nome,
      email: usuario.email
    }));

    window.location.href = "app.html";
  });
}
