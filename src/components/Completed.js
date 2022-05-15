import React from 'react';
import done from './assets/Path 2993.png'

function Completed({setOperation}) {
    return (
        <main className='completed-card card'>
            <h2>Transaction Details</h2>
            <div className='status-pending'>
                <img src={done} alt='operation completed'/>
                <p>Status Pending</p>
            </div>
            <p>Tx Hash: <span> 0x10x4133...890x413413</span></p>
            <button className='proceed-btn btn' onClick={()=>setOperation('')}>CLOSE</button>
        </main>
    )
}

export default Completed