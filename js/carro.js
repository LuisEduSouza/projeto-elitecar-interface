async function enviarFormulario(){
    const carroDTO = {
        "marca": document.querySelectorAll("input")[0].value,
        "modelo": document.querySelectorAll("input")[1].value,
        "ano": Number(document.querySelectorAll("input")[2].value),
        "cor": document.querySelectorAll("input")[3].value
    }

    try {
        const respostaServidor = await fetch("http://localhost:3333/novo/carro",{
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(carroDTO)
        });
    
        if(!respostaServidor.ok){
            throw new Error("Erro ao enviar os dados ao servidor");
        }
    
        alert("Carro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`)
    }
}

async function listarCarros() {
    try {
        const respostaServidor = await fetch("http://localhost:3333/lista/carros", { // Faz a requisição GET
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    
        if (!respostaServidor.ok) {
            throw new Error("Erro ao buscar dados da lista de carros");
        }
    
        const carros = await respostaServidor.json(); // Converte a resposta para JSON
        preencherTabela(carros); // Chama a função para preencher a tabela com os dados
    } catch (error) {
        console.log(error);
        alert(`Erro ao se comunicar com o servidor. ${error}`);
    }
}

// Função para preencher a tabela com os dados recebidos
function preencherTabela(carros) {
    const tabela = document.getElementById('tabelaCarroCorpo');
    tabela.innerHTML = ''; // Limpa qualquer conteúdo existente na tabela

    // Itera sobre cada carro no array de dados
    carros.forEach(carro => {
        // Cria uma nova linha da tabela
        const row = document.createElement('tr');

        // Cria e preenche cada célula da linha
        const cellId = document.createElement('td');
        cellId.textContent = carro.idCarro; // Preenche com o ID do carro
        row.appendChild(cellId);

        const cellMarca = document.createElement('td');
        cellMarca.textContent = carro.marca; // Preenche com a Marca do carro
        row.appendChild(cellMarca);

        const cellModelo = document.createElement('td');
        cellModelo.textContent = carro.modelo; // Preenche com o Modelo do carro
        row.appendChild(cellModelo);

        const cellAno = document.createElement('td');
        cellAno.textContent = carro.ano; // Preenche com o Ano do carro
        row.appendChild(cellAno);

        const cellCor = document.createElement('td');
        cellCor.textContent = carro.cor; // Preenche com a Cor do carro
        row.appendChild(cellCor);

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

  
  