//Filtrando as tabelas
var campoFiltro = document.querySelector("#filtrar-tabela");

campoFiltro.addEventListener("input", function () {
    var clientes = document.querySelectorAll(".cliente");

    //Verifica se tem critério de busca
    if (this.value.length > 0) {
        for (var cli = 0; cli < clientes.length; cli++) {
            var nome = clientes[cli].querySelector(".nome").textContent;

            var expressao = new RegExp(this.value, "i");

            //Verifica os clientes conforme critério de busca
            if (!expressao.test(nome)) {
                clientes[cli].classList.add("invisivel");
            } else {
                clientes[cli].classList.remove("invisivel");
            }
        }
    } else {
        for (var cli = 0; cli < clientes.length; cli++) {
            var nome = clientes[cli].querySelector(".nome").textContent;

            clientes[cli].classList.remove("invisivel");
        }
    }
});