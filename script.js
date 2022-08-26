let nomePessoa = { name: prompt('Digite seu nome de usuário') }
console.log(nomePessoa)
let arr = []

function entrouNaSala() {
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomePessoa)
    promessa.then(pegarNome)
}
entrouNaSala()

function pegarNome(resposta) {

    let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    promessa.then(pessoaEntrou)
}









function pessoaEntrou(response) {
    arr = response.data
    console.log(arr)
    let chegadaPessoa = document.querySelector('.mensagem-cinza')

    for (i = 0; i < arr.length; i++) {
        if (arr[i].name === nomePessoa.name) {
            chegadaPessoa.innerHTML += `
        ${arr[i].name}
        `
        }
    }
}
//criar outra função para colocar na tela