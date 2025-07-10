## HTML JS website

A minimal HTML/JS site. It has buttons which map to a solidity smart contract.

Codebase with the smart contract can be found here:
https://github.com/Cyfrin/foundry-fund-me-cu


### Setup

#### Requirements
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [MetaMask](https://metamask.io/)
- [anvil](https://getfoundry.sh/anvil/overview)

#### Quickstart
1. Clone the repository
    ```
    git clone https://github.com/khadija-ahmadova/cyfrin-updraft-html-ts-app
    cd cyfrin-updraft-html-ts-app
    ```
2. To load the local blockchain with already deployed smart contract run
    ```
    anvil --load-state fundme-anvil.json
    ```
3. Import one of the anvil private keys into your MetaMask
4. Add the anvil chain to your MetaMask
5. Run the index.html file

Now you can connect your wallet, fund the smart contract, check the balance of the smart contract, and withdraw your funds.