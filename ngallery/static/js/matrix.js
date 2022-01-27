"use strict"

class Matrix {
  interval = 50
  font_size = 10
  font_color = "#f4427d"
  bg_color =  "rgba(0, 0, 0, 0.04)"
  characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")

  constructor (container) {
    this.container = container
    this.control = container.getContext("2d")

    // Make the canvas full screen
    this.container.height = window.innerHeight
    this.container.width = window.innerWidth

    // x below is the x coordinate
    // 1 = y coordinate of the drop (same for every drop initially)
    this.drops = []
    for (let x = 0; x < this.container.width / 10; x++) this.drops[x] = 1
  }

  draw() {
    // Black BG for the canvas translucent BG to show trail
    this.control.fillStyle = this.bg_color
    this.control.fillRect(0, 0, this.container.width, this.container.height)

    // Cyan text
    this.control.fillStyle = this.font_color
    this.control.font = this.font_size + "px arial"

    // Looping over drops
    for (let i = 0; i < this.drops.length; i++) {
      // C random character to print
      let text = this.characters[Math.floor(Math.random() * this.characters.length)]

      // x = i * font_size, y = value of drops[i] * font_size
      this.control.fillText(text, i * this.font_size, this.drops[i] * this.font_size)

      // Sending the drop back to the top randomly after it has crossed the screen,
      // adding a randomness to the reset to make the drops scattered on the Y axis
      if (this.drops[i] * this.font_size > this.container.height && Math.random() > 0.975) this.drops[i] = 0

      // Incrementing Y coordinate
      this.drops[i]++
    }
  }

  run() {
    setInterval(() => this.draw(), this.interval)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let matrix = new Matrix(document.getElementById("matrix"))
  matrix.run()
})