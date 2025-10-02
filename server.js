const express = require('express');
const app = express();
const PORT = 8081;

// Middleware para utilização de dados JSON
app.use(express.json()); // para trabalhar com json no express é necessario essa expressão

async function validaNumeros(pNumUm, pNumDois, pNumTres) {
    try {
        if (isNaN(pNumUm) || isNaN(pNumDois) || isNaN(pNumTres)) {
            throw new Error('Os valores digitados são inválidos');
        } 
        const numero1 = parseFloat(pNumUm);
        const numero2 = parseFloat(pNumDois);
        const numero3 = parseFloat(pNumTres)

        return {numero1, numero2, numero3};

    } catch (error) {
        throw new Error(error);
    }
}

async function soma(pNumUm, pNumDois, pNumTres) {
    try {
        const {numero1, numero2, numero3} = await validaNumeros(pNumUm, pNumDois, pNumTres);
        return numero1 + numero2 + numero3
    } catch (error) {
        throw new Error(error);
    }
}

app.post('/soma', async (req,res) => {
    try {
        const { numeroUm, numeroDois, numeroTres } = req.body
        
        const resultadoSoma = await soma(numeroUm, numeroDois, numeroTres);

        res.status(201).json({resultado: `O resultado da soma é ${resultadoSoma}`})
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