const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
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
            let data = await api.json();
            localStorage.setItem("user", JSON.stringify(data));
            alert("Login realizado com sucesso!");
            window.location.href = '../view/home.html';
        } else {
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
