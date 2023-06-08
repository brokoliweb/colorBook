let img
let grid
let colors = {}

function preload() {
  img = loadImage('images/02.jpg')
}

function setup() {
  createCanvas(img.width, img.height)
  pixelDensity(1)
  img.loadPixels()
  grid = createPixelGrid(img.width, img.height)
  assignPixelNumbers(grid)
  noStroke()
  strokeWeight(0.4)
  noFill()
  rect(0, 0, width, height)
  displayPixelGrid(grid)
}

function createPixelGrid(width, height) {
  let pixelSize = 5
  let cols = width / pixelSize
  let rows = height / pixelSize
  let grid = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * pixelSize
      let y = i * pixelSize
      let pixel = {
        x: x,
        y: y,
        size: pixelSize,
        number: 0,
        color: [255, 255, 255],
      }
      grid.push(pixel)
    }
  }
  return grid
}

function assignPixelNumbers(grid) {
  let colorIndex = 1
  for (let i = 0; i < grid.length; i++) {
    let pixel = grid[i]
    let c = img.get(pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)
    let cString = c.toString()
    if (!(cString in colors)) {
      colors[cString] = colorIndex
      colorIndex++
    }
    pixel.color = c
    pixel.number = colors[cString]
  }
}

function displayPixelGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    let pixel = grid[i]
    stroke(255)
    rect(pixel.x, pixel.y, pixel.size, pixel.size)
    fill(0)
    textSize(pixel.size * 0.8)
    textAlign(CENTER, CENTER)
    text(pixel.number, pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)
  }
}

function colorize() {
  for (let i = 0; i < grid.length; i++) {
    let pixel = grid[i]
    pixel.color = img.get(pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)
    pixel.number = 0
    fill(pixel.color)
    rect(pixel.x, pixel.y, pixel.size, pixel.size)
  }
}

function mouseMoved() {
  for (let i = 0; i < grid.length; i++) {
    let pixel = grid[i]
    if (
      mouseX > pixel.x &&
      mouseX < pixel.x + pixel.size &&
      mouseY > pixel.y &&
      mouseY < pixel.y + pixel.size
    ) {
      if (pixel.number !== 0) {
        // check if the pixel has a number assigned
        fill(pixel.color)
        rect(pixel.x, pixel.y, pixel.size, pixel.size)
        pixel.color = [255, 255, 255]
        pixel.number = 0
        break
      }
    }
  }
}
