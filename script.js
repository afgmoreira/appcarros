const API_URL = 'http://localhost:3000/api/carros';

// 1. Função para carregar (LER) os dados da API
async function carregarCarros() {
    const contentor = document.getElementById('listaCarros');
    contentor.innerHTML = '<p class="text-center text-muted">A carregar dados...</p>';

    try {
        const resposta = await fetch(API_URL); // Faz o pedido GET
        const carros = await resposta.json();

        contentor.innerHTML = ''; // Limpa o loading

        if(carros.length === 0) {
            contentor.innerHTML = '<div class="alert alert-warning">Não há carros registados.</div>';
            return;
        }

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
        console.error('Erro:', erro);
        contentor.innerHTML = '<div class="alert alert-danger">Erro ao ligar à API. O servidor está ligado?</div>';
    }
}

// 2. Função para adicionar (CRIAR) um carro na API
document.getElementById('formAdicionar').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const novoCarro = {
        modelo: document.getElementById('modelo').value,
        ano: document.getElementById('ano').value,
        motorizacao: document.getElementById('motorizacao').value,
        potencia_cv: document.getElementById('potencia').value,
        marca_id: document.getElementById('marcaId').value,
        tipo_id: document.getElementById('tipoId').value
    };

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoCarro)
        });

        if (resposta.ok) {
            alert('Carro adicionado com sucesso!');
            document.getElementById('formAdicionar').reset(); // Limpa o formulário
            carregarCarros(); // Atualiza a lista automaticamente
        } else {
            alert('Erro ao adicionar carro. Verifica a consola.');
        }
    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão.');
    }
});

// Carregar a lista assim que a página abre
document.addEventListener('DOMContentLoaded', carregarCarros);