import React from 'react';
import logo from './assets/Group 374.png';
import logout from './assets/Path 316.png';
import avatar from './assets/Screenshot 2021.png';

function Nav({user,login,setLogin,connectToMetaMask}) {
  

  return (
    <nav className='nav'>
        <div className='nav-logo'>
            <img src={logo} alt='logo'/>
            <span>SOVRYN</span>
        </div>
        <div className='nav-login'>
            {login && <div className='nav-user'>
              <p>{user}</p>
              <img src={avatar} alt=''/>
              </div>}
            <button className={!login?'proceed-btn btn':'proceed-btn btn loged-in'} onClick={
                        ()=>{setLogin(!login)
                        connectToMetaMask()
                        }}>
              {!login?'Engage Wallet':<img src={logout} alt='log out'/>}
            </button>
        </div>
    </nav>
  )
}

export default Nav;