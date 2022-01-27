"use strict"

class Api {
  getImages(on_success, on_error) {
    fetch("/api/images/", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      async: true,
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          on_success(data)
        })
        return
      }
      on_error(response)
    })
  }

  upsertWallet(data, on_success, on_error) {
    fetch("/api/wallets/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
      async: true,
    }).then(response => {
      if (response.status === 201) {
        on_success()
        return
      }
      on_error(response)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.api = new Api()
})