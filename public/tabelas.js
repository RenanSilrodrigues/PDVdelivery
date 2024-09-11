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

    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }
}

window.onload = fetchProdutos;


async function fetchClientes() {
    try{
        const response = await fetch('/api/clientes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const clientes = await response.json();

        const tbody = document.querySelector('#tabelacliente tbody');

        tbody.innerHTML = '';

        clientes.forEach(cliente => {
            // Cria uma nova linha
            const row = document.createElement('tr');

            const cellTelefone = document.createElement('td');
            cellTelefone.textContent = cliente.telefone;
            row.appendChild(cellTelefone);

            const cellCep = document.createElement('td');
            cellCep.textContent = cliente.cep;
            row.appendChild(cellCep);

            const cellEndereco = document.createElement('td');
            cellEndereco.textContent = cliente.endereco;
            row.appendChild(cellEndereco);

            const cellNumero = document.createElement('td');
            cellNumero.textContent = cliente.numero;
            row.appendChild(cellNumero);

            const cellBairro = document.createElement('td');
            cellBairro.textContent = cliente.bairro;
            row.appendChild(cellBairro);

            const cellComplemento = document.createElement('td');
            cellComplemento.textContent = cliente.complemento;
            row.appendChild(cellComplemento);

            const cellNome = document.createElement('td');
            cellNome.textContent = cliente.nome;
            row.appendChild(cellNome);

            tbody.appendChild(row);
        });

    }catch (err) {
        console.error('Erro ao buscar produtos:', err);
    }

}

window.onload = fetchClientes;