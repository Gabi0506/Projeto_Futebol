const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function listarEndereco() {
    let userToken = JSON.parse(localStorage.getItem("user")).access_token;

    let api = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
        }
    });

    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta.data)
        return resposta
    } else {
        let respostaErro = await api.json();
        console.error(respostaErro);
        alert('Erro ao buscar os endereços.');
    }
}

listarEndereco()
