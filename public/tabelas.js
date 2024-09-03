async function fetchProdutos() {
    try {
        const response = await fetch('/api/produtos');
        const produtos = await response.json();

        const jsonContainer = document.getElementById('barra_tabeladecadastro');

        jsonContainer.textContent = JSON.stringify(produtos);


    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }
}

// Chama a função ao carregar a página
window.onload = fetchProdutos;