require("dotenv").config();
const pool = require("./db");

async function autenticarAPIKey(req, res, next) {
    const api_key_front = req.header("minha-chave");

    if (!api_key_front) {
        return res.status(401).json({ mensagem: "Chave não informada" });
    }

    const chave = await pool.query(
        "SELECT * FROM api_keys WHERE api_key = $1",
        [api_key_front]
    );

    // 🔒 valida existência
    if (chave.rows.length === 0) {
        return res.status(401).json({ mensagem: "Chave inválida" });
    }

    const dados = chave.rows[0];

    let consumo = dados.consumo;
    const limite = dados.limite;
    const ultimoUsoBanco = dados.ultimo_uso;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // 🔄 reset diário
    if (!ultimoUsoBanco) {
        consumo = 0;
    } else {
        const ultimoUso = new Date(ultimoUsoBanco);
        ultimoUso.setHours(0, 0, 0, 0);

        if (ultimoUso < hoje) {
            consumo = 0;
        }
    }

    // 🚫 limite atingido
    if (consumo >= limite) {
        return res.status(403).json({ mensagem: "Limite diário atingido" });
    }

    // ✅ incrementa consumo
    consumo++;

    await pool.query(
        "UPDATE api_keys SET consumo = $1, ultimo_uso = $2 WHERE api_key = $3",
        [consumo, new Date(), api_key_front]
    );

    console.log("Chave válida:", api_key_front);

    next();
}

module.exports = autenticarAPIKey;
