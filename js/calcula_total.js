// Captura todas as encomendas
var clientes = document.querySelectorAll(".cliente");

for (var count = 0; count < clientes.length; count++) {
    var qtde = parseFloat(clientes[count].querySelector(".qtd").textContent);
    var unitario = parseFloat(clientes[count].querySelector(".valor").textContent);
    
    if (!validaQTDE(qtde)) {
        qtdeInvalida(clientes[count]);
    } else if (!validaUNI(unitario)) {
        valorInvalido(clientes[count]);
    } else {
        calcularTotalEncomenda(clientes[count], qtde, unitario);
    }
}

// Função para o cálculo do valor total
function calculaTotal(qtdeEncomenda, unitarioProduto) {
    var total = 0;

    total = qtdeEncomenda * unitarioProduto;

    return formataValor(total);
}

function validaUNI(valor) {
    if(valor < 1 || isNaN(valor)){
        return false
    }else{
        return true
    }
}

function validaQTDE(valor) {
    if(valor<1 || isNaN(valor)){
        return false
    }else{
        return true
    }
}

function formataValor(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function qtdeInvalida(cliente) {
    cliente.querySelector(".qtd").textContent = "QTDE INVÁLIDA!";
    cliente.querySelector(".qtd").style.color = "red";
    cliente.classList.add("info-invalida");
}

// Função para marcar valor inválido
function valorInvalido(cliente) {
    cliente.querySelector(".valor").textContent = "VALOR INVÁLIDO!";
    // Puxando a cor vermelha por uma classe no css
    clientes[count].classList.add("info-invalida");
}

// Função para calcular o valor total da encomenda
function calcularTotalEncomenda(cliente, qtde, unitario) {
    cliente.querySelector(".valor").textContent = formataValor(unitario);
    cliente.querySelector(".total").textContent = calculaTotal(qtde, unitario);
}


