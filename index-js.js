import { createWalletClient, custom, createPublicClient, parseEther, defineChain } from "https://esm.sh/viem"
import { contractAddress, abi } from "./constants-js.js"

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");

let walletClient
let publicClient

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        try {
            const accounts = await walletClient.requestAddresses();

            if (accounts.length > 0) {
                connectButton.innerHTML = "Wallet Connected";
            } else {
                connectButton.innerHTML = "Connection Failed";
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            connectButton.innerHTML = "Connection Error";
        }
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function fund() {
    const ethAmount = ethAmountInput.value;
    console.log(`Funding with ${ethAmount}...`)

    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

        const [connectedAccount] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });

        await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: 'fund',
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),

        })
    } else {
        connectButton.innerHTML = "Please install MetaMask";
    }
}

async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    })
    return currentChain
}

fundButton.onclick = fund;
connectButton.onclick = connect;
