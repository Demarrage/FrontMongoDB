//  criação de variaveis para representar os campos do formulario
var nome = document.getElementById("txtnome");
var email = document.getElementById("txtemail");
var telefone = document.getElementById("txttelefone");
var cpf = document.getElementById("txtcpf");
var idade = document.getElementById("txtidade");
var btn = Document.getElementById("btnCadastrar");

btn.onclick = function () {
  fetch("http://localhost:4505/cadastro", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome.value,
      email: email.value,
      telefone: telefone.value,
      cpf: cpf.value,
      idede: idade.value,
    })
      .then((response) => response.json())
      .then((rs) => {
        alert("Cadastro realizado");
        // vamos att a pag e limpar os dados
        window.location.reaload();
      })
      .catch((erro) => console.erro(`Erro ao tentar cadastrar ${erro}`)),
  });
};
