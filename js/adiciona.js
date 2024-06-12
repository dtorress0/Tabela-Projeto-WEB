// Captura o botão pelo ID
var botaoEnviar = document.getElementById('botao');

// Adiciona um ouvinte de evento para o clique no botão
botaoEnviar.addEventListener('click', function() {
    // Captura os valores dos campos do formulário
    var nome = document.getElementById('nome').value;
    var qtde = document.getElementById('qtde').value;
    var produto = document.getElementById('produto').value;
    var valorUnitario = document.getElementById('valor_unitario').value;

    // Limpa os campos do formulário
    document.getElementById("nome").value = "";
    document.getElementById("qtde").value = "";
    document.getElementById("produto").value = "";
    document.getElementById("valor_unitario").value = "";

    // Verifica se algum dos campos do formulário está em branco
    if (nome.trim() === '' || qtde.trim() === '' || produto.trim() === '' || valorUnitario.trim() === '') {
        alert('Por favor, preencha todos os campos antes de adicionar uma nova linha.');
        return; // Sai da função para evitar adicionar a linha em branco
    }

    var tabela = document.getElementById('tabela-precos').getElementsByTagName('tbody')[0];
    var novaLinha = document.createElement('tr');
    novaLinha.classList.add("cliente"); // Adiciona a classe "cliente" à nova linha

    var celulaNome = document.createElement('td');
    celulaNome.textContent = nome;
    novaLinha.appendChild(celulaNome);
    celulaNome.classList.add("nome");

    var celulaServico = document.createElement('td');
    celulaServico.textContent = produto;
    novaLinha.appendChild(celulaServico);

    var celulaQuantidade = document.createElement('td');
    celulaQuantidade.textContent = qtde;
    celulaQuantidade.classList.add("qtd");
    novaLinha.appendChild(celulaQuantidade);

    var celulaValor = document.createElement('td');
    celulaValor.textContent = valorUnitario;
    celulaValor.classList.add("valor");
    novaLinha.appendChild(celulaValor);

    var celulaTotal = document.createElement('td');
    celulaTotal.textContent = calculaTotal(parseFloat(qtde), parseFloat(valorUnitario));
    celulaTotal.classList.add("total");
    novaLinha.appendChild(celulaTotal);

    tabela.appendChild(novaLinha);

    // Verificação apenas para a nova linha adicionada
    verificaNovaEncomenda(novaLinha);
});

// Função para o cálculo do valor total
function calculaTotal(qtdeEncomenda, unitarioProduto) {
    var total = qtdeEncomenda * unitarioProduto;
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para verificar a nova encomenda
function verificaNovaEncomenda(cliente) {
    var qtde = parseFloat(cliente.querySelector(".qtd").textContent);
    var unitario = parseFloat(cliente.querySelector(".valor").textContent);

    if (!validaQTDE(qtde)) {
        qtdeInvalida(cliente);
    } else if (!validaUNI(unitario)) {
        valorInvalido(cliente);
    } else {
        calcularTotalEncomenda(cliente, qtde, unitario);
    }
}

// Função para validar quantidade
function validaQTDE(valor) {
    return valor >= 1 && !isNaN(valor);
}

// Função para validar valor unitário
function validaUNI(valor) {
    return valor >= 1 && !isNaN(valor);
}

// Função para formatar valor
function formataValor(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para marcar quantidade inválida
function qtdeInvalida(cliente) {
    cliente.querySelector(".qtd").textContent = "QTDE INVÁLIDA!";
    cliente.querySelector(".qtd").style.color = "red";
    cliente.classList.add("info-invalida");
}

// Função para marcar valor inválido
function valorInvalido(cliente) {
    cliente.querySelector(".valor").textContent = "VALOR INVÁLIDO!";
    cliente.classList.add("info-invalida");
}

// Função para calcular o valor total da encomenda
function calcularTotalEncomenda(cliente, qtde, unitario) {
    cliente.querySelector(".valor").textContent = formataValor(unitario);
    cliente.querySelector(".total").textContent = calculaTotal(qtde, unitario);
}

// Função para preencher o valor unitário com base no serviço selecionado
document.getElementById('produto').addEventListener('change', function() {
    var produtoSelecionado = this.value;
    var precos = document.querySelectorAll('#tabela-precos-geral .preco');
    
    precos.forEach(function(preco) {
        var produto = preco.querySelector('.produto').textContent;
        var valor = preco.querySelector('.valor').textContent.replace('R$', '').trim();
        
        if (produto === produtoSelecionado) {
            document.getElementById('valor_unitario').value = valor;
        }
    });
});