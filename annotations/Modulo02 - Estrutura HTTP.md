/**
 * Módulo 02 
 * HTTP -> POST, PUT, GET, PATCH, DELETE
 * URL
*/

- Criar usuários
- Listagem de usuários
- Edição de usuários
- Remoção de usuários

-- GET, POST, PUT, PATCH, DELETE

GET => Buscar um recurso no back-end
POST => Criar um recurso no back-end
PUT => Atualizar um recurso no back-end
PATCH => Atualizar uma informação específica de um recurso no back-end
DELETE => Delete um recurso no back-end

GET /users => Buscando usuarios no back-end
POST /users => Criar um usuário no back-end

- Salvando usuários na memoria da aplicação (Statefull)

- Statefull -> Informações guardadas em memória, se a aplicação for derrubada, pode perder essas informações ou funcionar de maneira diferente

Node JS não permite que você retorne diretamente um array, pois apenas aceita string, buffer ou Int8Array

Para isso utilizamos o JSON

JSON -> Javascript Object Notation

Mas como o front-end vai saber que o back-end mandou um JSON como resposta?

Pelos cabeçalhos (requisição/resposta) => Metadados (São quase informações para que tanto o back-end quanto o front-end saiba lidar com aquela requisição da melhor forma)

Cabeçalhos são informações adicionais que não tem a ver com o dado retornado do back-end para o front-end mas sim como aquele dado pode ser interprado pelo front-end

```
return response.setHeader('Content-Type', 'application/json').end(JSON.stringify(users));
```

HTTP Status Code 

Informational responses (100 – 199)
Successful responses (200 – 299)
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599)