const express = require('express');
const app = express();
const PORT = 8081;

// Middleware para utilização de dados JSON
app.use(express.json()); // para trabalhar com json no express é necessario essa expressão


app.post('/login', (req,res) => {
    try {
        const { usuario, senha} = req.body
        if (usuario != "admin" || senha != "1234") {
            res.status(400).json({message: "Login inválido, tente novamente!"})
        } else {
            res.status(201).json({sucesso: "Login realizado com sucesso"})
        }
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