const sql = require("./db.js");

// Construtor
const Carro = function(carro) {
    this.modelo = carro.modelo;
    this.ano = carro.ano;
    this.motorizacao = carro.motorizacao;
    this.potencia_cv = carro.potencia_cv;
    this.marca_id = carro.marca_id;
    this.tipo_id = carro.tipo_id;
};

Carro.insert = (newCarro, result) => {
  sql.query("INSERT INTO carros SET ?", newCarro, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Carro inserido: ", { id: res.insertId, ...newCarro });
    result(null, { id: res.insertId, ...newCarro });
  });
};

Carro.findById = (id, result) => {
  sql.query(`SELECT * FROM carros WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Carro encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Carro.selectAll = (modelo, result) => {
  let query = "SELECT * FROM carros";
  if (modelo) {
    query += ` WHERE modelo LIKE '%${modelo}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Carros: ", res);
    result(null, res);
  });
};

Carro.updateById = (id, carro, result) => {
  // Removido imagem_url da query UPDATE
  sql.query(
    "UPDATE carros SET modelo = ?, ano = ?, motorizacao = ?, potencia_cv = ?, marca_id = ?, tipo_id = ? WHERE id = ?",
    [carro.modelo, carro.ano, carro.motorizacao, carro.potencia_cv, carro.marca_id, carro.tipo_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Carro atualizado: ", { id: id, ...carro });
      result(null, { id: id, ...carro });
    }
  );
};

Carro.delete = (id, result) => {
  sql.query("DELETE FROM carros WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Carro eliminado com o id: ", id);
    result(null, res);
  });
};

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

module.exports = Carro;