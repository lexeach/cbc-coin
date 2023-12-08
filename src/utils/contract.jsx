import IcoContract from '../contracts/ICO.json'
import BepContract from '../contracts/BEP20.json'
import UsdtContract from '../contracts/USDT.json'
const contractCon = async() => {
    const web3 = window.web3;
    if (web3) {
        window.ICO = new web3.eth.Contract(IcoContract.ABI, IcoContract.address);
        window.BEP = new web3.eth.Contract(BepContract.ABI, BepContract.address);
        window.USDT = new web3.eth.Contract(UsdtContract.ABI, UsdtContract.address);
    } else {
        alert('MetaMask not detected, You have to install MataMask to use this web')
    }
};

export default contractCon;