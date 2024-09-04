async function fetchProdutos() {

    try {

        const response = await fetch('/api/produtos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const produtos = await response.json();

        const tbody = document.querySelector('#tabeladecadastro tbody');

        tbody.innerHTML = '';

        produtos.forEach(produto => {
            // Cria uma nova linha
            const row = document.createElement('tr');

            const cellId = document.createElement('td');
            cellId.textContent = produto.id;
            row.appendChild(cellId);

            const cellTipo = document.createElement('td');
            cellTipo.textContent = produto.tipo;
            row.appendChild(cellTipo);

            const cellDescricao = document.createElement('td');
            cellDescricao.textContent = produto.descricao;
            row.appendChild(cellDescricao);

            const cellValor = document.createElement('td');
            cellValor.textContent = produto.valor;
            row.appendChild(cellValor);

            tbody.appendChild(row);
        });

        /*const jsonContainer = document.getElementById('barra_tabeladecadastro');

        jsonContainer.textContent = JSON.stringify(produtos);*/


    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }
}

// Chama a função ao carregar a página
window.onload = fetchProdutos;