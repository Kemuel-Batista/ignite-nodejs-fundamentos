import fs from 'node:fs/promises'

/**
 * Quando utilizamos o type module, o famoso __dirname, __filename, elas não existem mais
 * para isso utilizamos o import.meta.url que é a forma que utilizamos que é a nova forma global do ES Modules
*/

const databasePath = new URL('../db.json', import.meta.url)

// database = { "users": [...] }
export class Database {
  // # -> Propriedade privada no javascript para que o atributo não seja capaz de acessar externamente
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        // Caso o arquivo não exista, chamamos o método persite para criar o banco mesmo que vazio
        this.#persist()
      })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table){
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data);
    } else {
      this.#database[table] = data
    }

    this.#persist()

    return data
  }
}