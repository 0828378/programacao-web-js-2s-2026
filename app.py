from flask import Flask, render_template, request
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('form.html', erros=[])

@app.route('/agendamento', methods=['POST'])
def agendamento():
    dados = request.form
    erros = []

    campos_obrigatorios = [
        'nome', 'sobrenome', 'cpf', 'nascimento',
        'telefone', 'cep', 'endereco',
        'clinica', 'especialidade', 'data_hora'
    ]

    for campo in campos_obrigatorios:
        if not dados.get(campo):
            erros.append(f"O campo '{campo}' é obrigatório.")

    data_agendamento = dados.get('data_hora')
    if data_agendamento:
        try:
            data_agendamento = datetime.strptime(data_agendamento, "%Y-%m-%dT%H:%M")
            if data_agendamento <= datetime.now():
                erros.append("A data do agendamento deve ser futura.")
        except ValueError:
            erros.append("Formato de data inválido.")

    if erros:
        return render_template('form.html', erros=erros)

    return render_template('resultado.html', dados=dados)


if __name__ == '__main__':
    app.run(debug=True)
