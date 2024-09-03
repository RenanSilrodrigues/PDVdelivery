const express = require('express');
const app = express();
const PORT = 5555;
const pool = require('./db');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('Pagina inicial carregada');
    res.sendFile(__dirname + '/templates/index.html');
});

app.get('/cadastro', (req, res) => {
    console.log('Pagina de cadastro carregada');
    res.sendFile(__dirname + '/templates/cadastro_produto.html');
});

app.post('/formulariocadastro', async (req, res) => {
    try {
        const {tipodeproduto, descricaoProduto, valor} = req.body;
        console.log(tipodeproduto, descricaoProduto, valor, 'Inseridos no BD');

        await pool.query(
            'INSERT INTO Produtos (Tipo, Descricao, Valor) VALUES ($1, $2, $3) RETURNING *',
                [tipodeproduto, descricaoProduto, valor]
        );

        res.redirect(req.get('Referer') || '/cadastro');

        }catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');

        }

});


app.listen(PORT, () => {
    console.log(`App online na porta ${PORT}`);
});