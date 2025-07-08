import { createWalletClient, custom, createPublicClient } from "https://esm.sh/viem"

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmountInput");

let walletClient

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        await walletClient.requestAddresses();
        connectButton.innerHTML = "Wallet Connected"
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}


connectButton.onclick = connect();
