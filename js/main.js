const btn = document.querySelector('.btn');

const apiKey = '3dd7035db50d62002af61946ea17d8e0'
let lat = 0, lon = 0, city
let weather = {
 main: '0',
 clouds: 0,
 wind: 0
}

const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

const tileCount = 120;
const noiseScale = 0.05;

let grid;
let xnoise;
let ynoise;
let t = 0;


function getLocation() {
  let formData = new FormData();
  let requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=' + apiKey;
  let request = new Request(requestURL);

  fetch(request)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    lat = data[0].lat
    lon = data[0].lon
  })
  }

function getWeather() {
  let formData = new FormData();
  let requestURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';
  let request = new Request(requestURL);

  fetch(request)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    weather.main = data.weather[0].main;
    weather.clouds = data.clouds.all;
    weather.wind = data.wind.speed;
  })
}

btn.addEventListener('mousemove', function(event){
   city = document.getElementsByTagName("input")[0].value
   getLocation()
   getWeather()
})

btn.addEventListener('click', function(event){
  let paragraph = document.querySelector('p');
  paragraph.textContent = city;
  let input = document.querySelector('input');
  input.value = 'Где-то';
  console.log('Button clicked');
  console.log(city)
  console.log(lat, lon)
  console.log(weather)
  t = 0;
  draw()
})

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
}

function draw() {
  background(150, 180, 255);
  createGrid();
  showGrid();
  t += (weather.wind / 200);// скорость
}

function createGrid() {
  grid = [];
  let tileSize = canvasWidth / tileCount;
  ynoise = t;
  for (let row = 0; row < tileCount; row++) {
    grid[row] = [];
    xnoise = t;
    for (let col = 0; col < tileCount; col++) {
      let x = col * tileSize;
      let y = row * tileSize;
      let a = noise(xnoise, ynoise) * ((weather.clouds*5)+100);
      grid[row][col] = new Tile(x, y, tileSize, a);
      xnoise += noiseScale;
    }
    ynoise += noiseScale;
    console.log(ynoise);
  }
}

function showGrid() {
  for (let row = 0; row < tileCount; row++) {
    for (let col = 0; col < tileCount; col++) {
      grid[row][col].show();
    }
  }
}

class Tile {
  constructor(x, y, size, a) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = color(255, a);
  }

  show() {
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.size, this.size);
  }
}
