require("dotenv").config();

//ler a chave liberada

const api_key = process.env.API_KEY_SECRET

function autenticarAPIKey(req, res, next){

    const api_key_front = req.header('minha-chave');

    if(api_key_front === api_key){
        console.log("a chave é valida ", api_key_front, ' ', api_key )
        next()
    }
    else{
        console.log("a chave é invalida", api_key_front, ' ', api_key )
    }
}

module.exports = autenticarAPIKey

