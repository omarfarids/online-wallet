import Nav from "./components/Nav";
import Main from './components/Main';
import {useState, createContext} from 'react';
import './components/styles/style.css';
import {ethers} from 'ethers';
import useBalance from "./components/useBalance";


const tokenAddress = '0xB626049946467c1D54a8B4740BD43cc5cdb2A6aa';

export const AppContext = createContext()

function App() {
  const [operation , setOperation] = useState('')
  const [login , setLogin] = useState(false);
  const [user , setUser] = useState('')
  const [userBalance,setUserBalance] = useState(0);
  
  const [balance] = useBalance(tokenAddress,0)
  const [weenusBalance] = useState(balance || 0);


  const connectToMetaMask = () =>{
    if(window.ethereum){
      window.ethereum.request({method : 'eth_requestAccounts'})
      .then(result => {
        accountChangeHandler(result[0]);
      })
    } else {
      console.log('error')
    }
  }


  const accountChangeHandler = (newAccount) =>{
    setUser(newAccount);
    getUserBalance(newAccount);
  }

 
  const getUserBalance = (address) =>{
    window.ethereum.request({method : 'eth_getBalance',params: [address, 'latest']})
    .then(balance=>{
      setUserBalance(ethers.utils.formatEther(balance))
    })
  }
  
  window.ethereum.on('accountsChanged', accountChangeHandler);

  


  return (
    <AppContext.Provider value={user}>
      <div className="App">
        <Nav connectToMetaMask={connectToMetaMask} user={user} login={login} setLogin={setLogin}/>
        <Main weenusBalance={weenusBalance} userBalance={userBalance} operation={operation} setOperation={setOperation} login={login}/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
