const diaMes = document.querySelector(".data")
const nomeDaCidade = document.querySelector('.nomeDaCidade')
const btnBuscar = document.querySelector('.btnBuscar')


const api = {
    key: '184c3be9b1a398180036aec3e37665d2',
    base: 'http://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    units: 'metric'
}
function ConsultarClima(cidade){
    fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`Erro na requisição, status: ${response.status}`)
        }
        return response.json()
    })
    .catch(erro => {
        alert(erro.message)
    })
    .then(resposta => {
        console.log(resposta)
        CarregarDadosNaTela(resposta)
    })
}

function CarregarDadosNaTela(resposta){
    $('.nomeDaCidade').html(`${resposta.name}, ${resposta.sys.country}`)
}

 window.onload = () => {
    ConsultarClima('Belem')
}

function Buscar(){
const inputCidade = document.querySelector(".inputCidade")
    console.log(inputCidade.value)
    ConsultarClima(inputCidade.value)
}