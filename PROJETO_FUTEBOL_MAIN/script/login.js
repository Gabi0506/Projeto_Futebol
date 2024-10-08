const url = 'https://go-wash-api.onrender.com/api/login';

async function login() {

    
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "user_type_id": 1,
                "password": password,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            localStorage.setItem("user", JSON.stringify(resposta))
            console.log(resposta);
            return
        }

        alert("Erro")
}
login();

function cadastroEndereco(){
    let user = JSON.parse (localStorage.getItem("user"));
    console.log(user)
}
