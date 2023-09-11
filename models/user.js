const { query } = require('./database');

async function inserirUsuario(username, password) {
  try {
    const sql = `INSERT INTO usuario (nome, senha) VALUES ('${username}', '${password}')`;
    const values = [username, password];
    const resp = await query(sql, values);
    
    if (resp.affectedRows > 0) {
      console.log(`User '${username}' registered successfully.`);
    } else {
      console.log('Error while registering user.');
    }
  } catch (error) {
    console.error('Error while inserting user:', error);
    throw error;
  }
}

async function findUser(username) {
  try {
    const sql = `SELECT * FROM usuario WHERE nome = '${username}';`;
    const values = [username];
    const resp = await query(sql, values);

    if (resp.length > 0) {
      console.log('User found');
      return resp[0];
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error while finding user:', error);
    throw error;
  }
}

module.exports = { inserirUsuario, findUser };
