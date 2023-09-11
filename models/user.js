const { query } = require("./database");

async function inserirUsuario(username, password) {
  //const sql = `INSERT INTO usuario (nome, senha) VALUES (${username}, ${password})`;
  const resp = await query(`INSERT INTO usuario (nome, senha) VALUES ('${username}', '${password}')`);
  if(resp.insertedRows > 0){
    console.log("foi inserido");
  }else{
    console.log("erro ao cadastrar");
  }
}

async function findUser(username) {

  const resp = await query(`SELECT * FROM usuario WHERE nome = '${username}'`);
console.log("esta aqui")
  console.log(resp[0])
  if (resp.length > 0){
    console.log("Usuario foi encontrado");
    return false;
  }else{
    console.log("Usuario nao encontrado")
    return true;
  }
  
}

module.exports = { inserirUsuario, findUser };