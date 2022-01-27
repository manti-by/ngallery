const init = async () => {
  let content = document.getElementById("content")

  try {
    const { solana } = window

    if (solana.isPhantom) {
      const response = await solana.connect();

      window.api.upsertWallet({public_key: response.publicKey.toString()}, () => {
        window.api.getImages((data) => {
          let result = "<div class='row'>"
          for (let i in data) {
            result += "<div class='col-3'><img src='" + data[i]["source"] + "' class='img-fluid img-thumbnail'></div>"
          }
          result += "</div>"
          content.innerHTML = result
        }, () => {})
      }, () => {
        content.innerHTML = "Can't save your wallet, try again later"
      })
    } else {
      content.innerHTML = "Solana object not found! Get a Phantom Wallet 👻"
    }
  } catch (error) {
    content.innerHTML = error
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const onClick = async () => {
    await init();
  };
  document.getElementById("check").addEventListener("click", onClick);
})