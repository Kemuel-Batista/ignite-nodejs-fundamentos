import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
  
        this.push(buf);
      }
    }, 1000)
  }
}

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

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)))
  }
}

new OneToHundredStream().pipe(process.stdout);
new OneToHundredStream().pipe(new MultiplyByTenStream());
new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())