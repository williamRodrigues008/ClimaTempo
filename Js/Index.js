const diaMes = document.querySelector(".data")

const api = {
    key: '184c3be9b1a398180036aec3e37665d2',
    base: 'http://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    units: 'metric'
}
function ConsultarClima(cidade) {
    fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
        .then(response => {
            if (!response.ok) {
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

function CarregarDadosNaTela(resposta) {
    var data = new Date()
    var temperatura = Math.round(resposta.main.temp)
    var hora = Math.round(data.getHours())

    AplicarIconeDeAcordoComTemperatura(temperatura, hora)

    $('.nomeDaCidade').html(`${resposta.name}, ${resposta.sys.country}`)
    $('.data').html(MontarData(data))
    $('.descricaoClima').html(resposta.weather[0].description)

    $('.clima').html(temperatura)
}

window.onload = () => {
    ConsultarClima('Belem')
}

function Buscar(data) {
    const inputCidade = document.querySelector(".inputCidade")
    console.log(inputCidade.value)
    ConsultarClima(inputCidade.value)
}

function MontarData(data) {
    var diaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quantar-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abrill', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    var dia = diaSemana[data.getDay()]
    var mes = meses[data.getMonth()]
    var ano = data.getFullYear()

    var dataCompleta = `${dia}, ${data.getDate()} ${mes} ${ano}`

    return dataCompleta
}

function AplicarIconeDeAcordoComTemperatura(temperatura, hora){
    var dadosDoClima = document.getElementsByClassName('dadosDoClima')

    if (temperatura >= 31) {
        if (hora > 17 || hora < 5){
            $('.icone').html('<i class="fa-regular fa-sun">')
        }
        else{
            $('.icone').html('<i class="fa-solid fa-moon"></i>')
        }
        document.getElementById('dadosDoClima').style.backgroundImage = 'linear-gradient(to top, #fff, rgba(255, 187, 0, 0.918))'

    }
    else if (temperatura >= 20 && temperatura <= 30) {
        document.getElementById('dadosDoClima').style.backgroundImage = 'linear-gradient(to top, #fff, rgb(255, 237, 157))'
        if (hora > 17 || hora < 5) {
            $('.icone').html('<i class="fa-solid fa-cloud-moon"></i>')
        } else {
            $('.icone').html('<i class="fa-solid fa-cloud-sun"></i>')

        }
    }
    else if (temperatura >= 10 && temperatura <= 19) {
        $('.icone').html('<i class="fa-solid fa-cloud"></i>')
        document.getElementById('dadosDoClima').style.backgroundImage = 'linear-gradient(to top, #fff, rgb(134, 227, 255))'
    }
    else if(temperatura < 10){
        document.getElementById('dadosDoClima').style.backgroundImage = 'linear-gradient(to top, #fff, rgba(210, 248, 255, 0.918))'
        $('.icone').html('<i class="fa-solid fa-snowflake"></i>')
    }
}