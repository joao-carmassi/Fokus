const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longobt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imagemBotaoPlay = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const play = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const beep = new Audio('/sons/beep.mp3');

const musicaFocoImput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

let intervaloId = null;

let tempoDecorridoEmSegundos = 1500;

musicaFocoImput.addEventListener('change', function () {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarAtributo('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarAtributo('descanso-curto');
    curtoBt.classList.add('active');
})

longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarAtributo('descanso-longo');
    longobt.classList.add('active');
})

function alterarAtributo(contexto) {
    mostraTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa.</strong>`
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play();
        alert('Tempo Finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostraTempo();
}

startPauseBt.addEventListener('click', iniciar);

function iniciar() {
    if (intervaloId) {
        pause.play();
        zerar();
        iniciarOuPausarBt.innerHTML = 'Continuar';
        imagemBotaoPlay.setAttribute('src', '/imagens/play_arrow.png')
        return;
    }

    iniciarOuPausarBt.innerHTML = 'Pausar';
    imagemBotaoPlay.setAttribute('src', '/imagens/pause.png');
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostraTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostraTempo();