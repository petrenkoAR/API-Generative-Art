const button = document.querySelector(".but")
let container, frame, shapes = ['flower', 'plant', 'rainbow', 'ribbon', 'thing'], key = [0, 1, 2, 3, 4], palette

function shapesRandom() {
  let a
  let b
  for (var i = 0; i < 5; i++) {
    a = key[i]
    b = Math.floor(Math.random() * 5)
    key.splice(i, 1, key[b])
    key[b] = a
  }
  palette = Math.floor(Math.random() * 5) + 1
}

function randomSize(n) {
  let max = n * 1.2;
  let min = n * 0.6;
  return Math.floor(Math.random() * (max - min) + min)
}

function randomPositionLeft(max, shapeSize, i) {
  let position
  let min
  console.log(i);

  if (i == 1 || i == 4) {
    min = Math.floor(shapeSize / -2)
    console.log('Min 1',min)
    max = Math.floor((max / 3) - Math.abs(min))
    console.log('Max 1', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (i == 2 || i == 5) {
    min = Math.floor(max / 2)
    console.log('Min 2', min)
    max = Math.floor(max - Math.abs(min))
    console.log('Max 2', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (i == 3) {
    min = Math.floor(max / 4)
    console.log('Min 3',min)
    max = Math.floor(max / 3)
    console.log('Max 3', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(position);
  return position
}

function randomPositionTop(max, shapeSize, i) {
  let position
  let min
  console.log(i);

  if (i == 1 || i == 2) {
    min = Math.floor(shapeSize / -2)
    console.log('Min 1',min)
    max = Math.floor((max / 3) - Math.abs(min))
    console.log('Max 1', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (i == 4 || i == 5) {
    min = Math.floor(max / 2)
    console.log('Min 2', min)
    max = Math.floor(max * 0.75)
    console.log('Max 2', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (i == 3) {
    min = Math.floor(max / 4)
    console.log('Min 3',min)
    max = Math.floor(max / 3)
    console.log('Max 3', max);
    min = Math.ceil(min);
    max = Math.floor(max);
    position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(position);
  return position
}

function randomShapeEl() {

}

function generateShape(frame, i) {
  const shape = document.createElement('img');

  let color

  let n = key[i-1]
  n = './images/' + shapes[n] + ' ' + palette + i + '.svg';

  shape.setAttribute('src', n)

  shape.classList.add('shape')

  let size = randomSize(frame.clientWidth)

  shape.style.width = [size, 'px'].join('')
  shape.style.height = [size, 'px'].join('')

  frame.appendChild(shape)

  shape.style.transform = ['rotate(' + (Math.floor(Math.random() * (90 - 15 + 1) + 15)) + 'deg)'].join('')

  let top = randomPositionTop(frame.clientHeight, shape.clientHeight, i)
  let left = randomPositionLeft(frame.clientWidth, shape.clientWidth, i)

  shape.style.top = [top, 'px'].join('')
  shape.style.left = [left, 'px'].join('')

}

 function generate(n){
  frame.innerHTML = '';
  shapesRandom()
  console.log(key);
  console.log(shapes);
  console.log(palette);
  for (var i = 0; i < 5; i++) {
    generateShape(frame, n);
    n++
  }
}

document.addEventListener('DOMContentLoaded', () => {
  container = document.getElementsByClassName('main')[0]
  frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  let n = 1
  generate(n)
})
