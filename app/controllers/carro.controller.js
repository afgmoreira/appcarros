const Carro = require("../models/carro.model.js");

// Inserir um novo carro
exports.insert = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "O conteúdo do carro deve estar definido." });
  } else {
    const carro = new Carro({
      modelo: req.body.modelo,
      ano: req.body.ano,
      motorizacao: req.body.motorizacao,
      potencia_cv: req.body.potencia_cv,
      marca_id: req.body.marca_id,
      tipo_id: req.body.tipo_id
    });

    Carro.insert(carro, (err, data) => {
      if (err)
        res.status(500).send({ message: err.message || "Ocorreu um erro ao inserir o carro." });
      else res.send(data);
    });
  }
};

exports.selectAll = (req, res) => {
  const modelo = req.query.modelo;
  Carro.selectAll(modelo, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Ocorreu um erro na obtenção dos carros." });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  Carro.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Não foi encontrado o carro com id = ${req.params.id}.` });
      } else {
        res.status(500).send({ message: "Erro ao procurar carro com id = " + req.params.id });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "O conteúdo do carro deve estar definido." });
  } else {
    Carro.updateById(
      req.params.id,
      new Carro(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({ message: `Não foi encontrado o carro com id = ${req.params.id}.` });
          } else {
            res.status(500).send({ message: `Erro ao atualizar o carro com id = ${req.params.id}.` });
          }
        } else res.send(data);
      }
    );
  }
};

exports.delete = (req, res) => {
  Carro.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Não foi encontrado o carro com id = ${req.params.id}.` });
      } else {
        res.status(500).send({ message: `Erro ao apagar o carro com id = ${req.params.id}.` });
      }
    } else res.send({ message: "O carro foi eliminado com sucesso." });
  });
};

exports.deleteAll = (req, res) => {
  Carro.deleteAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Foi gerado um erro a apagar a totalidade dos carros." });
    else res.send({ message: "Todos os carros foram eliminados..." });
  });
};