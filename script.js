/* Завдання 1 */
const galleryContainer = document.querySelector('.gallery');
const imagesNodeList = document.querySelectorAll('.gallery .image');
const modalContainer = document.querySelector('.full-image-container');
const modalImage = document.querySelector('.full-image');

const imagesSrcArray = Array.from(imagesNodeList).map(img => img.src);
let currentIndex = -1;

galleryContainer.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'IMG') return;

  const clickedSrc = event.target.src;
  currentIndex = imagesSrcArray.indexOf(clickedSrc);

  openModal(clickedSrc);
});

function openModal(src) {
  modalImage.src = src;
  modalContainer.classList.add('is-open');
  window.addEventListener('keydown', onKeyPress);
}

function closeModal() {
  modalContainer.classList.remove('is-open');
  modalImage.src = '';
  currentIndex = -1;
  window.removeEventListener('keydown', onKeyPress);
}

modalContainer.addEventListener('click', (event) => {
  if (event.target === modalContainer) {
    closeModal();
  }
});

function onKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  } else if (event.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % imagesSrcArray.length;
    modalImage.src = imagesSrcArray[currentIndex];
  } else if (event.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + imagesSrcArray.length) % imagesSrcArray.length;
    modalImage.src = imagesSrcArray[currentIndex];
  }
}


/* Завдання 2 */
const controls = document.querySelector('#controls');
const inputNum = controls.querySelector('input');
const renderBtn = controls.querySelector('[data-action="render"]');
const destroyBtn = controls.querySelector('[data-action="destroy"]');
const boxesContainer = document.querySelector('#boxes');

renderBtn.addEventListener('click', () => {
  const amount = Number(inputNum.value);
  if (amount > 0) {
    createBoxes(amount);
  }
});

destroyBtn.addEventListener('click', destroyBoxes);

function getRandomRgbColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createBoxes(amount) {
  destroyBoxes();

  const fragment = document.createDocumentFragment();
  let size = 30;

  for (let i = 0; i < amount; i += 1) {
    const box = document.createElement('div');
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.backgroundColor = getRandomRgbColor();
    box.style.borderRadius = '4px';

    fragment.appendChild(box);
    size += 10;
  }

  boxesContainer.appendChild(fragment);
}

function destroyBoxes() {
  boxesContainer.innerHTML = '';
}
