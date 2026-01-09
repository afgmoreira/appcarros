// Controller de Carros
// Aqui define-se as funções que tratam os pedidos HTTP (req/res)
// e chama-se os métodos do modelo Carro para aceder à base de dados.

const Carro = require("../models/carro.model.js");

// Inserir um novo carro (CREATE)
// Espera receber os dados do carro no corpo do pedido (req.body)
exports.insert = (req, res) => {
  // Validação simples: verifica se o corpo do pedido está vazio
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "O conteúdo do carro deve estar definido." });
  } else {
    // Cria uma instância do modelo Carro com os dados recebidos
    const carro = new Carro({
      modelo: req.body.modelo,
      ano: req.body.ano,
      motorizacao: req.body.motorizacao,
      potencia_cv: req.body.potencia_cv,
      marca_id: req.body.marca_id,
      tipo_id: req.body.tipo_id
    });

    // Chama o método insert do modelo para gravar na base de dados
    Carro.insert(carro, (err, data) => {
      if (err)
        // Em caso de erro de servidor, devolve código 500
        res.status(500).send({ message: err.message || "Ocorreu um erro ao inserir o carro." });
      else
        // Se executar bem, devolve o objeto do carro inserido (com id)
        res.send(data);
    });
  }
};

// Obter todos os carros (READ ALL)
exports.selectAll = (req, res) => {
  const modelo = req.query.modelo;
  Carro.selectAll(modelo, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Ocorreu um erro na obtenção dos carros." });
    else res.send(data);
  });
};

// Obter um carro específico pelo ID (READ ONE)
exports.findById = (req, res) => {
  Carro.findById(req.params.id, (err, data) => {
    if (err) {
      // Se não existir nenhum carro com esse ID,o modelo devolve kind: "not_found" 
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Não foi encontrado o carro com id = ${req.params.id}.` });
      } else {
        // Qualquer outro erro é tratado como erro de servidor
        res.status(500).send({ message: "Erro ao procurar carro com id = " + req.params.id });
      }
    } else res.send(data);
  });
};

// Atualizar um carro existente (UPDATE)
exports.update = (req, res) => {
  // Tal como no insert, valida se o corpo do pedido tem conteúdo
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "O conteúdo do carro deve estar definido." });
  } else {
    Carro.updateById(
      req.params.id,            // ID do carro a atualizar
      new Carro(req.body),      // Dados novos do carro
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            // Se não existir carro com este ID
            res.status(404).send({ message: `Não foi encontrado o carro com id = ${req.params.id}.` });
          } else {
            res.status(500).send({ message: `Erro ao atualizar o carro com id = ${req.params.id}.` });
          }
        } else res.send(data);
      }
    );
  }
};

// Eliminar um carro específico (DELETE ONE)
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

// Eliminar todos os carros (DELETE ALL)
exports.deleteAll = (req, res) => {
  Carro.deleteAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Foi gerado um erro a apagar a totalidade dos carros." });
    else res.send({ message: "Todos os carros foram eliminados..." });
  });
};

// --- NOVOS CONTROLLERS AUXILIARES ---

exports.findAllMarcas = (req, res) => {
    Carro.getAllMarcas((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Erro ao procurar marcas." });
        else res.send(data);
    });
};

exports.findAllTipos = (req, res) => {
    Carro.getAllTipos((err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Erro ao procurar tipos." });
        else res.send(data);
    });
};