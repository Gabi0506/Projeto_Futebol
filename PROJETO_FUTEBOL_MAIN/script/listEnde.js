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
                'Authorization': Bearer ${user.access_token}
            }
        });

        if (api.ok) {
            let data = await api.json();
            displayEnderecos(data);
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
    const enderecosBody = document.getElementById('enderecosBody');
    const noEnderecosMessage = document.getElementById('noEnderecosMessage');
    
    if (!enderecosBody || !noEnderecosMessage) {
        console.error("Elemento não encontrado no DOM.");
        return;
    }

    enderecosBody.innerHTML = '';  // Limpar conteúdo existente

    if (enderecos.length === 0) {
        noEnderecosMessage.style.display = 'block';  // Exibe a mensagem "Nenhum endereço"
        return;
    } else {
        noEnderecosMessage.style.display = 'none';  // Oculta a mensagem se houver endereços
    }

    enderecos.forEach(endereco => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${endereco.title}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.complement || "N/A"}</td>
        `;
        enderecosBody.appendChild(row);
    });
}
