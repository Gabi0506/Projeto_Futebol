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
            let enderecos = resposta.data; 
            
            
            preencherTabelaEnderecos(enderecos);
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
    enderecosBody.innerHTML = ''; 

    
    enderecos.forEach(endereco => {
        let row = document.createElement('tr'); 

        
        row.innerHTML = `
            <td>${endereco.title}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.complement}</td>
        `;

        
        enderecosBody.appendChild(row);
    });
}


document.querySelector('button').addEventListener('click', listarEndereco);
