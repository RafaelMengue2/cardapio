const { query } = require('./database');

async function addItem(nome, descricao, preco, tempo, categoria, imagem) {
  const sql = `INSERT INTO cardapio (nome, descricao, preco, tempo, categoria, imagem) VALUES ('${nome}', '${descricao}', '${preco}', '${tempo}', '${categoria}', '${imagem}')`;
  const values = [nome, descricao, preco, tempo, categoria, imagem];

  try {
    return await query(sql, values);
  } catch (error) {
    throw new Error('Erro ao adicionar o item ao banco de dados.');
  }
}

async function getMenu() {
  const sql = 'SELECT * FROM cardapio';

  try {
    const rows = await query(sql);
    return rows;
  } catch (error) {
    throw new Error('Erro ao obter o menu do banco de dados.');
  }
}

module.exports = { addItem, getMenu };