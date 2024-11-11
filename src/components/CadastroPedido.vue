<script setup lang="ts">

</script>

<template>
    <div class="hero-pedido">
        <div class="titulo">
            <img src="../../public/images/iconPedidos.png">
            <h1>NOVO PEDIDO</h1>
        </div>
        <div class="barraform">
            <form action="">
                <div class="cadastro-cliente">
                    <label for="telefone">Telefone:</label><br>
                    <input type="tel" id="telefone" name="telefone" maxlength="15" required>
                    <p></p>
                </div>
            </form>
            <form action="">
                <div class="cadastro-pagamento">
                    <label for="pagamento">Pagamento:</label>
                        <select id="pagamento" required>
                            <option value="selecione">Selecione</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Debito">Debito</option>
                            <option value="Credito">Credito</option>
                            <option value="Refeição">Refeição</option>
                            <option value="Pix">Pix</option>
                            <option value="Cupom">Cupom</option>
                        </select>
                </div>
            </form>
            <form action="">
                <div class="cadastro-produto">
                    <label for="item">Item:</label><br>
                    <input type="text" name="item" required>
                    <button>Adicionar mais</button>
                </div>
            </form>
        </div>
        <div class="barra-botoes">
            <button>Descartar</button>
            <button>Confirmar</button>
        </div>
        <div class="barratabela">
            <p>Novo Pedido</p>
            <p>Cliente: Fulano</p>
            <p>O endereço do cliente aparecerá aqui</p>
            <p>Itens do pedido</p>
            <p>Pagamento em </p>
            <p>Valor Total:</p>
        </div>
    </div>

</template>

<style scoped>

.hero-pedido{
    display: flex;
    flex-direction: column;
    width: 100vw;
    max-height: 100%;
    padding-left: 20rem;
    padding-right: 20rem;
}

.titulo{
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-size: large;
    background-color: #909090;
    font-family: "Montserrat", sans-serif;
    padding: 1.5vh;
    margin: 8px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #a5a5a5;
}

.barraform{
    display: grid;
    grid-template-columns: auto auto;
    border-radius: 5px;
    background-color: #DADADA;
    padding: 1rem;
    margin: 8px;
    font-family: "Montserrat", sans-serif;
    box-shadow: 2px 2px 5px #a5a5a5;
    height: 45vh;
}

.barratabela{
    background-color: #C1BCFF;
    max-width: 100%;
    height: 45vh;
    max-height: 45vh;
    margin: 8px;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 2px 2px 5px #a5a5a5;
}

</style>