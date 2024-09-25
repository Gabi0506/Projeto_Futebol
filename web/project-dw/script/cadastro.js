const url = 'https://go-wash-api.onrender.com/api/user'
async function cadastro(){
    let name = document.getElementById('name').value;
    let terms = document.getElementById('terms').checked;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let email = document.getElementById ('email').value;

    /* if (name){
        alert("Olá " + name)
    }else{
        alert("Nome é obrigatório")
    }

    if (terms){
        alert(terms)
    }else{
        alert("Precisa marcar a caixa Termos ")
    }
    
}*/
    let api = await fetch(url,{
        method: "POST", 
        body:JSON.stringify(
            {
                "name":name,
                "email":email,
                "user_type_id":1,
                "password": "123456",
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
                "birthday":"2000-10-12"    
            }
         ),
         headers:{
            'Content-Type': 'application/json'      
         }
    })

    if (api.ok){
        let resposta = await api.json();
        console.log (resposta)

        return;
    }

    console.log("Erro");


}



    if (api.ok){
        let resposta = await api.json();
        console.log (resposta)
        return;
    }
    let respostErrors = await api.json();
    alert (respostErrors.data.errors.cpf_cnpj[0])
    0   
    console.log("erro");
    alert(terms);


    if(name){
        alert(nome);
        }else{
            alert("O nome é obrigatório");
        }

