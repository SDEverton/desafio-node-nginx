const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'dbnode',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)


app.get('/', (req,res) => {
    let names
    connection.query('select * from people', function (error, results, fields) {
      if (error) throw error;
        names = results.map(item => `<li>${item.name}</li>`)
        res.send(`
          <h1>Full Cycle</h1>
          <ul>${names.join(' ')}</ul>
        `)
    });
    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})