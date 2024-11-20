const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastro() {
    let name = document.getElementById('name').value;
    let terms = document.getElementById('terms').checked;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let birthday = document.getElementById('birthday').value;


   
    if (!name) {
        alert("Nome é obrigatório");
        return;
    }

    if (!email) {
        alert("Email é obrigatório");
        return;
    }

    if (!password) {
        alert("Senha é obrigatória");
        return;
    }

    if (!cpf_cnpj) {
        alert("CPF/CNPJ é obrigatório");
        return;
    }

    if (!birthday) {
        alert("Você precisa colocar sua data de nascimento");
        return;
    }

    if (!terms) {
        alert("Você precisa aceitar os termos");
        return;
    }

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id": 1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": terms,
                "birthday": birthday
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);
            alert(resposta.data);
            window.location.href = '../view/login.html';
        } else {
            let respostErrors = await api.json();

           
            if (respostErrors.data && respostErrors.data.errors) {
                let errorMessage = "";
                if (respostErrors.data.errors.cpf_cnpj) {
                    errorMessage = respostErrors.data.errors.cpf_cnpj[0];
                } else if (respostErrors.data.errors.password) {
                    errorMessage = respostErrors.data.errors.password[0];
                } else if (respostErrors.data.errors.email) {
                    errorMessage = respostErrors.data.errors.email[0];
                } else {
                    errorMessage = "Erro no cadastro. Por favor, tente novamente.";
                }

                alert(errorMessage);
            } else {
                alert("Erro desconhecido. Por favor, tente novamente.");
            }
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro no cadastro, CPF/CNPJ já utilizado. Por favor, tente novamente.");
    }
}
