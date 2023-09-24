## Entendendo sobre Streams

Um dos conceitos que fizeram o node ser o que ele é hoje.

Conseguiu resolver problemas que outras techs na época ou não conseguiam ou faziam de um jeito muito complexo

Streams -> Netflix & Spotify

Quando assistimos um filme ou musica, a gente consegue escutar/assistir desde o início mesmo que o video/musica não esteja carregado 100% por completo, 

Conceito de stream => conseguir ler pequenas partes de alguma coisa e já conseguir trabalhar com aqueles dados mesmo não tendo eles por completo

- Importação de clientes via CSV (Excel)

1Gb - 1.000.000 de linhas por exemplo, se permitimos que isso aconteça 
POST /upload import.csv
Se não utilizamos o conceito de stream, ele vai ler 1gb, depois irá percorrer e fazendo cada uma dos cadastros

A uma taxa de transferência de 10Mb/s

1024 * 8 / 10 - seria 819,2 segundos -> vai pra 13 minutos e 40 mais ou menos.

A cada 10mb/s -> 10.000 linhas
Stream = ler os arquivos aos poucos, enquanto o arquivo está sendo carregado

Readable Streams -> Recebendo informações aos poucos
Writable Streams -> Enviando informações aos poucos

STDIN -> Tudo aquilo que o usuário digita no terminal
```
process.stdin.pipe(process.stdout);
```

Tudo aquilo que eu estou encaminhando (process.stdin) eu estou encaminhando para fora (process.stdout)

### Criação de Streams no Node

```
import { Readable } from 'node:stream'
```

Todo método readable tem um método read obrigatório

```
class OneToHundredStream extends Readable {
    _read(){
        
    }
}
```

this.push(); -> Método utilizado para uma readable strem fornecer informações para quem estiver consumindo ela.

this.push(null); -> quando é enviado null, não temos mais informações para serem enviadas para aquela stream

```
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      this.push(i);
    }
  }
}

new OneToHundredStream().pipe(process.stdout);
```

O método stream não permite que utilizemos variaveis primitivas, como index é um inteiro, o código acima não irá ser executado, pois o stream aceita apenas formatos de Buffer, como no código abaixo, além de que, o buffer não aceita números, logo temos que tranformar o i em string.

```
const buf = Buffer.from(String(i));

this.push(buf);
```

- Criação de stream de escrita

```
import { Writable } from 'node:stream'

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    /**
     * Chunk -> O pedaço que foi lido da stream de leitura, aquilo que é enviado no this.push
     * Encoding -> Como aquela informação está codificada
     * Callback -> Retorno quando tudo está finalizado
     */
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}
```

Em uma stream de escrita não é retornado nada, apenas há o processamento das informações

- Criação de stream de transformação

```
import { Tranform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)))
  }
}
```

E assim ficou nossas 3 streams criadas juntas

A stream de transformação necessiariamente tem que ler dados de um lugar e escrever dados para outro lugar
```
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())
```

### Conceito de Buffer

Representação de um espaço de uma memória do computador, utilizado apenas para transitar dados de uma maneira muito rápida, ou seja, os dados armazenados no Buffer, são armazenados ali para logo serem tratados (ex: enviados para outro lugar) e depois logo removidos

Maneira de ler/escrever um dado da memoria de uma forma mais perfomática

### Middlewares

Middlewares -> Interceptadores (Uma função que irá interceptar a requisição)