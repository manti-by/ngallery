"use strict"


class Wallet {

  constructor() {
    this.container = document.getElementById("wallet")
    this.button = document.getElementById("connect")

    this.button.addEventListener("click", (event) => {
      event.preventDefault()

      this.connect().then((response) => {
        if (response) {
          this.upsertWallet({public_key: response.publicKey.toString()})
        }
        this.render("Solana object not found! Get a Phantom Wallet 👻 first", true)
      })
    })
  }

  async connect() {
    const { solana } = window
    if (solana && solana.isPhantom) {
        return await solana.connect()
    }
  }

  upsertWallet(data) {
    window.api.upsertWallet(data, () => {
      window.publicKey = data.publicKey
      this.container.className = "d-none"
    }, () => {
      this.render("Can't connect your wallet, try again later", true)
    })
  }

  render(content, isError) {
    this.container.innerHTML = content
    if (isError) this.container.className = "alert alert-danger mb-3"
    else this.container.className = "mb-3"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.wallet = new Wallet()
})