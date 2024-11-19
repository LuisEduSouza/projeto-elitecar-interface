async function listarPedidos() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/pedidos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de pedidos");
        }

        const pedidos = await respostaServidor.json();
        preencherTabela(pedidos); // Preenche a tabela com os dados de pedidos e carros
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

function preencherTabela(pedidos) {
    const tabela = document.getElementById('tabelaPedidosCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    console.log(pedidos);

    pedidos.forEach(pedido => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Coluna do ID do Pedido
        const cellId = document.createElement('td');
        cellId.textContent = pedido.idPedido;
        row.appendChild(cellId);

        const cellIdCliente = document.createElement('td');
        cellIdCliente.textContent = pedido.idCliente;
        cellIdCliente.hidden = true;
        row.appendChild(cellIdCliente);

        // Coluna do Nome/Marca do Carro (se o carro for encontrado)
        const cellCliente = document.createElement('td');
        cellCliente.textContent = pedido.nomeCliente;
        row.appendChild(cellCliente);


        const cellIdCarro = document.createElement('td');
        cellIdCarro.textContent = pedido.idCarro;
        cellIdCarro.hidden = true;
        row.appendChild(cellIdCarro);
        

        // Coluna do Nome/Marca do Carro (se o carro for encontrado)
        const cellCarro = document.createElement('td');
        cellCarro.textContent = pedido.modeloCarro;
        row.appendChild(cellCarro);

        // Coluna da Data do Pedido
        const cellDataPedido = document.createElement('td');
        cellDataPedido.textContent = pedido.dataPedido;
        row.appendChild(cellDataPedido);

        // Coluna do Valor Total
        const cellValorTotal = document.createElement('td');
        cellValorTotal.textContent = pedido.valorTotal;
        row.appendChild(cellValorTotal);

        // Coluna de Ações (Editar e Excluir)
        const tdAcoes = document.createElement('td');
        const iconAtualizar = document.createElement('img');
        iconAtualizar.src = 'assets/icons/pencil-square.svg';
        iconAtualizar.alt = 'Ícone de edição';
        tdAcoes.appendChild(iconAtualizar);

        const iconExcluir = document.createElement('img');
        iconExcluir.src = 'assets/icons/trash-fill.svg';
        iconExcluir.alt = 'Ícone de excluir';
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(row);
    });
}
