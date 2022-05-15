import React,{useContext} from 'react';
import {AppContext} from '../App';
import send from './assets/Path 2966.png';


function Confirm({amount,currencyType,sendTo,login,setOperation}) {
    const user = useContext(AppContext)

    

    return (
        <main className={!login?'disabled-card confirm-card card':'confirm-card card'}>
            <h2>Review Transaction</h2>
            <div className='confirm-amount'>
                <p>SEND</p>
                <p>{amount} {currencyType}</p>
            </div>
            <div className='confirm-reciepant'>
                <p>from: {user}</p>
                <img src={send} alt='send to'/>
                <p>{sendTo}</p>
                <p>Tx fee:<span>0.0006 rBTC</span></p>
            </div>
            <button disabled={!login} className='submit-btn btn' onClick={()=>setOperation('confirmed')}>CONFIRM</button>
        </main>
    )
}

export default Confirm