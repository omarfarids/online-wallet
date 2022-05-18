import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import BN from 'bn.js'

import { ERC20ABI } from "./ERC20ABI";
import { useWeb3React } from '@web3-react/core'

const getERC20Contract = (address,web3) =>{
    return web3
      ? new web3.eth.Contract(ERC20ABI, address,{
        from: web3.eth.defaultAccount,
      })
      :null
  }

export function web3BNToFloatString(
    bn,
    divideBy,
    decimals,
    roundingMode = BigNumber.ROUND_DOWN
  ) {
    const converted = new BigNumber(bn.toString())
    const divided = converted.div(divideBy)
    return divided.toFixed(decimals, roundingMode)
  }


export default function useBalance(
  tokenAddress,
  decimals,
) {
  const [balance, setBalance] = useState('0')

  const { account, library } = useWeb3React()

  useEffect(() => {
    let isCancelled = false

    function getBalance() {
      return new Promise((resolve) => {
        if (!library || !tokenAddress) {
          resolve(new BN('0'))
          return
        }

        try {
          if (tokenAddress === 0x0000000000000000000000000000000000000000) {
            library.eth
              .getBalance(account)
              .then((value) => {
                resolve(new BN(value))
              })
              .catch((error) => {
                console.log(error)
                resolve(new BN('0'))
              })
          } else {
            const contract = getERC20Contract(tokenAddress, library)
            contract?.methods
              .balanceOf(account)
              .call()
              .then((value) => {
                resolve(new BN(value))
              })
              .catch((error) => {
                console.log(error)
                resolve(new BN('0'))
              })
          }
        } catch (error) {
          resolve(new BN('0'))
        }
      })
    }

    async function run() {
      const bn = await getBalance()
      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals))
        setBalance(web3BNToFloatString(bn, pow, 4, BigNumber.ROUND_DOWN))
      }
    }

    run()

    return () => {
      isCancelled = true
    }
  }, [tokenAddress, library, decimals, account])

  return [balance]
}