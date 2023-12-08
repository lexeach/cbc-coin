import Web3 from 'web3';

// Function to initialize Web3
const initWeb3 = async() => {
    if (window.ethereum) {
        // Modern dapp browsers
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access
            console.error('User denied account access');
        }
    } else if (window.web3) {
        // Legacy dapp browsers
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        // Non-dapp browsers
        console.error('MetaMask not detected!');
        alert('MetaMask not detected, You have to install MataMask to use this web')
    }
};

export default initWeb3;