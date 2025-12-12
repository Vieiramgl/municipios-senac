require("dotenv").config();
//ler a chave da api
const API_KEY = process.env.API_KEY_SECRET;
let limitReq = 0;
//função que vai fazer a validação da chave da api que está no arquivo .env
function autenticarApiKey(req, res, next){
    // variavel da api que vem do front-end
    const API_KEY_FRONT= req.header('minha-chave');
    
    if(API_KEY_FRONT === API_KEY && limitReq <=3){
        //se cair dentro desse if a chave do front é valida
        console.log("chave é valida", API_KEY_FRONT, API_KEY);
        //chamar o next quando a chave for valida
        limitReq = limitReq + 1
        if(limitReq > 3){
            return
        }
        console.log(limitReq);
        next();
    }else{
        //se cair no else a chave não é valida
        console.log("chave invalida", API_KEY_FRONT);
        return res.status(500).json({mensagem: "CHAVE INVALIDA DA API"});
    }
}
function limitarRequest(){

    
    
}
limitarRequest()
module.exports = autenticarApiKey;