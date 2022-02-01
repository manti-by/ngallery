"use strict"

class Api {
  getImages(format, on_success, on_error) {
    fetch("/api/images/?format=" + format, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      async: true,
    }).then(response => {
      if (response.status === 200) {
        if (format === "json") response.json().then(on_success)
        else response.text().then(on_success)
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