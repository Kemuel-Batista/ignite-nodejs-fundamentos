// CommonJS => require
//const http = require('http');
// ESModules => import/export -> por padrão o nodejs não suporta, "type": "module", in package.json
// O prefixo node: na importação de um módulo serve para informar que esse módulo é interno do Node.js
import http from 'node:http';

/**
 *  Criar um usuario (name, email, senha) => request -> BODY, PARAMS, 
 *  Devolver uma resposta -> response
*/

const server = http.createServer((request, response) => {
    return response.end("Hello World!")
})

server.listen(3333);