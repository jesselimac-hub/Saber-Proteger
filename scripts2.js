// 1. Seleciona o elemento da imagem que será arrastada
const dragItem = document.querySelector('.Eu');

// Variáveis para rastrear o estado de arrasto
let active = false; 
let currentX;       
let currentY;       
let initialX;       
let initialY;       
let xOffset = 0;    
let yOffset = 0;    

// 🔴 2. CARREGAR POSIÇÃO SALVA (EXECUTADO NO INÍCIO)
const savedX = localStorage.getItem('eu-img-x');
const savedY = localStorage.getItem('eu-img-y');

if (savedX !== null && savedY !== null) {
    // Se há posições salvas, usa elas como ponto de partida
    xOffset = parseInt(savedX);
    yOffset = parseInt(savedY);
    
    // Move a imagem para a posição salva IMEDIATAMENTE
    setTranslate(xOffset, yOffset, dragItem); 
}


// 3. Adiciona os 'Listeners' de Evento
dragItem.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);


// 4. Funções de Movimentação

function dragStart(e) {
  e.preventDefault(); 
  
  // Calcula a posição inicial do mouse subtraindo o deslocamento atual da imagem
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === dragItem) {
    active = true; // Ativa o estado de arrasto
    dragItem.style.cursor = 'grabbing'; // Muda o cursor
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false; // Desativa o estado de arrasto
  dragItem.style.cursor = 'grab'; // Volta o cursor

  // 🔴 1. SALVAR NO LOCALSTORAGE (Persistência)
  localStorage.setItem('eu-img-x', xOffset); 
  localStorage.setItem('eu-img-y', yOffset);
}

function drag(e) {
  if (active) {
    e.preventDefault();

    // Calcula o novo deslocamento da imagem
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    // Atualiza o offset
    xOffset = currentX;
    yOffset = currentY;

    // Move a imagem
    setTranslate(currentX, currentY, dragItem);
  }
}

// Função para aplicar a transformação CSS (movimento)
function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}