import React , { useState, createRef } from 'react';
import eth from './assets/Group 4717.png';
import weenus from './assets/Path 2998.png';
import Confirm from './Confirm';
import Completed from './Completed';


function Main({operation,setOperation,login,userBalance,weenusBalance}) {
  const [amount , setAmount] = useState(0);
  const [sendTo , setSendTo] = useState('');
  const [currencyType , setCurrencyType] = useState('WEENUS')

  const active1 = createRef(null)
  const active2 = createRef(null)
  const active3 = createRef(null)
  const active4 = createRef(null)
  const active5 = createRef(null)
  const addActive = (element) =>{
    active1.current.classList.remove('active');
    active2.current.classList.remove('active');
    active3.current.classList.remove('active');
    active4.current.classList.remove('active');
    active5.current.classList.remove('active');
    element.target.classList.add('active');
  }

  if(operation === 'submitted'){
    return <Confirm login={login} amount={amount} currencyType={currencyType}
    sendTo={sendTo} operation={operation} setOperation={setOperation}/>
  }
  if(operation === 'confirmed'){
    return <Completed setOperation={setOperation}/>
}

  return (
    <main className={!login?'disabled-card submit-card card':'submit-card card'}>
      <h1>SEND</h1>
      <div className='asset'>
        <p className='asset-label label'>Asset:</p>
        <div className='asset-type checkbox'>
          <button className={currencyType==='rETH'?'active':''} onClick={(element)=>setCurrencyType('rETH')}>
            <img src={eth} alt=''/>
            <span>rETH</span>
          </button>
          <button className={currencyType==='WEENUS'?'active':''} onClick={()=>setCurrencyType('WEENUS')}>
            <img src={weenus} alt=''/>
            <span>WEENUS</span>
          </button>
        </div>
        <p className='asset-available'>Available Balance {currencyType==='WEENUS'?weenusBalance + ' WEENUS':userBalance + ' rETH'}</p>
      </div>
      <div className='amount'>
        <p className='amount-label label'>Amount:</p>
        <div className='amount-input'>
          <label>{currencyType === 'WEENUS'?'WEENUS':'rETH'}</label>
          <input type='number' value={amount} onChange={(element)=>setAmount(element.target.value)} />
        </div>
        <div className='amount-type checkbox'>
          <button ref={active1} onClick={(element)=>{
            if(currencyType==='WEENUS'){
              setAmount(weenusBalance * 0.1);
            }else{
              setAmount(userBalance * 0.1)
            }
            addActive(element)
          }}>10%</button>
          <button ref={active2} onClick={(element)=>{
            if(currencyType==='WEENUS'){
              setAmount(weenusBalance * 0.25);
            }else{
              setAmount(userBalance * 0.25)
            }
            addActive(element)
          }}>25%</button>
          <button ref={active3} className='active' onClick={(element)=>{
            if(currencyType==='WEENUS'){
              setAmount(weenusBalance * 0.5);
            }else{
              setAmount(userBalance * 0.5)
            }
            addActive(element)
          }}>50%</button>
          <button ref={active4} onClick={(element)=>{
            if(currencyType==='WEENUS'){
              setAmount(weenusBalance * 0.75);
            }else{
              setAmount(userBalance * 0.75)
            }
            addActive(element)
          }}>75%</button>
          <button ref={active5} onClick={(element)=>{
            if(currencyType==='WEENUS'){
              setAmount(weenusBalance);
            }else{
              setAmount(userBalance)
            }
            addActive(element)
          }}>100%</button>
        </div>
      </div>
      <div className='send'>
        <p className='send-label label'>Send To:</p>
        <input type='text' value={sendTo} onChange={(element)=>setSendTo(element.target.value)} placeholder='Type or Paste address'/>
      </div>
      <button disabled={!login} className='submit-btn btn' onClick={() => setOperation('submitted')}>SUBMIT</button>
    </main>
  )
}

export default Main