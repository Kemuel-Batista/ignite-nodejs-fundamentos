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

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search){
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        // Object.entries -> { name: "Kemuel", email: "Kemuel" } -> [['name', 'Kemuel'], ['email', 'Kemuel']]
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}