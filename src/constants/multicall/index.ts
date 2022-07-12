import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
 
  [ChainId.MUMBAI]: '0xc7efb32470dee601959b15f1f923e017c6a918ca',
  [ChainId.MATIC]: "0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD",
  [ChainId.DOEGCHAIN_TESTNET]: "0xE5a02c2Be08406c3fB36F9Aa29bF7C7A09CAe50B"
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
