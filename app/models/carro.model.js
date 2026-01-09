// Importa a ligação/configuração à base de dados
const sql = require("./db.js");

// "Modelo" Carro: representa a estrutura de um registo na tabela "carros"
// Este construtor recebe um objeto "carro" e copia apenas os campos relevantes
const Carro = function(carro) {
    this.modelo = carro.modelo;
    this.ano = carro.ano;
    this.motorizacao = carro.motorizacao;
    this.potencia_cv = carro.potencia_cv;
    this.marca_id = carro.marca_id;
    this.tipo_id = carro.tipo_id;
};

// Cria (INSERT) um novo carro na base de dados
// newCarro: objeto com os dados do carro; 
// result: callback (erro, dados)
Carro.insert = (newCarro, result) => {
  sql.query("INSERT INTO carros SET ?", newCarro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      // Em caso de erro, devolve o erro no callback e termina a função
      result(err, null);
      return;
    }
    // Se correr bem, devolve o id gerado e os dados do carro
    console.log("Carro inserido: ", { id: res.insertId, ...newCarro });
    result(null, { id: res.insertId, ...newCarro });
  });
};

// Procura um carro pelo seu ID (SELECT ... WHERE id = ?)
Carro.findById = (id, result) => {

  const query = `
    SELECT c.*, m.nome_marca, t.nome_tipo 
    FROM carros c
    INNER JOIN marcas m ON c.marca_id = m.id
    INNER JOIN tipos t ON c.tipo_id = t.id
    WHERE c.id = ?`;

  sql.query(query, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // Se o array de resultados tiver pelo menos um registo, significa que encontrou
    if (res.length) {
      console.log("Carro encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Se não encontrou nenhum registo, devolve um objeto a indicar "not_found"
    result({ kind: "not_found" }, null);
  });
};

// Devolve todos os carros, com possibilidade de filtrar pelo modelo
// Se "modelo" vier preenchido, faz um WHERE modelo LIKE "%modelo%"
Carro.selectAll = (modelo, result) => {
  let query = `
    SELECT c.*, m.nome_marca, t.nome_tipo 
    FROM carros c
    INNER JOIN marcas m ON c.marca_id = m.id
    INNER JOIN tipos t ON c.tipo_id = t.id`;
  let queryParams = [];

  // Se o parâmetro modelo existir, adiciona condição à query
  if (modelo) {
    query += " WHERE modelo LIKE ?";
    queryParams.push(`%${modelo}%`);
  }

  sql.query(query, queryParams, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Carros: ", res);
    result(null, res);
  });
};

// Atualiza um carro existente, identificado pelo ID
Carro.updateById = (id, carro, result) => {

  sql.query(
    "UPDATE carros SET modelo = ?, ano = ?, motorizacao = ?, potencia_cv = ?, marca_id = ?, tipo_id = ? WHERE id = ?",
    [carro.modelo, carro.ano, carro.motorizacao, carro.potencia_cv, carro.marca_id, carro.tipo_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      // affectedRows == 0 significa que não encontrou nenhum registo com esse ID
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      // Se atualizou, devolve o carro atualizado (id + dados recebidos)
      console.log("Carro atualizado: ", { id: id, ...carro });
      result(null, { id: id, ...carro });
    }
  );
};

// Elimina um carro específico
Carro.delete = (id, result) => {

  sql.query("DELETE FROM carros WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // Se não houve linhas afetadas, o ID não existe
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Carro eliminado com o id: ", id);
    result(null, res);
  });
};

// Elimina todos os registos da tabela "carros"
Carro.deleteAll = result => {
  sql.query("DELETE FROM carros", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`Eliminado(s) ${res.affectedRows} carro(s)`);
    result(null, res);
  });
};

// --- NOVAS FUNÇÕES PARA OS DROPDOWNS ---
Carro.getAllMarcas = result => {
    sql.query("SELECT * FROM marcas", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Carro.getAllTipos = result => {
    sql.query("SELECT * FROM tipos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Exporta o modelo Carro para ser usado noutros ficheiros (controllers, etc.)
module.exports = Carro;