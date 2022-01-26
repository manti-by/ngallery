const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana.isPhantom) {
      console.log("Phantom wallet found!");

      const response = await solana.connect();
      console.log("Connected with Public Key:", response.publicKey.toString());
    } else {
      console.error("Solana object not found! Get a Phantom Wallet 👻")
    }
  } catch (error) {
    console.error(error)
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const onClick = async () => {
    await checkIfWalletIsConnected();
  };
  document.getElementById("check").addEventListener("click", onClick);
})