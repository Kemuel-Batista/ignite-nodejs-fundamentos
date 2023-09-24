const buf = Buffer.from("ok")

// console.log(buf) // returns <Buffer 6f 6b>
console.log(buf.toJSON()) // { type: 'Buffer', data: [ 111, 107 ] }