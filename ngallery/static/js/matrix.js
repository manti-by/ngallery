"use strict"

function draw(matrix, control, drops) {
  let font_size = 10,
    characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")

  // Black BG for the canvas translucent BG to show trail
  control.fillStyle = "rgba(0, 0, 0, 0.04)"
  control.fillRect(0, 0, matrix.width, matrix.height)

  // Cyan text
  control.fillStyle = "#f4427d"
  control.font = font_size + "px arial"

  // Looping over drops
  for (let i = 0; i < drops.length; i++) {
    // C random character to print
    let text = characters[Math.floor(Math.random() * characters.length)];

    // x = i * font_size, y = value of drops[i] * font_size
    control.fillText(text, i * font_size, drops[i] * font_size);

    // Sending the drop back to the top randomly after it has crossed the screen,
    // adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > matrix.height && Math.random() > 0.975) drops[i] = 0;

    // Incrementing Y coordinate
    drops[i]++;
  }
}

function runMatrix() {
  let matrix = document.getElementById("matrix"),
    control = matrix.getContext("2d")

  // Make the canvas full screen
  matrix.height = window.innerHeight;
  matrix.width = window.innerWidth;

  // x below is the x coordinate
  // 1 = y coordinate of the drop (same for every drop initially)
  let drops = []
  for (let x = 0; x < matrix.width / 10; x++) drops[x] = 1

  setInterval(() => {
    draw(matrix, control, drops)
  }, 50)
}

document.addEventListener("DOMContentLoaded", (event) => {
  runMatrix()
})