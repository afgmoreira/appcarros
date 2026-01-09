// URL base da API que expõe o recurso "carros" no servidor Node/Express
const API_URL = 'http://localhost:3000/api/carros';

// =========================================================================
// 1. Função para carregar as Marcas e Tipos para os Dropdowns (Selects)
// =========================================================================
async function carregarDropdowns() {
    try {
        // Faz um pedido GET ao endpoint que devolve todas as marcas
        const resMarcas = await fetch('http://localhost:3000/api/carros/marcas');
        // Converte a resposta em formato JSON (array de objetos marca)
        const marcas = await resMarcas.json();
        
        // Obtém a referência do elemento <select> do HTML onde vamos pôr as marcas
        const selectMarca = document.getElementById('marcaId');
        
        // Limpa o select e adiciona uma opção inicial inválida (placeholder)
        selectMarca.innerHTML = '<option value="" selected disabled>Escolha uma marca...</option>';
        
        // Percorre todas as marcas recebidas e cria uma opção <option> para cada uma
        marcas.forEach(m => {
            // O value é o ID (para a base de dados), o texto é o nome (para o utilizador ver)
            selectMarca.innerHTML += `<option value="${m.id}">${m.nome_marca}</option>`;
        });

        // Faz um pedido GET ao endpoint que devolve todos os tipos de carro
        const resTipos = await fetch('http://localhost:3000/api/carros/tipos');
        const tipos = await resTipos.json();
        
        // Obtém a referência do elemento <select> dos tipos
        const selectTipo = document.getElementById('tipoId');

        // Limpa e adiciona o placeholder inicial
        selectTipo.innerHTML = '<option value="" selected disabled>Escolha um tipo...</option>';
        
        // Percorre os tipos e preenche o dropdown
        tipos.forEach(t => {
            selectTipo.innerHTML += `<option value="${t.id}">${t.nome_tipo}</option>`;
        });

    } catch (erro) {
        // Se houver algum erro de rede ou na API, mostra na consola
        console.error("Erro ao carregar dropdowns:", erro);
    }
}

// =========================================================================
// 2. Função para carregar a lista de carros (READ)
// =========================================================================
async function carregarCarros() {
    // Obtém o contentor onde os cartões (cards) dos carros vão aparecer
    const contentor = document.getElementById('listaCarros');
    
    // Mostra uma mensagem temporária enquanto os dados carregam
    contentor.innerHTML = '<p class="text-center text-muted">A carregar dados...</p>';

    try {
        // Faz o pedido à API principal para obter a lista de todos os carros
        const resposta = await fetch(API_URL);
        const carros = await resposta.json();

        // Limpa a mensagem de "A carregar..."
        contentor.innerHTML = '';

        // Se a lista vier vazia, avisa o utilizador
        if(carros.length === 0) {
            contentor.innerHTML = '<div class="alert alert-warning">Não há carros registados.</div>';
            return;
        }

        // Percorre cada carro recebido e cria o HTML dinamicamente
        carros.forEach(carro => {
            // Constrói o HTML do cartão (Card do Bootstrap)
            // Usa-se carro.nome_marca e carro.nome_tipo que vêm do JOIN no backend
            const html = `
                <div class="col-md-6">
                    <div class="card card-carro h-100 border-0 shadow-sm bg-light">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5 class="card-title fw-bold text-primary mb-0">${carro.modelo}</h5>
                                <span class="badge bg-dark">${carro.ano}</span>
                            </div>
                            <hr>
                            <p class="card-text small mb-3">
                                <strong>Motor:</strong> ${carro.motorizacao} (${carro.potencia_cv} cv)<br>
                                <span class="badge bg-secondary mt-2">${carro.nome_marca || 'Marca Desconhecida'}</span>
                                <span class="badge bg-info text-dark mt-2">${carro.nome_tipo || 'Tipo Desconhecido'}</span>
                            </p>
                            
                            <button class="btn btn-sm btn-outline-danger w-100" onclick="apagarCarro(${carro.id})">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            // Adiciona este cartão ao contentor principal
            contentor.innerHTML += html;
        });

    } catch (erro) {
        console.error('Erro:', erro);
        contentor.innerHTML = '<div class="alert alert-danger">Erro ao ligar à API.</div>';
    }
}

// =========================================================================
// Adicionar novo carro (CREATE)
// =========================================================================
// Adiciona um "ouvinte" ao formulário para detetar quando o utilizador clica em "Guardar"
document.getElementById('formAdicionar').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar (comportamento padrão dos forms)

    // Cria um objeto com os dados recolhidos dos inputs do HTML
    const novoCarro = {
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        motorizacao: document.getElementById('motorizacao').value,
        potencia_cv: document.getElementById('potencia').value,
        marca_id: document.getElementById('marcaId').value, // Valor selecionado no dropdown
        tipo_id: document.getElementById('tipoId').value    // Valor selecionado no dropdown
    };

    try {
        // Envia os dados para a API usando o método POST
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Avisa o servidor que enviamos JSON
            body: JSON.stringify(novoCarro) // Transforma o objeto JS em texto JSON
        });

        if (resposta.ok) {
            // Se o servidor responder com sucesso (200 OK)
            alert('Carro adicionado com sucesso!');
            document.getElementById('formAdicionar').reset(); // Limpa os campos do formulário
            carregarCarros(); // Atualiza a lista na direita imediatamente
            carregarDropdowns(); // Opcional: reseta os selects para o estado inicial
        } else {
            alert('Erro ao adicionar carro.');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão.');
    }
});

// =========================================================================
//  Apagar carro (DELETE)
// =========================================================================
async function apagarCarro(id) {
    // Pergunta de segurança antes de apagar
    if (!confirm("Tens a certeza que queres eliminar este carro?")) {
        return;
    }

    try {
        // Chama a API com o método DELETE
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            alert("Carro eliminado!");
            // Atualiza a lista para o carro desaparecer
            carregarCarros();
        } else {
            alert("Erro ao eliminar o carro.");
        }
    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro de conexão.");
    }
}

// =========================================================================
// Inicialização
// =========================================================================
// Garante que o código só corre quando a página HTML estiver toda carregada
document.addEventListener('DOMContentLoaded', () => {
    carregarDropdowns(); // 1. Preenche as marcas e tipos
    carregarCarros();    // 2. Preenche a lista de carros existentes
});