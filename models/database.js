const mysql = require('mysql2/promise');

async function conect(){
    try{
        const conn = await mysql.createConnection({
            host: 'sql10.freemysqlhosting.net',
            user: 'sql10645662',
            password: 'KAyUtshIwQ',
            database: 'sql10645662'
        });
        return conn;
    }catch(error){
        console.error('Erro ao conectar', error);
        throw error;
    }
}

async function query(sql){
    const conn = await conect();
    try{
        const [rows] = await conn.execute(sql);
        console.log('Query executada com sucesso');
        console.log(rows)
        return rows;
    }catch(error){
        console.error('Erro ao executar a query:', error);
        throw error;
    }finally{
        if(conn){
            conn.end();
            console.log('Conexão Encerrada');
        }
    }
}
module.exports = { query };
