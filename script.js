let nome = prompt('Digite seu nome de usuário')
let nomePessoa = { name: nome }
console.log(nomePessoa)
let participantes = {
    from: nomePessoa.name,
    to: "Todos",
    text: "entra na sala...",
    type: "status"
}
let arr = []

function mandarMensagem() {

    
    let input = document.querySelector('.escrever').value
    
    let participantes = {
        from: nomePessoa.name,
        to: "Todos",
        text: input,
        type: "message"
    }
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', participantes)
    promessa.then(inutil)
    promessa.catch(tratarErro)
    document.querySelector('.escrever').value = ""

}

function online(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomePessoa)
    promessa.then(inutil)
}


function seEstiverPresente(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomePessoa)
    promessa.then(inutil)
}


function inutil(resposta) {
    console.log(resposta)
}
online()

function pegarMensagem() {
    let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(pessoaEntrou)
}
pegarMensagem()


setInterval(pegarMensagem, 3000)

setInterval(seEstiverPresente, 5000)


function pessoaEntrou(response) {
    arr = response.data
    console.log(arr[1].from)
    let chegadaPessoa = document.querySelector('ul')

    for (i = 0; i < arr.length; i++) {

        if (i === 0) {
            chegadaPessoa.innerHTML = ""
        }
        
        let mensagem = `<li>
        <div class="${arr[i].type}" id="mensagem${i}">
        <p> 
        <span class="hora">${arr[i].time}</span> <span class="nome">${arr[i].from}</span ><span class="type">${arr[i].text}</span>
        </p>
        
        </div>
    </li>`


        chegadaPessoa.innerHTML += mensagem
        const men = document.getElementById(`mensagem${i}`)
        men.scrollIntoView()
    }
}


function tratarErro(erro){
    
        while(erro === 400){
            alert("Esse usuário ja existe digite outro")
        }
}