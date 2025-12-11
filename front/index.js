const API = "http://127.0.0.1:3000/municipios";
let limit = 3;
let offset = 0;
let lastScrollTop = 0;

const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");
const btnAlterar = document.getElementById("btn-alterar");
const alterar = document.getElementById("lista-alterar");
const fechar = document.getElementById("fechar-janela");
const btnMaisMunicipios = document.getElementById("maisMunicipios");
const btnMenosMunicipios = document.getElementById("menosMunicipios");
alterar.style.display = "none";
// Eventos
btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);

//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------
async function carregarMunicipios() {
  try {
    const resposta = await fetch(`${API}/?limit=${limit}`);
    const dados = await resposta.json();

    listagem.innerHTML = ""; // limpa

    dados.forEach((m) => criarCard(m));
  } catch (erro) {
    console.error("Erro ao carregar:", erro.message);
  }
}

// CRIAR CARD NO FRONT
//--------------------------------------------------
function criarCard(m) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <h3>${m.nome} (${m.estado}), ${m.id}</h3>
        <p>${m.caracteristica}</p>
        <button class="btn-delete" onclick="deletar()">Deletar</button>
    `;

  listagem.appendChild(card);
}



//--------------------------------------------------
// INSERIR MUNICÍPIO (POST)
//--------------------------------------------------
async function inserirMunicipio() {
  const nome = document.getElementById("campoMunicipio").value;
  const estado = document.getElementById("campoUF").value;
  const caracteristica = document.getElementById("campoCaracteristica").value;

  const novoMunicipio = { nome, estado, caracteristica };

  try {
    const resposta = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoMunicipio),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao inserir!");
    }

        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function deletar(){
    alert("vou deletar");
}