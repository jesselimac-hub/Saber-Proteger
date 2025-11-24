let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let items = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

function setSlider() {
    let itemOld = container.querySelector('.list .item.active')
    if (itemOld) { // Adicionada verificação de segurança
        itemOld.classList.remove('active')
    }

    let dotsOld = indicator.querySelector('ul li.active')
    if (dotsOld) { // Adicionada verificação de segurança
        dotsOld.classList.remove('active')
    }

    indicator.querySelector('.number').innerHTML = String(active + 1).padStart(2, '0');
    // REMOVIDO O '}' EXTRA QUE CAUSAVA ERRO
}

nextButton.onclick = () => {
    active = active + 1 > lastPosition ? 0 : active + 1

    setSlider()

    items[active].classList.add('active')
    dots[active].classList.add('active')
}

prevButton.onclick = () => {
    active = active - 1 < firstPosition ? lastPosition : active - 1

    setSlider()

    items[active].classList.add('active')
    dots[active].classList.add('active')
}

document.querySelectorAll('.information').forEach(link => {
    link.addEventListener('click', function (event) {
        // AQUI O STOPPROPAGATION AINDA É ESSENCIAL
        // Ele impede que o clique no link (<a>) seja interpretado
        // como um clique no slide (div.item), que mudaria o carrossel.
        event.stopPropagation();
    });
});