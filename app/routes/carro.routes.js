
module.exports = app => {
    // Importa o controller que contém a lógica de cada operação
    const carros = require("../controllers/carro.controller.js");
    // Cria um router Express para agrupar as rotas relacionadas com carros
    const router = require("express").Router();

    /**
     * @swagger
     * /api/carros:
     *   get:
     *     summary: Retorna todos os carros
     *     tags: [Carros]
     *     responses:
     *       200:
     *         description: Lista de carros
     */
    // GET /api/carros -> devolve todos os carros 
    router.get("/", carros.selectAll);

    /**
     * @swagger
     * /api/carros/{id}:
     *   get:
     *     summary: Retorna um carro pelo ID
     *     tags: [Carros]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do carro a ser consultado
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Detalhes do carro
     *       404:
     *         description: Carro não encontrado
     */
    // GET /api/carros/:id -> devolve um carro específico pelo seu ID
    router.get("/:id", carros.findById);

    /**
     * @swagger
     * /api/carros:
     *   post:
     *     summary: Insere um novo carro
     *     tags: [Carros]
     *     requestBody:
     *       required: true
     *       description: Dados do carro a adicionar
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               modelo:
     *                 type: string
     *                 example: Mustang GT
     *               ano:
     *                 type: integer
     *                 example: 2024
     *               motorizacao:
     *                 type: string
     *                 example: 5.0L V8
     *               potencia_cv:
     *                 type: integer
     *                 example: 450
     *               marca_id:
     *                 type: integer
     *                 example: 1
     *               tipo_id:
     *                 type: integer
     *                 example: 1
     *     responses:
     *       200:
     *         description: Carro criado com sucesso
     */
    // POST /api/carros -> cria um novo carro com os dados enviados no corpo do pedido
    router.post("/", carros.insert);

    /**
     * @swagger
     * /api/carros/{id}:
     *   put:
     *     summary: Atualiza um carro pelo ID
     *     tags: [Carros]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do carro a atualizar
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               modelo:
     *                 type: string
     *               ano:
     *                 type: integer
     *               motorizacao:
     *                 type: string
     *               potencia_cv:
     *                 type: integer
     *               marca_id:
     *                 type: integer
     *               tipo_id:
     *                 type: integer
     *     responses:
     *       200:
     *         description: Carro atualizado com sucesso
     *       404:
     *         description: Carro não encontrado
     */
    // PUT /api/carros/:id -> atualiza os dados de um carro existente
    router.put("/:id", carros.update);

    /**
     * @swagger
     * /api/carros/{id}:
     *   delete:
     *     summary: Apaga um carro pelo ID
     *     tags: [Carros]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do carro a apagar
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Carro eliminado com sucesso
     *       404:
     *         description: Carro não encontrado
     */
    // DELETE /api/carros/:id -> elimina um carro específico
    router.delete("/:id", carros.delete);

    /**
     * @swagger
     * /api/carros:
     *   delete:
     *     summary: Apaga TODOS os carros
     *     tags: [Carros]
     *     responses:
     *       200:
     *         description: Todos os carros foram eliminados
     */
    // DELETE /api/carros -> elimina todos os carros da base de dados
    router.delete("/", carros.deleteAll);

    // Regista este router na aplicação com o prefixo /api/carros
    app.use("/api/carros", router);
};
