import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, walletconnect } from '../connectors'

export const ROUTER_ADDRESS = '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff'; //'0x6207A65a8bbc87dD02C3109D2c74a6bCE4af1C8c';//

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'


// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MATIC, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MATIC, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USDC')
export const USDT = new Token(ChainId.MATIC, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MATIC, '0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c', 18, 'COMP', 'Compound')
export const EASY = new Token(ChainId.MATIC, '0xDb3b3b147A030F032633f6C4BEBf9a2fB5a882B5', 18, 'EASY', 'EASY')
export const eUSDC = new Token(ChainId.MATIC, '0x4eBdE54ba404bE158262EDe801744b92b9878c61', 18, 'eUSDC', 'Easy USDC')
export const eUSDT = new Token(ChainId.MATIC, '0xfc39742Fe9420a7Af23757Fc7E78D1c3AE4A9474', 18, 'eUSDT', 'Easy USDT')
export const eDAI = new Token(ChainId.MATIC, '0xa1C09C8F4f5D03fcC27b456475d53d988e98D7C5', 18, 'eDAI', 'Easy DAI')
export const UNITOKEN = new Token(ChainId.MATIC, '0xb33EaAd8d922B1083446DC23f610c2567fB5180f', 18, 'UNI', 'Uniswap')
//export const TT01 = new Token(ChainId.MATIC, '0x55BeE1bD3Eb9986f6d2d963278de09eE92a3eF1D', 18, 'TT01', 'Test Token 01')
//export const TT02 = new Token(ChainId.MATIC, '0xF6Ad3CcF71Abb3E12beCf6b3D2a74C963859ADCd', 18, 'TT01', 'Test Token 02')
export const ETHER = new Token(ChainId.MATIC, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'ETH', 'Ether')
export const QUICK = new Token(ChainId.MATIC, '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', 18, 'QUICK', 'QuickSwap')
export const WBTC  = new Token(ChainId.MATIC, '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', 18, 'wBTC', 'Wrapped Bitcoin')
export const IGG  = new Token(ChainId.MATIC, '0xe6FC6C7CB6d2c31b359A49A33eF08aB87F4dE7CE', 18, 'IGG', 'IG Gold')
export const OM  = new Token(ChainId.MATIC, '0xC3Ec80343D2bae2F8E680FDADDe7C17E71E114ea', 18, 'OM', 'OM Mantra DAO')
export const GHST  = new Token(ChainId.MATIC, '0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7', 18, 'GHST', 'Aavegotchi GHST Token')
export const MAUSDC  = new Token(ChainId.MATIC, '0x9719d867A500Ef117cC201206B8ab51e794d3F82', 6, 'maUSDC', 'Matic Aave interest bearing USDC')
export const MADAI  = new Token(ChainId.MATIC, '0xE0b22E0037B130A9F56bBb537684E6fA18192341', 18, 'maDAI', 'Matic Aave interest bearing DAI')
export const SWG  = new Token(ChainId.MATIC, '0x043a3aa319b563ac25d4e342d32bffb51298db7b', 18, 'SWG', 'Swirge')
export const RBAL  = new Token(ChainId.MATIC, '0x03247a4368A280bEc8133300cD930A3a61d604f6', 18, 'RBAL', 'Rebalance Token')
export const DG  = new Token(ChainId.MATIC, '0x2a93172c8DCCbfBC60a39d56183B7279a2F647b4', 18, '$DG', 'decentral.games')
export const SX  = new Token(ChainId.MATIC, '0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79', 18, 'SX', 'SportX')
export const WRX  = new Token(ChainId.MATIC, '0x72d6066F486bd0052eefB9114B66ae40e0A6031a', 8, 'WRX', 'WazirX')
export const MUST  = new Token(ChainId.MATIC, '0x9C78EE466D6Cb57A4d01Fd887D2b5dFb2D46288f', 18, 'MUST', 'Must')
export const FRAX  = new Token(ChainId.MATIC, '0x104592a158490a9228070E0A8e5343B499e125D0', 18, 'FRAX', 'FRAX')
export const FXS  = new Token(ChainId.MATIC, '0x3e121107F6F22DA4911079845a470757aF4e1A1b', 18, 'FXS', 'Frax Shares')
export const MAWETH  = new Token(ChainId.MATIC, '0x20D3922b4a1A8560E1aC99FBA4faDe0c849e2142', 18, 'maWETH', 'Matic Aave interest bearing WETH')
export const MAAAVE  = new Token(ChainId.MATIC, '0x823CD4264C1b951C9209aD0DeAea9988fE8429bF', 18, 'maAAVE', 'Matic Aave interest bearing AAVE')
export const MALINK  = new Token(ChainId.MATIC, '0x98ea609569bD25119707451eF982b90E3eb719cD', 18, 'maLINK', 'Matic Aave interest bearing LINK')
export const MAUSDT  = new Token(ChainId.MATIC, '0xDAE5F1590db13E3B40423B5b5c5fbf175515910b', 6, 'maUSDT', 'Matic Aave interest bearing USDT')
export const MATUSD  = new Token(ChainId.MATIC, '0xF4b8888427b00d7caf21654408B7CBA2eCf4EbD9', 18, 'maTUSD', 'Matic Aave interest bearing TUSD')
export const MAUNI  = new Token(ChainId.MATIC, '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498', 18, 'maUNI', 'Matic Aave interest bearing UNI')
export const MAYFI  = new Token(ChainId.MATIC, '0xe20f7d1f0eC39C4d5DB01f53554F2EF54c71f613', 18, 'maYFI', 'Matic Aave interest bearing YFI')
export const MRBAL  = new Token(ChainId.MATIC, '0x66768ad00746aC4d68ded9f64886d55d5243f5Ec', 18, 'mRBAL', 'Matic Rebalance Token')
export const GAME  = new Token(ChainId.MATIC, '0x8d1566569d5b695d44a9a234540f68D393cDC40D', 18, 'GAME', 'GAME Credits')
export const SENT  = new Token(ChainId.MATIC, '0x48e3883233461C2eF4cB3FcF419D6db07fb86CeA', 8, 'SENT', 'Sentinel')
export const ELET  = new Token(ChainId.MATIC, '0x07738Eb4ce8932CA961c815Cb12C9d4ab5Bd0Da4', 18, 'ELET', 'Elementum')
export const HEX  = new Token(ChainId.MATIC, '0x23D29D30e35C5e8D321e1dc9A8a61BFD846D4C5C', 8, 'HEX', 'HEXX')
export const SWAP  = new Token(ChainId.MATIC, '0x3809dcDd5dDe24B37AbE64A5a339784c3323c44F', 18, 'SWAP', 'TrustSwap Token')
export const DB  = new Token(ChainId.MATIC, '0x0e59D50adD2d90f5111aca875baE0a72D95B4762', 18, 'DB', 'Dark.Build')
export const ZUT  = new Token(ChainId.MATIC, '0xe86E8beb7340659DDDCE61727E500e3A5aD75a90', 18, 'ZUT', 'ZeroUtility')

export const UBT  = new Token(ChainId.MATIC, '0x7FBc10850caE055B27039aF31bD258430e714c62', 8, 'UBT', 'Unibright')
export const VISION  = new Token(ChainId.MATIC, '0x034b2090b579228482520c589dbD397c53Fc51cC', 18, 'VISION', 'Vision Token')
export const IFARM  = new Token(ChainId.MATIC, '0xab0b2ddB9C7e440fAc8E140A89c0dbCBf2d7Bbff', 18, 'iFARM', 'iFARM')
export const PPDEX  = new Token(ChainId.MATIC, '0x127984b5E6d5c59f81DACc9F1C8b3Bdc8494572e', 18, 'PPDEX', 'Pepedex')

export const CEL  = new Token(ChainId.MATIC, '0xd85d1e945766fea5eda9103f918bd915fbca63e6', 4, 'CEL', 'Celsius')
export const ARIA20  = new Token(ChainId.MATIC, '0x46F48FbdedAa6F5500993BEDE9539ef85F4BeE8e', 18, 'ARIA20', 'ARIANEE')
export const CFI  = new Token(ChainId.MATIC, '0xeCf8f2FA183b1C4d2A269BF98A54fCe86C812d3e', 18, 'CFI', 'CyberFi Token')
export const DSLA  = new Token(ChainId.MATIC, '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639', 18, 'DSLA', 'DSLA')
export const DRC  = new Token(ChainId.MATIC, '0xFeD16c746CB5BFeD009730f9E3e6A673006105c7', 0, 'DRC', 'Digital Reserve Currency')
export const LINK  = new Token(ChainId.MATIC, '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39', 18, 'LINK', 'Chainlink Token')

export const SUPER  = new Token(ChainId.MATIC, '0xa1428174F516F527fafdD146b883bB4428682737', 18, 'SUPER', 'SuperFarm')
export const XMARK  = new Token(ChainId.MATIC, '0xf153eff70dc0bf3b085134928daeea248d9b30d0', 9, 'xMARK', 'Standard')
export const DEFI5  = new Token(ChainId.MATIC, '0x42435F467D33e5C4146a4E8893976ef12BBCE762', 18, 'DEFI5', 'DEFI Top 5 Tokens Index')
export const AZUKI  = new Token(ChainId.MATIC, '0x7CdC0421469398e0F3aA8890693d86c840Ac8931', 18, 'AZUKI', 'DokiDokiAzuki')
export const HH  = new Token(ChainId.MATIC, '0x521CddC0CBa84F14c69C1E99249F781AA73Ee0BC', 18, 'HH', 'Holyheld')
export const MDEF  = new Token(ChainId.MATIC, '0x82B6205002ecd05e97642D38D61e2cFeaC0E18cE', 9, 'mDEF', 'Matic Deflect Protocol')
export const DMT  = new Token(ChainId.MATIC, '0xd28449BB9bB659725aCcAd52947677ccE3719fD7', 18, 'DMT', 'Dark Matter Token')

export const MATIC = WETH[ChainId.MATIC];
// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'//TODO: MATIC

const UNI_ADDRESS = '0x831753DD7087CaC61aB5644b308642cc1c33Dc13'//TODO: MATIC QUICK

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.MATIC]: new Token(ChainId.MATIC, UNI_ADDRESS, 18, 'QUICK', 'Quickswap'),
  [ChainId.MUMBAI]: new Token(ChainId.MUMBAI, UNI_ADDRESS, 18, 'QUICK', 'Quickswap')
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC]: '0x4087F566796b46eEB01A38174c06E2f9924eAea8'//TODO: MATIC
}

const WETH_ONLY: ChainTokenList = {
  
  [ChainId.MUMBAI]: [WETH[ChainId.MUMBAI]],
  [ChainId.MATIC]: [WETH[ChainId.MATIC]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC],MRBAL, GAME, SENT, ELET, DAI, USDC, USDT, COMP, GHST, QUICK, ETHER, UNITOKEN, EASY, MAUSDC, IGG, WBTC, OM, SWG, MADAI, RBAL, DG, SX, MUST, WRX, FRAX, FXS, MAWETH, MAAAVE, MALINK, MAUSDT, MATUSD, MAUNI, MAYFI, HEX, SWAP, DB, ZUT, UBT, IFARM, VISION, PPDEX, LINK, CEL, ARIA20, CFI, DSLA, DRC,SUPER,XMARK,DEFI5,AZUKI,HH,MDEF, DMT]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], DAI, USDC, USDT,  COMP, GHST, QUICK, ETHER, UNITOKEN, EASY, IGG, WBTC, OM]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], MRBAL, GAME, SENT, ELET, DAI, USDC, USDT, COMP, GHST, QUICK, ETHER, UNITOKEN, EASY, IGG, WBTC, OM, MAUSDC, SWG, MADAI, RBAL, DG, SX, WRX, MUST, FRAX, FXS, MAWETH, MAAAVE, MALINK, MAUSDT, MATUSD, MAUNI, MAYFI, HEX, SWAP, DB, ZUT, UBT, IFARM, VISION, PPDEX, LINK, CEL, ARIA20, CFI, DSLA, DRC,SUPER,XMARK,DEFI5,AZUKI,HH,MDEF, DMT]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MATIC]: [
    
    [USDC, USDT],
    [USDC, GHST],
    [QUICK, GHST],
    [USDC, OM],
    [USDC, DAI],
    [DAI, USDT],
    [ETHER, DAI],
    [ETHER, USDC],
    [UNITOKEN, eUSDC],
    [UNITOKEN, eUSDT],
    [UNITOKEN, eDAI],
    [EASY, USDC],
    [WETH[ChainId.MATIC], USDT],
    [WETH[ChainId.MATIC], USDC],
    [WETH[ChainId.MATIC], USDT],
    [WETH[ChainId.MATIC], DAI],
    [WETH[ChainId.MATIC], eDAI],
    [WETH[ChainId.MATIC], ETHER],
    [WETH[ChainId.MATIC], eUSDC],
    [ETHER, QUICK],
    [UNITOKEN, USDT],
    [QUICK, UNITOKEN]

  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  /**WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }*/
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL = 'https://unpkg.com/quickswap-default-token-list@1.0.45/build/quickswap-default.tokenlist.json'
