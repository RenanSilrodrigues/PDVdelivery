const abrirJanelaCadastro = document.querySelector('.botao_cadastrarproduto');
const abrirJanelaCliente = document.querySelector('.botao_cadastrarcliente');
const abrirJanelaSangria = document.querySelector('.botao_sangria');
const abrirJanelaPedido = document.querySelector('.botao_novopedido');

abrirJanelaCadastro.addEventListener('click', () => {
    window.open('/cadastro','_blank','width=1000,height=800,left=450,top=100');
})

abrirJanelaCliente.addEventListener('click', () => {
    window.open('cadastro_produto.html','_blank','width=1000,height=800,left=450,top=100');
})

abrirJanelaSangria.addEventListener('click', () => {
    window.open('cadastro_produto.html','_blank','width=1000,height=800,left=450,top=100');
})

abrirJanelaPedido.addEventListener('click', () => {
    window.open('cadastro_produto.html','_blank','width=1000,height=800,left=450,top=100');
})

document.addEventListener('DOMContentLoaded', function() {
    fetchProdutos();
});

