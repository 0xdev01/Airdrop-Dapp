const contractAddress = "0xdFB7eCcb463DEA6845C7aba4E7dE4A59B9378aEF"; //Сюда адрес контракта
const contractABI = [{"inputs":[{"internalType":"address","name":"erc20Token","type":"address"},{"internalType":"address[]","name":"arrayAddresses","type":"address[]"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"airdropToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
let contract;
let signer;
  
const provider = new ethers.providers.Web3Provider(window.ethereum);


// to connect web3 wallet
const connectWallet = async () => {
    const { ethereum } = window;
    if (ethereum.isMetaMask) {
    //  provider = new ethers.providers.Web3Provider(ethereum);
    //  const accounts = await provider.send("eth_requestAccounts", []);
    provider.send("eth_requestAccounts", []).then(() => {
      provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
      });
    });
    } else {
      setMsg("Please, Install MetaMask");
    }
};
// airdrop method
  async function airdrop() {
    const tokenAddress = document.getElementById("inputTokenAddress").value;
    console.log(tokenAddress);
    const amount = document.getElementById("inputAmount").value;
    console.log(amount);
    const listOfAddresses = document.getElementById("inputListOfAddresses").value;
    console.log(listOfAddresses);
    const addressesArray = listOfAddresses.split(' ');
    console.log(addressesArray);
    // airdrop trx
    const setAirdropPromise = contract.airdropToken(tokenAddress,addressesArray,amount);
    await setAirdropPromise;
  }

