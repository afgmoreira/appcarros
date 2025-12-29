// URL base da API que expõe o recurso "carros" no servidor Node/Express
const API_URL = 'http://localhost:3000/api/carros';

// 1. Função para carregar (LER) os dados da API e mostrar no HTML
async function carregarCarros() {
    // Elemento onde vão ser postas as "cards" dos carros
    const contentor = document.getElementById('listaCarros');
    // Mensagem inicial enquanto os dados estão a ser carregados
    contentor.innerHTML = '<p class="text-center text-muted">A carregar dados...</p>';

    try {
        // Faz o pedido GET à API para obter a lista de carros
        const resposta = await fetch(API_URL);
        // Converte a resposta em JSON (array de carros)
        const carros = await resposta.json();

        // Remove a mensagem de loading
        contentor.innerHTML = '';

        // Se não houver carros, mostra um aviso ao utilizador
        if(carros.length === 0) {
            contentor.innerHTML = '<div class="alert alert-warning">Não há carros registados.</div>';
            return;
        }

        // Para cada carro recebido, cria um bloco HTML (card) e adiciona ao contentor
        carros.forEach(carro => {
            const html = `
                <div class="col-md-6">
                    <div class="card card-carro h-100 border-0 shadow-sm bg-light">
                        <div class="card-body">
                            <h5 class="card-title fw-bold text-primary">${carro.modelo}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${carro.ano} | ${carro.potencia_cv} cv</h6>
                            <p class="card-text small">
                                Motor: ${carro.motorizacao}<br>
                                <span class="badge bg-secondary">Marca ID: ${carro.marca_id}</span>
                                <span class="badge bg-info text-dark">Tipo ID: ${carro.tipo_id}</span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            contentor.innerHTML += html;
        });

    } catch (erro) {
        // Se houver erro na fetch (API em baixo, problema de rede, etc.)
        console.error('Erro:', erro);
        contentor.innerHTML = '<div class="alert alert-danger">Erro ao ligar à API. O servidor está ligado?</div>';
    }
}

// 2. Função para adicionar (CRIAR) um carro na API quando o formulário é submetido
document.getElementById('formAdicionar').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    // Recolhe os valores dos campos do formulário e constrói o objeto "novoCarro"
    const novoCarro = {
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        motorizacao: document.getElementById('motorizacao').value,
        potencia_cv: document.getElementById('potencia').value,
        marca_id: document.getElementById('marcaId').value,
        tipo_id: document.getElementById('tipoId').value
    };

    try {
        // Envia um pedido POST para a API com os dados do novo carro em formato JSON
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCarro)
        });

        if (resposta.ok) {
            alert('Carro adicionado com sucesso!');
            // Limpa os campos do formulário
            document.getElementById('formAdicionar').reset();
            // Recarrega a lista de carros para mostrar o novo registo
            carregarCarros();
        } else {
            // Caso o servidor responda com erro (ex: 400, 500, ...)
            alert('Erro ao adicionar carro. Verifica a consola.');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão.');
    }
});

// Assim que o DOM estiver totalmente carregado, chama carregarCarros
// Isto garante que os elementos HTML já existem quando o JS tenta aceder-lhes
document.addEventListener('DOMContentLoaded', carregarCarros);