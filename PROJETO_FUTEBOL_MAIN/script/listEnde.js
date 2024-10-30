const urlList = 'https://go-wash-api.onrender.com/api/auth/address';

async function listarEnderecos() {
    let user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || !user.access_token) {
        alert("Você precisa estar logado");
        window.location.href = '../view/login.html';
        return;
    }

    try {
        let api = await fetch(urlList, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access_token}`
            }
        });

        if (api.ok) {
            let data = await api.json();
            displayEnderecos(data);  // Função para exibir os endereços na tela
        } else {
            const errorText = await api.text();
            console.error("Erro ao buscar endereços:", errorText);
            alert("Erro ao buscar endereços. O servidor retornou uma resposta inesperada.");
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar listar os endereços.");
    }
}

// Função para exibir os endereços no HTML
function displayEnderecos(enderecos) {
    const enderecosContainer = document.getElementById('enderecosContainer');
    enderecosContainer.innerHTML = '';  // Limpar conteúdo existente

    if (enderecos.length === 0) {
        enderecosContainer.innerHTML = '<p>Você ainda não cadastrou nenhum endereço.</p>';
        return;
    }

    enderecos.forEach(endereco => {
        const enderecoElement = document.createElement('div');
        enderecoElement.classList.add('endereco-item');
        enderecoElement.innerHTML = `
            <h3>${endereco.title}</h3>
            <p>${endereco.address}, ${endereco.number}</p>
            <p>CEP: ${endereco.cep}</p>
            <p>Complemento: ${endereco.complement || "N/A"}</p>
        `;
        enderecosContainer.appendChild(enderecoElement);
    });
}
