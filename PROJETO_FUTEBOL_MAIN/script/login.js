const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {
    // Obtendo os valores do formulário
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Verificação de campos obrigatórios
    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Realizando a requisição
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "password": password,
                "user_type_id": 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            // Login bem-sucedido
            let data = await api.json();
            localStorage.setItem("user", JSON.stringify(data));
            alert("Login realizado com sucesso!");
            window.location.href = '../view/home.html'; // Redireciona para a página Home
        } else {
            // Tratamento de erros
            let errorData = await api.json();
            if (errorData.data && errorData.data.errors) {
                let errorMessage = errorData.data.errors;
                alert(errorMessage);
            } else {
                alert("Erro desconhecido ao realizar o login. Tente novamente.");
            }
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar realizar o login.");
    }
}
