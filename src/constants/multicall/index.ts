import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
 
  [ChainId.MUMBAI]: '0xf6ad3ccf71abb3e12becf6b3d2a74c963859adcd',//TODO: CHANGE THIS
  [ChainId.MATIC]: "0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD"
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
