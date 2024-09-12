const express = require('express');
const app = express();
const PORT = 5555;
const pool = require('./db');
const { error } = require('console');

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

app.get('/cliente', (req, res) => {
    console.log('Pagina de clientes carregada');
    res.sendFile(__dirname + '/templates/cadastro_cliente.html');
})
//----------------------------------------------------------------------------

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

app.post('/formulariocliente', async (req, res) => {
    try{
        const {telefone, cep, endereco, numero, bairro, complemento, nomecliente} = req.body;
        console.log(telefone, cep, endereco, numero, bairro, complemento, nomecliente);

        await pool.query(
            'INSERT INTO Clientes (telefone, cep, endereco, numero, bairro, complemento, nome) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [telefone, cep, endereco, numero, bairro, complemento, nomecliente]
        );

        res.redirect(req.get('Referer') || '/cliente');

        }catch (err) {
            console.error(err.message);
            res.status(500).send('Erro no servidor');

        }
});

//--------------------------------------------------------------------------

app.get('/api/produtos', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM Produtos');
        const produtos = result.rows;
        res.json(produtos);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro no servidor' });
        }
});

app.get('/api/clientes', async (req, res) => {
    try{
        const result = await pool.query('SELECT * FROM Clientes');
        const clientes = result.rows;
        res.json(clientes);
    }catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro no servidor' });
        }
});
//--------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`App online na porta ${PORT}`);
});