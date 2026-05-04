document.querySelector("form").addEventListener("submit", function(e) {
    const data = document.querySelector("input[name='dataHora']").value;

    if (data) {
        const agora = new Date();
        const escolhida = new Date(data);

        if (escolhida <= agora) {
            alert("A data deve ser futura!");
            e.preventDefault();
        }
    }
});
