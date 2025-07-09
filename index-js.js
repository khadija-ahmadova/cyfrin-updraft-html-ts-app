import { createWalletClient, custom, createPublicClient, parseEther, formatEther, defineChain } from "https://esm.sh/viem"
import { contractAddress, abi } from "./constants-js.js"

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");

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

        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: 'fund',
            account: connectedAccount,
            chain: currentChain,
            value: parseEther(ethAmount),

        });

        const hash = await walletClient.writeContract(request);
        console.log(hash);

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

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        const balance = await publicClient.getBalance({
            address: contractAddress
        });
        console.log(formatEther(balance));
    } else {
        connectButton.innerHTML = "Please install MetaMask"
    }
}

async function withdraw() {
    console.log("Withdrawing funds...");

    if (typeof window.ethereum !== "undefined") {
        try {
            walletClient = createWalletClient({
                transport: custom(window.ethereum),
            })
            publicClient = createPublicClient({
                transport: custom(window.ethereum),
            })
            const [account] = await walletClient.requestAddresses()
            const currentChain = await getCurrentChain(walletClient)

            console.log("Processing txn...")
            const { request } = await publicClient.simulateContract({
                account,
                address: contractAddress,
                abi,
                functionName: "withdraw",
                chain: currentChain,
            })
            const hash = await walletClient.writeContract(request)
            console.log("Txn processed: ", hash)
        } catch (error) {
            console.log(error)
        }
    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
    }
}

fundButton.onclick = fund;
connectButton.onclick = connect;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;
