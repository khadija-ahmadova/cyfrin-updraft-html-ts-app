import { createWalletClient, custom, createPublicClient } from "https://esm.sh/viem"

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmountInput");

let walletClient
let publicClient

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

async function fund() {
    const ethAmount = ethAmountInput.value
    console.log("Funding with ${ethAmount} ...")

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        await walletClient.requestAddresses();
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        await publicClient.simulateContract({
            address: '',
            // abi: ,
            functionName: 'fund',
            account,
        })
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

fundButton.onclick = fund();
connectButton.onclick = connect();
