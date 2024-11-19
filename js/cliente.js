async function enviarFormulario(){
    const clienteDTO = {
        "nome": document.querySelectorAll("input")[0].value,
        "cpf": document.querySelectorAll("input")[1].value,
        "telefone": document.querySelectorAll("input")[2].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/cliente",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(clienteDTO)
        });
    
        if(!respostaServidor.ok){
            throw new Error("Erro ao enviar os dados ao servidor");
        }
    
        alert("Cliente cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`)
    }
}

async function listarClientes() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/clientes", { // Faz a requisição GET
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de clientes");
        }
    
        const clientes = await respostaServidor.json(); // Converte a resposta para JSON
        preencherTabela(clientes); // Chama a função para preencher a tabela com os dados
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para preencher a tabela com os dados recebidos
function preencherTabela(clientes) {
    const tabela = document.getElementById('tabelaClienteCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    // Itera sobre cada cliente no array de dados
    clientes.forEach(cliente => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const cellId = document.createElement('td');
        cellId.textContent = cliente.idCliente; // Preenche com o ID do cliente
        row.appendChild(cellId);

        const cellNome = document.createElement('td');
        cellNome.textContent = cliente.nome; // Preenche com o Nome do cliente
        row.appendChild(cellNome);

        const cellCPF = document.createElement('td');
        cellCPF.textContent = cliente.cpf; // Preenche com o CPF do cliente
        row.appendChild(cellCPF);

        const cellTelefone = document.createElement('td');
        cellTelefone.textContent = cliente.telefone; // Preenche com o Telefone do cliente
        row.appendChild(cellTelefone);

        // Cria célula para ações com ícones
        const tdAcoes = document.createElement('td');

        // Ícone de edição
        const iconAtualizar = document.createElement('img'); 
        iconAtualizar.src = 'assets/icons/pencil-square.svg'; 
        iconAtualizar.alt = 'Ícone de edição'; 
        tdAcoes.appendChild(iconAtualizar); 

        // Ícone de exclusão
        const iconExcluir = document.createElement('img'); 
        iconExcluir.src = 'assets/icons/trash-fill.svg'; 
        iconExcluir.alt = 'Ícone de excluir'; 
        tdAcoes.appendChild(iconExcluir);

        row.appendChild(tdAcoes);

        // Adiciona a linha preenchida à tabela
        tabela.appendChild(row);
    });
}
