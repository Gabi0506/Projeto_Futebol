const url = 'https://go-wash-api.onrender.com/api/auth/address'; 

async function listarEndereco() {
    let userToken = JSON.parse(localStorage.getItem("user")).access_token;

    try {
        let api = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta); 

            let enderecos = resposta.data;

            if (Array.isArray(enderecos)) {
                preencherTabelaEnderecos(enderecos);
            } else {
                console.error("Endereços não é uma lista:", enderecos);
                alert("Erro: Nenhum endereço encontrado.");
            }
        } else {
            let respostaErro = await api.json();
            console.error(respostaErro);
            alert('Nenhum endereço cadastrado.');
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

function preencherTabelaEnderecos(enderecos) {
    const enderecosBody = document.getElementById('enderecosBody');
    enderecosBody.innerHTML = ''; // Limpa a tabela

    enderecos.forEach(endereco => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${endereco.title}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.complement}</td>
            <td>
                <button onclick="editarEndereco(${endereco.id}, '${endereco.title}', '${endereco.address}', '${endereco.number}', '${endereco.cep}', '${endereco.complement}')">Editar</button>
                <button onclick="DeletarEndereço(${endereco.id}, this)">Deletar</button>
            </td>
        `;

        enderecosBody.appendChild(row);
    });
}

document.querySelector('button').addEventListener('click', listarEndereco);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function editarEndereco(id, title, address, number, cep, complement) {
    document.getElementById('formEndereco').style.display = 'block';
    document.getElementById('enderecoId').value = id;
    document.getElementById('title').value = title;
    document.getElementById('address').value = address;
    document.getElementById('number').value = number;
    document.getElementById('cep').value = cep;
    document.getElementById('complement').value = complement;
}


async function atualizarEndereco(event) {
    event.preventDefault();

    let userToken = JSON.parse(localStorage.getItem("user")).access_token;
    let id = document.getElementById('enderecoId').value;
    let title = document.getElementById('title').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let cep = document.getElementById('cep').value;
    let complement = document.getElementById('complement').value;

    if (!title || !cep || !address || !number){
        alert("Preencha todos os campos, com dados existentes!")
        return
    }    


    try {
        let api = await fetch(`${url}/${id}`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            },
            body: JSON.stringify({
                title: title,
                address: address,
                number: number,
                cep: cep,
                complement: complement
            })
        });

        if (api.ok) {
            alert('Endereço atualizado com sucesso!');
            listarEndereco(); 
            document.getElementById('formEndereco').reset();
            document.getElementById('formEndereco').style.display = 'none';
        } else {
            let respostaErro = await api.json(); 
            console.error("Erro da API:", respostaErro);
            alert('Erro ao atualizar o endereço.');
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }
}

document.getElementById('formEndereco').addEventListener('submit', atualizarEndereco);


const cancelarEdicao = () => {
    document.getElementById('formEndereco').style.display = 'none'; 
};

const DeletarEndereço = async (id, button) => {
    if (!id) {
        console.error("ID inválido:", id);  
        return;
    }

    try {
        const userToken = JSON.parse(localStorage.getItem("user")).access_token;
        const url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

        
        const resposta = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        });

        
        if (resposta.ok) {
            alert("Endereço deletado com sucesso!");
            
            const row = button.closest('tr');  
            row.remove();  
        } else {
            const erro = await resposta.text();
            console.error(`Erro ao deletar o endereço: ${resposta.status}. Detalhes: ${erro}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar deletar o endereço.");
    }
};

/////////////////////     LOGOUT     /////////////////////////////////////////////


document.getElementById('logoutBtn').addEventListener('click', async () => {
    const apiUrl = 'https://go-wash-api.onrender.com/api/auth/logout';
    const token = JSON.parse(localStorage.getItem("user"))?.access_token; 

    if (!token) {
        alert("Usuário já está deslogado ou token inválido.");
        window.location.href = '../view/index.html'; 
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Logout realizado com sucesso!');
            localStorage.removeItem("user"); 
            window.location.href = '../view/index.html'; 
        } else {
            alert('Erro ao realizar o logout. Verifique sua conexão ou tente novamente.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao realizar o logout.');
    }
});
