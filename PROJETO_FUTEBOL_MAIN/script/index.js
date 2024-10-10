const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function cadastroEndereco() {

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let address = document.getElementById('address').value;
    let number = document.getElementById('number').value;
    let complement = document.getElementById('complement').value;

 
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access_token) {
        alert("Você precisa estar logado para cadastrar um endereço.");
        window.location.href = '../view/login.html';
        return;
    }

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.access_token}`
            }
        });
    
        if (response.ok) {
            let data = await response.json();
            alert("Endereço cadastrado com sucesso!");
            window.location.href = '../view/home.html';
        } else {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                let errorData = await response.json();
                let errorMessage = errorData.data.errors;
                alert(errorMessage || "Erro ao cadastrar endereço. Tente novamente.");
            } else {
                const errorText = await response.text();
                console.error("Resposta do servidor:", errorText);
                alert("Erro na requisição. O servidor retornou uma resposta inesperada.");
            }
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar cadastrar o endereço.");
    }
}
