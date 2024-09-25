const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastro() {
    let name = document.getElementById('name');
    let terms = document.getElementById('terms');
    let cpf_cnpj = document.getElementById('cpf_cnpj');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let birthday = document.getElementById('birthday');

    if (!name || !terms || !cpf_cnpj || !email || !password || !birthday) {
        console.error("Um ou mais elementos não foram encontrados.");
        alert("Erro ao acessar o formulário. Tente novamente.");
        return;
    }

    name = name.value;
    terms = terms.checked;
    cpf_cnpj = cpf_cnpj.value;
    email = email.value;
    password = password.value;
    birthday = birthday.value;

    if (!name) {
        alert("Nome é obrigatório");
        return;
    }

    if (!terms) {
        alert("Você precisa aceitar os termos");
        return;
    }

    if (!cpf_cnpj) {
        alert("CPF/CNPJ é obrigatório");
        return;
    }

    if (!password) {
        alert("Senha é obrigatório");
        return;
    }

    if (!birthday) {
        alert("Você precisa colocar sua data de nascimento");
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
                "terms": terms ? 1 : 0,
                "birthday": birthday
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            console.log(resposta);
            alert("Cadastro realizado com sucesso!");
        } else {
            let respostErrors = await api.json();

            // Verifique se a estrutura de erros existe antes de tentar acessar
            if (respostErrors.data && respostErrors.data.errors && respostErrors.data.errors.cpf_cnpj) {
                alert(respostErrors.data.errors.cpf_cnpj[0]);
            } else {
                alert("Erro no cadastro. Tente novamente.");
            }
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
        alert("Erro na comunicação com o servidor.");
    }
}
