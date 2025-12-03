const API = "http://127.0.0.1:3000/municipios";

const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");

// Eventos
btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirOuEditar);

//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------
async function carregarMunicipios() {
    try {
        const resposta = await fetch(API);
        const dados = await resposta.json();

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m));

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
        <h3>${m.nome} (${m.estado})</h3>
        <p>${m.caracteristica}</p>
        <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
         <button class="btn-alterar" onclick="selecionar(${m.id})">Alterar</button>
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

    }

    catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function deletar() {
    alert("vou deletar");
}

async function deletar(id) {
    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });
        if (!resposta.ok) {
            throw new Error("Erro ao deletar!");
        }
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao deletar:", erro.message);
    }
}


async function alterar() {

    const nome = document.getElementById("campoMunicipio").value
    const estado = document.getElementById("campoUF").value
    const caracteristica = document.getElementById("campoCaracteristica").value

    const municipio = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(`http://127.0.0.1:3000/municipios/${window.idEditando}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(municipio)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao inserir!");
        }

        carregarMunicipios();

    }

    catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function selecionar(id) {

    const resposta = await fetch(`${API}/${id}`)
    const municipio = await resposta.json();

    document.getElementById("campoMunicipio").value = municipio.nome
    document.getElementById("campoUF").value = municipio.estado
    document.getElementById("campoCaracteristica").value = municipio.caracteristica

    window.idEditando = id;
}

async function inserirOuEditar() {

    try {

        if (window.idEditando) {
            alterar()
            limpar()
        }

        else {
            inserirMunicipio()
            limpar()
        }

        carregarMunicipios()
    }

    catch (erro) {
        console.log("Erro ao salvar:", erro.message)
    }
}

function limpar(){
    document.getElementById("campoMunicipio").value = ""
    document.getElementById("campoUF").value = ""
    document.getElementById("campoCaracteristica").value = ""
    window.idEditando = ""
}