// IMPORTANTE:
// Entre no site https://crudcrud.com/
// Copie sua URL única e substitua o texto abaixo.
// Exemplo:
// const API_URL = "https://crudcrud.com/api/SEU_CODIGO/clientes";

const API_URL = "https://crudcrud.com/api/c1d6fc6382a0495393e8e99ddb7f2fb1/clientes";

const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");

formCliente.addEventListener("submit", function(evento) {
  evento.preventDefault();
  cadastrarCliente();
});

window.addEventListener("load", listarClientes);

function cadastrarCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const cliente = {
    nome: nome,
    email: email
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  })
    .then(function(resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao cadastrar cliente.");
      }

      return resposta.json();
    })
    .then(function() {
      mensagem.textContent = "Cliente cadastrado com sucesso!";
      formCliente.reset();
      listarClientes();
    })
    .catch(function(erro) {
      mensagem.textContent = "Erro: verifique se a URL do CrudCrud foi configurada corretamente.";
      console.log(erro);
    });
}

function listarClientes() {
  fetch(API_URL)
    .then(function(resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao listar clientes.");
      }

      return resposta.json();
    })
    .then(function(clientes) {
      listaClientes.innerHTML = "";

      clientes.forEach(function(cliente) {
        const item = document.createElement("li");

        item.innerHTML = `
          <span>
            <strong>${cliente.nome}</strong><br>
            ${cliente.email}
          </span>
          <button class="btn-excluir" onclick="excluirCliente('${cliente._id}')">Excluir</button>
        `;

        listaClientes.appendChild(item);
      });
    })
    .catch(function(erro) {
      mensagem.textContent = "Erro ao carregar clientes. Verifique a URL do CrudCrud.";
      console.log(erro);
    });
}

function excluirCliente(id) {
  fetch(API_URL + "/" + id, {
    method: "DELETE"
  })
    .then(function(resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao excluir cliente.");
      }

      mensagem.textContent = "Cliente excluído com sucesso!";
      listarClientes();
    })
    .catch(function(erro) {
      mensagem.textContent = "Erro ao excluir cliente.";
      console.log(erro);
    });
}
