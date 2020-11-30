//  criação de variaveis para representar os campos do formulario
var nome = document.getElementById("txtnome");
var email = document.getElementById("txtemail");
var telefone = document.getElementById("txttelefone");
var cpf = document.getElementById("txtcpf");
var idade = document.getElementById("txtidade");
var btn = document.getElementById("btnCadastrar");
var bta = document.getElementById("btnAtualizar");

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
      idade: idade.value,
    }),
  })
    .then((response) => response.json())
    .then((rs) => {
      alert("Cadastro realizado");
      // vamos att a pag e limpar os dados
      window.location.reload();
    })
    .catch((erro) => console.erro(`Erro ao tentar cadastrar ${erro}`));
};
function listarClientes() {
  var tabela = document.getElementById("tabela");
  fetch("http://localhost:4505")
    .then((response) => response.json())
    .then((rs) => {
      for (var i = 0; i < rs.saida.length; i++) {
        tabela.innerHTML +=
          "<tr>" +
          "<td>" +
          rs.saida[i]._id +
          "</td>" +
          "<td>" +
          rs.saida[i].nomecliente +
          "</td>" +
          "<td>" +
          rs.saida[i].email +
          "</td>" +
          "<td>" +
          rs.saida[i].telefone +
          "</td>" +
          "<td>" +
          rs.saida[i].cpf +
          "</td>" +
          "<td>" +
          rs.saida[i].idade +
          "</td>" +
          "<td>" +
          rs.saida[i].datacadastro +
          "</td>" +
          '<td><a href="atualizar.html?id=' +
          rs.saida[i]._id +
          '"><i class="material-icons" style="cursor:pointer"> refresh </i> </a> </td>' +
          '<td> <i class="material-icons" style="cursor:pointer" onclick="apagar(\'' +
          rs.saida[i]._id +
          "')\"> delete</i></td>" +
          "</tr>";
      }
    });
}
function apagar(id) {
  if (confirm("voce tem certeza de que deseja apagar esse cliente?") == 1) {
    fetch("http://localhost:4505/apagar/" + id, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((rs) => {
        alert(rs.resultado);
        window.location.reload();
      })
      .catch((erro) => console.error(`Erro ao tentar a pagar ${erro}`));
  }
}
function atualizar() {
  var ds = window.location.search;
  var qtd = window.location.search.length;
  var rs = window.location.search.substring(4, qtd);
  fetch("http://localhost:4505/atualizar/" + rs, {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nomecliente: nome.value,
      email: email.value,
      telefone: telefone.value,
      cpf: cpf.value,
      idade: idade.value,
    }),
  })
    .then((response) => response.json())
    .then((rs) => {
      alert("dados atualizados com sucesso!");
      window.location.reload();
    })
    .catch((erro) => console.error(`erro ao tentar atualizar ${erro}`));
}
function carregar() {
  var qtd = window.location.search.length; //quantidade de caracter
  var rs = window.location.search.substring(4, qtd);
  fetch("http://localhost:4505/" + rs)
    .then((response) => response.json())
    .then((resultado) => {
      nome.value = resultado.re.nomecliente;
      nome.focus();
      email.value = resultado.re.email;
      email.focus();
      telefone.value = resultado.re.telefone;
      telefone.focus();
      cpf.value = resultado.re.cpf;
      cpf.focus();
      idade.value = resultado.re.idade;
      idade.focus();
    })
    .catch((erro) => console.error(`Erro ao tentar carregar os dados ${erro}`));
}
