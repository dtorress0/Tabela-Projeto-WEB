var botaoBuscar = document.querySelector("#buscar-encomendas")

botaoBuscar.addEventListener("click", function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET","http://localhost:3000/encomendas");
        xhr.addEventListener("load",function(){
            var resposta = xhr.responseText;
            var encomendas = JSON.parse(resposta);

            encomendas.forEach(function(cada_encomenda){
                adicionarEncomendaNaTabela(cada_encomenda);
            });

        });
        xhr.send();
})


function adicionarEncomendaNaTabela(encomenda) {
    var tabela = document.getElementById('tabela-precos').getElementsByTagName('tbody')[0];
    var novaLinha = document.createElement('tr');

    var celulaNome = document.createElement('td');
    celulaNome.textContent = encomenda.nome;
    novaLinha.appendChild(celulaNome);

    var celulaServico = document.createElement('td');
    celulaServico.textContent = encomenda.produto;
    novaLinha.appendChild(celulaServico);

    var celulaQuantidade = document.createElement('td');
    celulaQuantidade.textContent = encomenda.qtde;
    novaLinha.appendChild(celulaQuantidade);

    var celulaValor = document.createElement('td');
    celulaValor.textContent = encomenda.valor_unitario;
    novaLinha.appendChild(celulaValor);

    var celulaTotal = document.createElement('td');
    celulaTotal.textContent = calculaTotal(parseFloat(encomenda.qtde), parseFloat(encomenda.valor_unitario));
    novaLinha.appendChild(celulaTotal);

    tabela.appendChild(novaLinha);



    celulaNome.classList.add("nome");
    novaLinha.classList.add("cliente");
}