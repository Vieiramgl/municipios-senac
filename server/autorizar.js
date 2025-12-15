require("dotenv").config();

//ler a chave liberada

const api_key = process.env.API_KEY_SECRET

let contador = 0

function autenticarAPIKey(req, res, next){

    const api_key_front = req.header('minha-chave');

    if(api_key_front === api_key && contador <= 3){
        console.log("a chave é valida ", api_key_front, ' ', api_key )
        contador = contador + 1
        console.log(contador)
        next()

    }
    
    else{
        console.log("a chave é invalida", api_key_front, ' ', api_key )
        return res.status(500).json({mensagem: "Chave Inválida"})
    }
}

module.exports = autenticarAPIKey
