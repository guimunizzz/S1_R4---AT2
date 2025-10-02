const express = require('express');
const app = express();
const PORT = 8081;

// Middleware para utilização de dados JSON
app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

app.post('/mensagem', (req,res) => {
    try {
        const {nome, idade, timeFavorito } = req.body
        res.send(`Ola ${nome}!, você tem ${idade} anos e torce para o ${timeFavorito}`)
        
        res.status(201).json({message: 'Dados recebidos com sucesso no servidor.'})
    } catch (error) {
        res.status(500).json({message: `Ocorreu um erro ao processar a requisição`, errorMessage: error.message});
    }
})


app.use((req, res) => {
    res.status(404).send("Pagina não encontrada");
})

app.listen(PORT, ()=> {
    console.log(`Servidor respondendo em: http://localhost:${PORT}`);
})