require("dotenv").config();
const pool = require("./db");

//ler a chave liberada


async function autenticarAPIKey(req, res, next) {

    let api_key_front = req.header('minha-chave');

    let chave = await pool.query("SELECT * FROM api_keys WHERE api_key = $1", [api_key_front])

    const ultimoUso = new Date(chave.rows[0].ultimo_uso)
    const hoje = new Date()

    ultimoUso.setHours(0, 0, 0, 0)
    hoje.setHours(0, 0, 0, 0)

    if (ultimoUso < hoje) {
        consumo = 0
        await pool.query("UPDATE api_keys SET consumo=$1 WHERE api_key=$2 RETURNING *", [consumo, api_key_front]);
    }

    if (chave.rows.length > 0 && chave.rows[0].consumo < chave.rows[0].limite) {
        console.log("a chave é valida ", api_key_front)
        consumo = chave.rows[0].consumo + 1

        let ultimoUso = new Date()

        await pool.query("UPDATE api_keys SET consumo=$1, ultimo_uso=$2 WHERE api_key=$3 RETURNING *", [consumo, ultimoUso, api_key_front]);

        next()
    }

    else {
        console.log("a chave é invalida", api_key_front)
        return res.status(500).json({ mensagem: "Chave Inválida" })
    }
}

module.exports = autenticarAPIKey
