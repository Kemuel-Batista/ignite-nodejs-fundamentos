## Rotas da Aplicação

Exitem 3 formas de o front-end ou qualquer tipo de serviço que irá consumir a API enviar as informações

1 - Query Parameters
2 - Route Parameters
3 - Request Body

1.1 - Query
  ```
  http://localhost:3333/users?userId=1
  ```
  São parametros normeados, logo userId seria um parâmetro, cada nome passado tem valor e nome
  Para passar mais parâmetros, concatenamos com mais parâmetros
  ```
  http://localhost:3333/users?userId=1&name=Kemuel
  ```
  Motivo de usar um query parameter: quando precisamos que ter uma URL, que ela é Stateful
  URL Stateful => Informações que não são sensíveis, pois naõ ficam armazenadas na URL em si, que elas servem muito mais para modificar a resposta que o back-end irá retornar. Exemplos: Filtros, paginação, não-obrigatórios

2.1 - Route
  ```
  http://localhost:3333/users/1
  ```
  São parâmetros não nomeados, o 1 informado na url acima, é um route parameter, geralmente utilizamos um route parameter para identificação de recurso, se passarmos a rota acima com o parâmetro GET da a entender que estamos buscando o usuário com o id = 1
  ```
  GET http://localhost:3333/users/1
  ```
  Caso chamemos com o método DELETE, dar a entender que queremos deletar o usuário com o id = 1
  ```
  DELETE http://localhost:3333/users/1
  ```
  Combinação de Método(GET, POST, DELETE, PATCH, PUT) + Recurso (users) + Route parameter para entender exatamente o que essa rota está tentando fazer

3.1 - Request Body
  Envio de informações de um formulário (HTTPs)
  ```
  POST http://localhost:3333/users
  ```