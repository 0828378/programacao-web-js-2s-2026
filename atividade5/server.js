const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/agendamento', (req, res) => {
    const dados = req.body;
    let erros = [];

    for (let campo in dados) {
        if (campo !== 'observacao' && !dados[campo]) {
            erros.push(`O campo ${campo} é obrigatório.`);
        }
    }

    const dataAtual = new Date();
    const dataAgendamento = new Date(dados.data + "T" + dados.hora);

    if (dataAgendamento <= dataAtual) {
        erros.push("A data do agendamento deve ser futura.");
    }

    if (erros.length > 0) {
        return res.send(`
            <h1>Erros encontrados:</h1>
            <ul>
                ${erros.map(e => `<li>${e}</li>`).join('')}
            </ul>
            <a href="/">Voltar</a>
        `);
    }

    res.send(`
        <h1>Agendamento realizado!</h1>

        <h2>Dados do paciente</h2>
        <p><strong>Nome:</strong> ${dados.nome} ${dados.sobrenome}</p>
        <p><strong>CPF:</strong> ${dados.cpf}</p>
        <p><strong>Data de nascimento:</strong> ${dados.nascimento}</p>
        <p><strong>Telefone:</strong> ${dados.telefone}</p>
        <p><strong>Endereço:</strong> ${dados.endereco} - CEP: ${dados.cep}</p>

        <h2>Dados da consulta</h2>
        <p><strong>Clínica:</strong> ${dados.clinica}</p>
        <p><strong>Especialidade:</strong> ${dados.especialidade}</p>
        <p><strong>Data:</strong> ${dados.data}</p>
        <p><strong>Hora:</strong> ${dados.hora}</p>
        <p><strong>Observação:</strong> ${dados.observacao || "Nenhuma"}</p>

        <br>
        <a href="/">Novo agendamento</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});
