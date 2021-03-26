import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@uniswap/sdk'
import { useMemo } from 'react'
import { 
  UNI,
  EASY,
  USDC,
  ETHER,
  eUSDC,
  eUSDT,
  eDAI,
  UNITOKEN,
  QUICK,
  DAI,
  IGG,
  WBTC,
  USDT,
  MATIC,
  OM,
  GHST,
  MAUSDC,
  MAAAVE,
  SX,
  MALINK,
  MAUNI,
  MAYFI,
  MAUSDT,
  MATUSD,
  MADAI,
  MAWETH,
  SWAP,
  DB,
  GAME,
  HEX,
  MRBAL,
  ZUT,
  FRAX,
  IFARM,
  VISION,
  PPDEX,
  MUST,
  DG,
  UBT,
  FXS,
  LINK,
  CFI,
  DRC,
  DSLA,
  ARIA20,
  CEL,
  SUPER,
  XMARK,
  DEFI5,
  AZUKI,
  HH,
  MDEF,
  DMT,
  DEGEN,
  EMPTY
} from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const STAKING_GENESIS = 1616346000;

export const REWARDS_DURATION_DAYS = 7;

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC
    { tokens: [MAUSDC,USDC],
      stakingRewardAddress: '0x67C5Eda539c9A5e6FF6ceD94D2cc9452416A7f88',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [GHST,QUICK],
      stakingRewardAddress: '0x867875D8225e92f25549B2baC7B1379DbF0cc66D',
      ended: false,
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: QUICK },
    { tokens: [WBTC,ETHER],
      stakingRewardAddress: '0xfE54aCf90f3F88cc2486710aa2B9234d05c833b7',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [MATIC,QUICK],
      stakingRewardAddress: '0xc419BF84922a3695899144473ABFfcea9D3F492e',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [LINK,ETHER],
      stakingRewardAddress: '0xD2365152dfB7C3f896e1ba9fA73b80e7e6888805',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [ETHER,MATIC],
      stakingRewardAddress: '0x35deCFb44FDC18d9e5B3A7F85cc28dfc3b185a39',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [ETHER,USDC],
      stakingRewardAddress: '0x2260A04EDd0b3E72778206843Cb12cC535f5E656',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [GHST,USDC],
      stakingRewardAddress: '0xcB7249F0800F299F90b977E26a7Af34E94C4Ca70',
      ended: false,
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      baseToken: USDC },
    { tokens: [MAAAVE,QUICK],
      stakingRewardAddress: '0xAc7Ce318f0bbBF1b6132383a63e560711019F3bf',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [FRAX,FXS],
      stakingRewardAddress: '0xC4c83eaaBb76d4ef70342A2E66f4C080A1378782',
      ended: false,
      lp: '',
      name: '',
      baseToken: FRAX },
    { tokens: [CEL,ETHER],
      stakingRewardAddress: '0x7EAE699ADd9C2B0128Db06EE07153d1863790A32',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [ETHER,DEFI5],
      stakingRewardAddress: '0xC70fAfD776b5C4b24eD25C8754eCabf5860F8cE9',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [FRAX,QUICK],
      stakingRewardAddress: '0x56fA7Fd005Aa9143bfe638ac784A60e46b02A465',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DEGEN,QUICK],
      stakingRewardAddress: '0xA962dE558655e1c4c77afFE8362b532389a7dDAe',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DAI,ETHER],
      stakingRewardAddress: '0xE3109dbAA0744e4480223fEA418c3702136532Cd',
      ended: false,
      lp: '',
      name: '',
      baseToken: DAI },
    { tokens: [QUICK,DEFI5],
      stakingRewardAddress: '0x4BB809afd6d8F6cAd09cfdfA88577a0Ccc037259',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [SX,ETHER],
      stakingRewardAddress: '0xc1942fe5F9f0eF039eD0EFb411D413CCD6a8bD69',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [USDC,QUICK],
      stakingRewardAddress: '0x36613a52B272bA901EcFE4E76D490AF6Acbc005b',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [ETHER,QUICK],
      stakingRewardAddress: '0x524A38c1F5E9bFC528ABc5bD2e2AfeE01c24B7E2',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [DB,QUICK],
      stakingRewardAddress: '0xe630Fe16F48df044A668053A655C513594e55361',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DG,QUICK],
      stakingRewardAddress: '0x747d0Aa4A8C4eF704DdECd23885e020B79d43cE9',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [LINK,QUICK],
      stakingRewardAddress: '0xa69BE44aE9Db6b9684B74256Bf6a217d36891d19',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [UBT,ETHER],
      stakingRewardAddress: '0x359c7f2fEc1FB7b9a3A88c2bd388e58EB24b98fb',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [QUICK,CEL],
      stakingRewardAddress: '0x9f229439716FDAC3D5093D5fD98F1C81785a72d6',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MATUSD,MAUSDC],
      stakingRewardAddress: '0x04cba2d8b8DB56626bbd0236d081329bbB28EeBa',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [DG,ETHER],
      stakingRewardAddress: '0x96a87830bBf522bb205A2A77320CC7c426844df7',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [SWAP,QUICK],
      stakingRewardAddress: '0x0E1B4043543C84dC40FcbA0B8E7E895377Af14C6',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [IFARM,MATIC],
      stakingRewardAddress: '0x2bfC489AeD1943879332BCa3cFAA8B7E9B406BAc',
      ended: false,
      lp: '',
      name: '',
      baseToken: MATIC },
    { tokens: [MAUSDT,MAUSDC],
      stakingRewardAddress: '0x4a27b46B3d7cFC62686D4621649655af8Ebc590A',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [ARIA20,ETHER],
      stakingRewardAddress: '0x8B6f5a397Fd2a49Cc5DAcd9B28be16C511aAb079',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [QUICK,XMARK],
      stakingRewardAddress: '0x7BDa91E5B73760335BB353894d9067AAD85d37DD',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MADAI,MAUSDC],
      stakingRewardAddress: '0x812890108687f12D6A4366AA32A7c8b0d08e8025',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [SUPER,QUICK],
      stakingRewardAddress: '0x515584b6c266CC6d1Fb50CE95eb1d16c5EDdBB7D',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [SUPER,ETHER],
      stakingRewardAddress: '0xb3dBF90899177594ef2F123487A2E791fE13da00',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [IFARM,QUICK],
      stakingRewardAddress: '0x4B413d529442C0039c8e854B8267d502692694FA',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MAYFI,MAUSDC],
      stakingRewardAddress: '0x726c42cB8f2012EA222408d7df0243117747Ef91',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [MAUNI,MAUSDC],
      stakingRewardAddress: '0x044343dcD512A1169A8C19d2D2948019B73AaEB8',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [GAME,QUICK],
      stakingRewardAddress: '0x49f9D07Ec803664a92502DD09094bc1819A58bb4',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DB,MATIC],
      stakingRewardAddress: '0xD02053bB6c244199A995A3bE2d861fE9D6bEE3b3',
      ended: false,
      lp: '',
      name: '',
      baseToken: MATIC },
    { tokens: [SWAP,ETHER],
      stakingRewardAddress: '0xc0DD4e629f26b91F7FA387608A88c4F139f8bB36',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [MATIC,USDC],
      stakingRewardAddress: '0xd0dacd91413fE7561700A7222d5A8afC178dd6fe',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [MAWETH,MAUSDC],
      stakingRewardAddress: '0xd66ebd64577C3201f845E8BB88552a7cedDe7E08',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [MAUSDC,QUICK],
      stakingRewardAddress: '0xa46ABc9ECe1B6364Bf9257fB7abD3C6808000105',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [UNITOKEN,QUICK],
      stakingRewardAddress: '0x4036F3610CE025810B0C3d5F703F58F4A3aa31A6',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MALINK,MAUSDC],
      stakingRewardAddress: '0x4393e146010B35Be6f1b3f5164D8b1B9e4E83b3e',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [MAAAVE,MAUSDC],
      stakingRewardAddress: '0xED59c17ee7Ecd7B61B275F1E742082Bba5A87c79',
      ended: false,
      lp: '',
      name: '',
      baseToken: MAUSDC },
    { tokens: [DB,ETHER],
      stakingRewardAddress: '0xceC7607e603D7665856088cC5Cd086454cd5624b',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [HEX,ETHER],
      stakingRewardAddress: '0xDD9Fff9C41321A65DdDe6849433AA1611a8Ce2f7',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [HEX,QUICK],
      stakingRewardAddress: '0x9f8d97859d7113De0fA4F27cc3840198641ebe34',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [UBT,QUICK],
      stakingRewardAddress: '0x8FFcaA8e6d2a3141Cd066D04fE54D2A1da24028a',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [ETHER,HH],
      stakingRewardAddress: '0x5211c45377f033d913Df1b74257131FF16365A8A',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [SX,QUICK],
      stakingRewardAddress: '0x38284f873B2F9b43754E509105a7C1b8bccEE150',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [QUICK,HH],
      stakingRewardAddress: '0xA7B4e642316555Fd660fC22682463F8A28Dda9f8',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [ETHER,DMT],
      stakingRewardAddress: '0xA77728Fd7B4ea7DE784DfbA67838972ff0987cde',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [EASY,QUICK],
      stakingRewardAddress: '0x5cad7553A60c37d0b59Cc7820b73fc3c3E572bC5',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [QUICK,AZUKI],
      stakingRewardAddress: '0xE90960FaFdbbbCA56e339f59B24Ef85B851519fD',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [SX,DAI],
      stakingRewardAddress: '0x22cbe5a96b9057A3F9a68523d61Af4f685D11863',
      ended: false,
      lp: '',
      name: '',
      baseToken: DAI },
    { tokens: [VISION,ETHER],
      stakingRewardAddress: '0x603123d6798fa3B11290144fEd21F9a40453A22f',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [QUICK,DMT],
      stakingRewardAddress: '0x41220025fCF199333Ca575D25f4568EA06FC7F2e',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [GAME,ETHER],
      stakingRewardAddress: '0xa3b0e2799d9A0656FB333c1E9B4aD131FBd6B139',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [ARIA20,QUICK],
      stakingRewardAddress: '0x8330aa05Db8f7D98C794608f565BD0530F08ba0F',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [ETHER,AZUKI],
      stakingRewardAddress: '0x499D074E1966e0Bb5C858Ca872D763F68e1d09FE',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [VISION,QUICK],
      stakingRewardAddress: '0xdcf1A0D8Ea7102884C73A39F8e90a2945494eA2c',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [QUICK,OM],
      stakingRewardAddress: '0x559cF318A1a1869d1871b55f26801f657442B7A9',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MATIC,MRBAL],
      stakingRewardAddress: '0xC2F99D34B8dC20A5A868bFA474F8a786e501ab1F',
      ended: false,
      lp: '',
      name: '',
      baseToken: MATIC },
    { tokens: [ETHER,OM],
      stakingRewardAddress: '0xd5dA80F60C931D8542501450aE67f1663a56F4Fa',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [CFI,QUICK],
      stakingRewardAddress: '0x59e63cDFB26AfC3C786F3D0e194AF76EcBAC4f69',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [ZUT,QUICK],
      stakingRewardAddress: '0x4432c332EC0F39450803a6371519D342709175e1',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [CFI,USDC],
      stakingRewardAddress: '0xFf2300669A0f7e12d5FB40Ba2D03bAb6855c7CB4',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [DRC,QUICK],
      stakingRewardAddress: '0x629F0b2F56b40E009a3289D44934b7c9467119a3',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [PPDEX,QUICK],
      stakingRewardAddress: '0x5d790cCaD673B041180A0433a52cD4f0BF265982',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [MRBAL,QUICK],
      stakingRewardAddress: '0x68B4eca6EE1b802E5a7ee3A743ca4FBa4b1376b4',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DSLA,QUICK],
      stakingRewardAddress: '0xBf8442359c9F172B5bFe4a6be751CAb03d27dF93',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [QUICK,MDEF],
      stakingRewardAddress: '0x23d4253bB9434959088013eFD87385DB21990029',
      ended: false,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [DSLA,ETHER],
      stakingRewardAddress: '0x310B0e340e451F6169aAA13d7D4Cb039d9517317',
      ended: false,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [DRC,USDC],
      stakingRewardAddress: '0xDbd2cBd1e69777643301b7623a99610E60fAD3A7',
      ended: false,
      lp: '',
      name: '',
      baseToken: USDC }
    
  ]
}


export const OLD_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC
    
  ]
}

export const VERY_OLD_STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC
    { tokens: [MAUSDC,USDC],
      stakingRewardAddress: '0x19FD308bfC9fdC7979a7141A10bc0B4C0267AbBB',
      ended: true,
      lp: '',
      name: '',
      baseToken: USDC },
    { tokens: [GHST,QUICK],
      stakingRewardAddress: '0xe8ebE7e46D885d283fb0e0177af7df454DCA111C',
      ended: true,
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: QUICK
      
    },
    { tokens: [WBTC,ETHER],
      stakingRewardAddress: '0x62AEF7797512095b6d640E4103264c41386063ae',
      ended: true,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [MATIC,QUICK],
      stakingRewardAddress: '0xbEe47F087200a493bb8a71c6C76A9CD5396e9F94',
      ended: true,
      lp: '',
      name: '',
      baseToken: QUICK },
    { tokens: [ETHER,MATIC],
      stakingRewardAddress: '0x5298d2Ea83ca981fCda625df1F9AA03a305738C0',
      ended: true,
      lp: '',
      name: '',
      baseToken: ETHER },
    { tokens: [ETHER,USDC],
      stakingRewardAddress: '0x16b4Ea4417C610f0F11dAf49EAb8155bbAE4FeEE',
      ended: true,
      lp: '',
      name: '',
baseToken: USDC },
    { tokens: [GHST,USDC],
      stakingRewardAddress: '0x201D66d7d7139E137c51be0DD22c3736B3A81835',
      ended: true,
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      baseToken: USDC
    },
    { tokens: [LINK,ETHER],
      stakingRewardAddress: '0x90BB3F41c7c4C47A16406347EC1112D42c189A9e',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [DAI,ETHER],
      stakingRewardAddress: '0xEc1294419F2dda918a14d1D14fE9f3faacf81008',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [FRAX,FXS],
      stakingRewardAddress: '0x99cbBa72d919791009a8c6Db5AaDF1DeA883e0d1',
      ended: true,
      lp: '',
      name: '',
baseToken: FRAX },
    { tokens: [ETHER,DEFI5],
      stakingRewardAddress: '0xBe3AF49Bd0EeB5ff7990deaA381ed887eD25938a',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [QUICK,DEFI5],
      stakingRewardAddress: '0xD2d83D63205f5bc44787c21D382FB9f9b8752FFF',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [ETHER,QUICK],
      stakingRewardAddress: '0xff2cc7bb508c40bC201D45A32b1804e822F48058',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [CEL,ETHER],
      stakingRewardAddress: '0xef2c19bbc8e6AA85BBB5F50aB7528c2c0eFDb74C',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [MAAAVE,QUICK],
      stakingRewardAddress: '0x5104D3b09b6b12c63584d9abE1f3EcF96E5Fe56C',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [FRAX,QUICK],
      stakingRewardAddress: '0x34aC099bea7Ac58B4a9a6c10ac8F2Eae247d2928',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [QUICK,CEL],
      stakingRewardAddress: '0xEA782586eA4f463B022A63D24C221cb4335c32A6',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [USDC,QUICK],
      stakingRewardAddress: '0x1d86182103c803DD6bde2412A5a9D66Ca7E80a67',
      ended: true,
      lp: '',
      name: '',
baseToken: USDC },
    { tokens: [SX,ETHER],
      stakingRewardAddress: '0x5074f8250534B20160c87bF7Cb48Fe06811C0DBb',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [QUICK,XMARK],
      stakingRewardAddress: '0x7334054b00bA72DeE9a84B1135D76851d21A2938',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [DB,MATIC],
      stakingRewardAddress: '0x30aD68a11A4c904Eb7B4858CFa643e9D26516Bc6',
      ended: true,
      lp: '',
      name: '',
baseToken: MATIC },
    { tokens: [SUPER,QUICK],
      stakingRewardAddress: '0xdc00407aF961A1F116d9484fB240Bf226BC9bFf3',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [IFARM,MATIC],
      stakingRewardAddress: '0xB367eF9Ff258bCCaF7004b9bC7a007E955C92120',
      ended: true,
      lp: '',
      name: '',
baseToken: MATIC },
    { tokens: [SUPER,ETHER],
      stakingRewardAddress: '0xa6c3a26D8b0c4f811413CD7Fc7817C0d04e408A7',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [MAUSDT,MAUSDC],
      stakingRewardAddress: '0x5Ce6c2521538711997707105132055De2E334684',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [MATUSD,MAUSDC],
      stakingRewardAddress: '0x3655D05758d68938B3Beb3A5461A4863e9327345',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [LINK,QUICK],
      stakingRewardAddress: '0xd143d387fC456608a117Ab730a023F80e7A914f5',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MADAI,MAUSDC],
      stakingRewardAddress: '0x9869367db942A5D690Bfe238347f2d91Bb94A139',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [SWAP,ETHER],
      stakingRewardAddress: '0x87ADb629401664EA47F58c03805F0c28e75943C4',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [SWAP,QUICK],
      stakingRewardAddress: '0x4eB3EfC4b04eE340A6C3623921Be21c285a3034f',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MATIC,USDC],
      stakingRewardAddress: '0xfD15a6a3F07C89B15DB9b59e6880EF1a6550aFb9',
      ended: true,
      lp: '',
      name: '',
baseToken: USDC },
    { tokens: [UBT,ETHER],
      stakingRewardAddress: '0x3765C3b243c456020BD8f947E439f06ba9A8049e',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [DB,ETHER],
      stakingRewardAddress: '0x34c065c2aE774037734877B8C308688415AE6688',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [DG,QUICK],
      stakingRewardAddress: '0xF9414A4FB22fc040b354f1F9E7C2567F477d8536',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [DG,ETHER],
      stakingRewardAddress: '0xF077a4789666eF79E0CfC409b66E2082c3b53872',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [IFARM,QUICK],
      stakingRewardAddress: '0xd8Be944Dd5F5BbC2De00478c44A7770333fdc446',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MAYFI,MAUSDC],
      stakingRewardAddress: '0xC87328298649DACA11228e6Bbf36d3B4AAF4Ae2b',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [MAWETH,MAUSDC],
      stakingRewardAddress: '0x046bd5fb1A30046B96Ea85f587241029b0991Cd5',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [QUICK,AZUKI],
      stakingRewardAddress: '0xb7A25b8f17Ad1B5E12dab7B03f8e5fEa5043f7b8',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [ETHER,AZUKI],
      stakingRewardAddress: '0x2ab140994D8f060b70f1D9f8F775E9dA8D1e6Cd1',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [MAUNI,MAUSDC],
      stakingRewardAddress: '0x483A66864e09F62272b4dC57EE6a36F1313D6730',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [MAUSDC,QUICK],
      stakingRewardAddress: '0xdF39E6998bDE3131F8E79d3110fC772ba74e4613',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [UNITOKEN,QUICK],
      stakingRewardAddress: '0xBF6407a5aBD5215dC5aC9B7554C5C9EA8D9953BF',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [HEX,ETHER],
      stakingRewardAddress: '0x8b6156625C7879421Bf2C8C498F8f1dfE9eA8391',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [HEX,QUICK],
      stakingRewardAddress: '0x8B6e5dF82AB0393c26abEeC1dBf6D9a635be45D6',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [ARIA20,ETHER],
      stakingRewardAddress: '0xd78bBf1D86d3D27A59368371E6482B79D284c6b5',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [MALINK,MAUSDC],
      stakingRewardAddress: '0x0f8CB585A95A807CB68E7c2b5DEBbc2d9E8398d3',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [QUICK,OM],
      stakingRewardAddress: '0x295B6bd267B49F5CcaCc0378A15BE4805A7CbBdD',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [QUICK,HH],
      stakingRewardAddress: '0xa9987f077d583305eDB335E2241C18c37c91f1AD',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [UBT,QUICK],
      stakingRewardAddress: '0x00A289344afF9dcA5c40350dCbb4885DFf9521C0',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [QUICK,DMT],
      stakingRewardAddress: '0x739e730D85F0E5C154d2BB9b31B4f3bA5e95ba3F',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [GAME,QUICK],
      stakingRewardAddress: '0xA05Bd910424E2c848D8874C48E9fb8207C496E03',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MAAAVE,MAUSDC],
      stakingRewardAddress: '0x41204E879Cf5f499C1b419792F9E47c6538c040B',
      ended: true,
      lp: '',
      name: '',
baseToken: MAUSDC },
    { tokens: [ETHER,HH],
      stakingRewardAddress: '0x976a261de050935CC816f6e4Df149FEe41b0949F',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [GAME,ETHER],
      stakingRewardAddress: '0x2ef72f744366c6c7c9D9BA967EE0703D6F1f24E9',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [ETHER,DMT],
      stakingRewardAddress: '0x43180e5D0aeC6d3be1E81DC6a83c1DEC049aF5fC',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [EASY,QUICK],
      stakingRewardAddress: '0x43EbA9B080f465138b97BD17C36bbb73C1C2A0F0',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [SX,DAI],
      stakingRewardAddress: '0x38f8eB09a82B96B5a86773681D20d1Ad587385b8',
      ended: true,
      lp: '',
      name: '',
baseToken: DAI },
    { tokens: [ETHER,OM],
      stakingRewardAddress: '0x7aB50EC4b2df4283219996C92d1BE0Eca5F974dB',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [ARIA20,QUICK],
      stakingRewardAddress: '0xed2D83020610d216ed41feD8F9e2361e4A9B5e13',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [SX,QUICK],
      stakingRewardAddress: '0x02D3B842c8Cb2B217D87E9d73cd76CB70242587A',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [VISION,ETHER],
      stakingRewardAddress: '0x2c2b1b3e180E227F87E3AA0Ec4338866109566eD',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [CFI,QUICK],
      stakingRewardAddress: '0x6eD883d937fedce9505868433E6749a63eb974fE',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [VISION,QUICK],
      stakingRewardAddress: '0x9d87912B51Fb2bc9eF395512Fdc7066FCba78201',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MRBAL,QUICK],
      stakingRewardAddress: '0x14d69736b4B72E14dB372A36a0944C025759DfF1',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [ZUT,QUICK],
      stakingRewardAddress: '0x4E6ab1521c5A02E1b7F00D726445910E68164C67',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MUST,MATIC],
      stakingRewardAddress: '0x74Bf881daDaFa45149FEd02D269D6bDF2C482E32',
      ended: true,
      lp: '',
      name: '',
baseToken: MATIC },
    { tokens: [DSLA,ETHER],
      stakingRewardAddress: '0x5A61ac95F86C2458d844ff1869AC3b3BB5F72D6c',
      ended: true,
      lp: '',
      name: '',
baseToken: ETHER },
    { tokens: [CFI,USDC],
      stakingRewardAddress: '0x2ee4CF224546DA48453474472A96138c1A2fCc98',
      ended: true,
      lp: '',
      name: '',
baseToken: USDC },
    { tokens: [DSLA,QUICK],
      stakingRewardAddress: '0x05378BdAeE39e1EDda3a711BE174c7771712387E',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [QUICK,MDEF],
      stakingRewardAddress: '0x5E3A895cE02f8c8101A6Bc44520CFE2D0f5654ec',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MATIC,MRBAL],
      stakingRewardAddress: '0xEa4A37B036E15ec89b71ffaf445795f9f70f10E0',
      ended: true,
      lp: '',
      name: '',
baseToken: MATIC },
    { tokens: [DRC,QUICK],
      stakingRewardAddress: '0xf86Cffba04665e549EFBd946CA1DDFa58af998D4',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [MUST,QUICK],
      stakingRewardAddress: '0x76eaF915ea94fD8261CAF9d8453446768753c82d',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [PPDEX,QUICK],
      stakingRewardAddress: '0xD6c4b56BCd1Fd5A5E3e684125865D995Ff282EB0',
      ended: true,
      lp: '',
      name: '',
baseToken: QUICK },
    { tokens: [DRC,USDC],
      stakingRewardAddress: '0x8E85aA9d2D28130D603F855747fC863aE531120b',
      ended: true,
      lp: '',
      name: '',
baseToken: USDC },
    { tokens: [MAUSDC,USDC],
      stakingRewardAddress: '0x111C8Fb82c3BAf533ca7A0deeB5a7BF31D6B2b57',
      ended: true,
      lp: '',
      name: '',
      baseToken: EMPTY },
    { tokens: [QUICK, GHST],
      stakingRewardAddress: '0x0A1d12b089577870FE94176Cc6fb2B87A94f268C',
      ended: true,
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY },
    { tokens: [ETHER,USDC],
      stakingRewardAddress: '0x4571948F99Af3c39ac9831874E413E907981a341',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MATIC,QUICK],
      stakingRewardAddress: '0x6376Fd1ee8d76096a5Ba7A54D9E0Dea9B6c89C20',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [FRAX,FXS],
      stakingRewardAddress: '0x71Fe8138C81d7a0cd7e463c8C7Ff524085A411ab',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [WBTC,ETHER],
      stakingRewardAddress: '0xdD7538d82E7A38A07A09E96c15279CE74cC14ABC',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ETHER,MATIC],
      stakingRewardAddress: '0x88963CC8DF67208DdD7FF78A093fB2F9242d9e00',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [CEL,ETHER],
      stakingRewardAddress: '0xdeeFB589f8dd66b9A4FbCaff589028f6DE9D4C73',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [QUICK,CEL],
      stakingRewardAddress: '0x6dED557bd6E2bcD2653bA0B43d0e0f1B2D3Dbd99',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [GHST,USDC],
      stakingRewardAddress: '0xF235f75ea0F053037F5de99778aefae9c6AB9C84',
      ended: true,
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      baseToken: EMPTY
    },
    { tokens: [FRAX,QUICK],
      stakingRewardAddress: '0x536D4757dfA353a4Db2B821cF1adD3A76cc0E63b',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DAI,ETHER],
      stakingRewardAddress: '0x1732a459fba48ab2E5fEA9d3932906E2FF7cAA99',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAAAVE,QUICK],
      stakingRewardAddress: '0xF0756eB4106b82c4CBd82Db266313a58A5E5844E',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ETHER,QUICK],
      stakingRewardAddress: '0xAEB63c546Be3d6b4f1390e59A07933bc9abB3839',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [SWAP,ETHER],
      stakingRewardAddress: '0x4c44AF5349e651cb886Fb0dc3D3668a179733762',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [USDC,QUICK],
      stakingRewardAddress: '0x8cf4f5b9A2d87F176ED23272aE9DcE4959f7C8FF',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [LINK,ETHER],
      stakingRewardAddress: '0xA0dC0D47C064b228a56cE3ee821408AE74473e2a',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [LINK,QUICK],
      stakingRewardAddress: '0x1c26fa3280814aFD43Fe55cB94e842Ce38070060',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [SWAP,QUICK],
      stakingRewardAddress: '0xB0955Ed458cd03Ff2d46903020de4549C72E3995',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [SX,ETHER],
      stakingRewardAddress: '0x4Ee7A892E887902248bbE6D10dad20C6edB603b4',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MATIC,USDC],
      stakingRewardAddress: '0x682e7eac9A54c1d50DbFCE15a0e48Ee04d8b4EE7',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [IFARM,MATIC],
      stakingRewardAddress: '0xA61d3F278E01bF427ebd180C5cb316DB7156d3DF',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MATUSD,MAUSDC],
      stakingRewardAddress: '0x6a0E0Cfae54D0e8e713367F3da0D1E95C385a130',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAUSDT,MAUSDC],
      stakingRewardAddress: '0x94E34803393882eF97D8254d6682ab03fC407ED3',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [IFARM,QUICK],
      stakingRewardAddress: '0xbd3FAB81C05D6BC92F85059B93f62E6031fBb39c',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MADAI,MAUSDC],
      stakingRewardAddress: '0xD454425F85C1CEfFACd91172312F6704A6b158F5',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAYFI,MAUSDC],
      stakingRewardAddress: '0x5DD8BE8E5b43b4db266d3d7b911a8241d6610BBf',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [UBT,ETHER],
      stakingRewardAddress: '0x048B32F30C115F033D0aAf869351e872F21A7cab',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DB,MATIC],
      stakingRewardAddress: '0x152f15A8128D8De734932CA7986F97321006f0Ad',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [QUICK,OM],
      stakingRewardAddress: '0xb160BF8878123AE85b3DB6dCE37B5F848ec9cf0f',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ETHER,OM],
      stakingRewardAddress: '0x5356c27664C5e23513a9419E272576a5d2E6832e',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAWETH,MAUSDC],
      stakingRewardAddress: '0x3c6C4F00a1c7525D229046512E03d1474B27E7C7',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAAAVE,MAUSDC],
      stakingRewardAddress: '0xA2C4BE3F83DEACb1e60a62675Aef314a2cB3D05E',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [UNITOKEN,QUICK],
      stakingRewardAddress: '0xCB26D1DFa93F0506Fded0F3C799D46784B65Abd5',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MALINK,MAUSDC],
      stakingRewardAddress: '0x453f7e2Ae4a7829Aeb7F95CAe18CE083e38fd78F',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAUNI,MAUSDC],
      stakingRewardAddress: '0xCeBe4F02454DF590532f3980e0fcF076BE6e3301',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DG,ETHER],
      stakingRewardAddress: '0xBcf91097e3585B8B201E642C5429cc0caa453C3b',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DG,QUICK],
      stakingRewardAddress: '0xA4FF67A10f7250e9Ce5468f267a72e1E200c0F82',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [UBT,QUICK],
      stakingRewardAddress: '0xB169F29E98Db049ccD9118bf3eF17BB1B576fEF5',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DB,ETHER],
      stakingRewardAddress: '0x74D7E554abc97f0700E79bfB1a12a72DbdE7414B',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [HEX,ETHER],
      stakingRewardAddress: '0x790faEbd419e68F862fc2AC178530e5993150136',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [HEX,QUICK],
      stakingRewardAddress: '0xbeB94A09E8ea0bCaBdF45Dc35c063be5eFa8098A',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MAUSDC,QUICK],
      stakingRewardAddress: '0xAA0505C616070aDBB5849Cd2e69001D790F83C23',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [EASY,QUICK],
      stakingRewardAddress: '0x2F5240381Aaf4bd933497d237441FdcA29c547b5',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [SX,QUICK],
      stakingRewardAddress: '0x6E2c6Ec20B1D37C68d55853F041E26C7085F0609',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [GAME,QUICK],
      stakingRewardAddress: '0x5d5E93dAf02503838839cC2Efc469dDF09f9970B',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [GAME,ETHER],
      stakingRewardAddress: '0x8a2c0E8668CEA0ed4E4F7f8054CCf2B596dB6593',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ARIA20,ETHER],
      stakingRewardAddress: '0x4BaCe30A7d51fC6143B76630F0d4dDe9A84aD026',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [SX,DAI],
      stakingRewardAddress: '0xd730DA4945Ed2cAb4859F5Ff5120563F89F4d946',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ARIA20,QUICK],
      stakingRewardAddress: '0xf993e7aB870414b975c0c86fEBc485Ac55Ca4ce2',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [ZUT,QUICK],
      stakingRewardAddress: '0xe71Ee2AEd6ac7F0f79a39e8eabC661A8a81d9445',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MRBAL,QUICK],
      stakingRewardAddress: '0xED4632e6e62F0B21Da5FcCc73219F90679180a10',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [VISION,ETHER],
      stakingRewardAddress: '0x5688d4a096EaaC58A4E97cDAf47148156aEa894d',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MUST,MATIC],
      stakingRewardAddress: '0xF1c11f2db9a79674D37A2B5143bA75C3C37B4b24',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [MUST,QUICK],
      stakingRewardAddress: '0x3EFF4110dE6BB8fa02a13a13811c4A0b951e5868',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [VISION,QUICK],
      stakingRewardAddress: '0x443991561B978B910b2A712e747Bf73B62F59Fd7',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [CFI,USDC],
      stakingRewardAddress: '0x79Dc8AC9a0062D283F2EA755cB8671a76c1F4289',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [CFI,QUICK],
      stakingRewardAddress: '0xECc943eB73877450F43142265fB4EfFc102988C2',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [PPDEX,QUICK],
      stakingRewardAddress: '0xCaAF5CC13cb23988028a95c9162FCf11B5524D36',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DSLA,QUICK],
      stakingRewardAddress: '0x67a7CC86D3Cf578b1a4AC37dC503F0d1093d45Fa',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DSLA,ETHER],
      stakingRewardAddress: '0xa9B2852263a7e32B5D90f43380c21e367e350472',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DRC,QUICK],
      stakingRewardAddress: '0x0684311298C4F705517098c142f095bc0d810e37',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    { tokens: [DRC,USDC],
      stakingRewardAddress: '0x98c700BC3F366Bc1b7759a8149c94dDE0edC0536',
      ended: true,
      lp: '',
      name: '',
baseToken: EMPTY },
    {
      tokens: [USDC, MAUSDC],
      stakingRewardAddress: '0x68910d18332fFDc1D11caEA4fE93C94Ccd540732',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x7E8DC91771296F8d5c03ad5c074F9Dc219C6F8A3',
      ended: true,
      
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [FRAX, FXS],
      stakingRewardAddress: '0x5DA02A2B3F401605181D55583E42a99206A795ba',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, FRAX],
      stakingRewardAddress: '0x5E405eBCc4914ACD27aA4A5EfF7BaBc04521E87A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAAAVE],
      stakingRewardAddress: '0x40251Dd84EA72001627f71aD1924EAb56192363F',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [GHST, USDC],
      stakingRewardAddress: '0x04Bd1c14b42b200B5D51fB322EDC57ff8c9c7cc0',
      ended: true,
      
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xC6C65bdf0EC4481ED70354463af0A8F5fC236A8C',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x53CE63267F4faf45f6eb4c5656cc53705144496a',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MATIC],
      stakingRewardAddress: '0xf3535a4EC27613f7b6608DFCBbc31Aaeb47c2d8A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, WBTC],
      stakingRewardAddress: '0x74aF83811468d7a51452128727AB14507B7DC57E',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, SWAP],
      stakingRewardAddress: '0x5D9baBB81BAA29EAC55498a8155098e4bCC90657',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, SWAP],
      stakingRewardAddress: '0x8187b7F03A90826Ad79f890F9e55117C74C60C98',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x99B39206ef9b4C6757ebaf36C1BdEE9824d5FC4a',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x9732E1cC876d8D0B61389385fC1FC756920404fd',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, DAI],
      stakingRewardAddress: '0xDFc1b89b6184DfCC7371E3dd898377ECBFEf7058',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xF6B03C8092751Fc1A4AD793Ebf72f8ae1Cb720d7',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MATUSD],
      stakingRewardAddress: '0x5AE1e3Af79270e600D0e86609bB56B6c6CE23Ee8',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUSDT],
      stakingRewardAddress: '0x66aCCDc838F563D36D0695539c5A01E651eAAEC9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MADAI],
      stakingRewardAddress: '0x0A8E11C2C9B89285e810A206D391CE480dbA7562',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x3991E2EF480Cc56859de294b4c38219D2160f8F4',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, IFARM],
      stakingRewardAddress: '0xFEaf88193eCD50eEDc4b8100cB069Fa07F245324',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, IFARM],
      stakingRewardAddress: '0x13FD442B86caE142C4F06730860AE14BC03194b4',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAYFI],
      stakingRewardAddress: '0xe77F457935701Ae04a19fEdE930360bD3bc8B077',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0xE7Cf8098be964a2034BBB11Ab373B59CACFC955e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, SX],
      stakingRewardAddress: '0xcb5eaa6141722b7ECd8865Fb8fDd28Ba78153A36',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, EASY],
      stakingRewardAddress: '0x4c859e0B6f0373358D9510fe09a74B2871F462CF',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAWETH],
      stakingRewardAddress: '0x22c79bB6641a0D2f573cCa0d8E2349F4fcFa6BED',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, SX],
      stakingRewardAddress: '0xF2514375270A988F3dce1b63e6093475a2134E65',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAAAVE],
      stakingRewardAddress: '0xb2e4aC9AF7bC5f74ACF826DD81a1EE361FAb7052',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GAME],
      stakingRewardAddress: '0x688cf18efEF9385dCB5c961B5e3e8EDB73e4f92d',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MALINK],
      stakingRewardAddress: '0x1c15a10EA6d42127CE7446304fE32DE4D6503539',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUNI],
      stakingRewardAddress: '0xA9c67F0377999c93978430922E4D9DD9394F6292',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, UBT],
      stakingRewardAddress: '0x462a089E0115610586d0BEc74b1436C4B18193D9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UBT],
      stakingRewardAddress: '0xD91b7C331F220596068278AF5a0AD7AD61b488f1',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, DG],
      stakingRewardAddress: '0x744C0F3f2ef797A22f87cD33A6E3A15a848c312e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, DG],
      stakingRewardAddress: '0x294118caB442669ea29E49a54FF8f51C954DcD54',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, DB],
      stakingRewardAddress: '0xa7a2FC8D0AA647dFF90Bb914f81F8ebbfDaC54E5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, GAME],
      stakingRewardAddress: '0xfe6223eC2ad07cE55C9eE23202D4D3f35Aa55259',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, HEX],
      stakingRewardAddress: '0x3DB374fBCf306Da680CFAE1E2C7A60C95447a31d',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, HEX],
      stakingRewardAddress: '0x587E811A008373DAf584F14d474b0d9094E3718F',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, DB],
      stakingRewardAddress: '0xE9C16C34f687d6Ca742e4f78682c34d9DCA085b9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ZUT],
      stakingRewardAddress: '0x0B614B3a0B3aD1bFb8B15Ec372834f36125ac5bA',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MRBAL],
      stakingRewardAddress: '0x4C912FD46B5612fe0De5b9a0384a0404676A632b',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, SX],
      stakingRewardAddress: '0x5f426A6aBe6F2fdF9B144F8FC9CC0D6e669b33A3',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, MUST],
      stakingRewardAddress: '0xD7C465E1BA3F2eA56603610B6959162eEd10EdfE',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MUST],
      stakingRewardAddress: '0x25397E9A3c874B49E86aAD308f0049A1294594ad',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, VISION],
      stakingRewardAddress: '0xA662c541aB5668D32EaF83221546D119e794F922',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, VISION],
      stakingRewardAddress: '0xd84d9f9C8C86e87c141fDbF6946FE9806f4d7253',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, PPDEX],
      stakingRewardAddress: '0xad1D6c4519deeE5e396E17A87C886ef0fdcB3651',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAAAVE],
      stakingRewardAddress: '0xD8e091bbbF9F74487D4A0eE483F65b363a4bbbc9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x440E9C828ECbf6B99C51EAb217c5D6e8c8715610',
      ended: true,
      
      name: 'StkQUICK-GHST',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, MAUSDC],
      stakingRewardAddress: '0x269f1972C0fB8aCCd3Cd835115153a1EB09a6FC3',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, QUICK],
      stakingRewardAddress: '0x3d0AA307E6Dcf0c19C6df9616318AE52fdE1408A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0xAA1Ce6Bf8016ddFEdCF521beA5724Fc5e19902a5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xC52614C03508d4A787Ac8E746607595Acd3614Bb',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, MATIC],
      stakingRewardAddress: '0x9FAFF83312fcE0079fc76A87a049078606148b02',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MATIC],
      stakingRewardAddress: '0xC0fa29d6D6F60d56eb08FD5Cb4E9b7a9E1D3d2F4',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, MATIC],
      stakingRewardAddress: '0x5c6A1676585D029a72063fA2C47a741BC8eB336F',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, ETHER],
      stakingRewardAddress: '0x3e1F5C03fd60B9472CFc463ED8F13674F8ea3C01',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x8135937A57034A8a814625b2FEb35447D23E4C9E',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, SX],
      stakingRewardAddress: '0x804B18A358e193Fe816949E42ed26f2ed408aAD9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [GHST, USDC],
      stakingRewardAddress: '0x4371b24Bff5F753f971a93b0Ef84c2B4d85A9a95',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MALINK],
      stakingRewardAddress: '0x3c987E7C57A178674F45c92efbD7F99bDE1CF84A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUNI],
      stakingRewardAddress: '0x5A3714c41c6B09b52c532A52fB6432089089eBc7',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAYFI],
      stakingRewardAddress: '0xbc6A1b6d4e04aD4A8bdb8Cc7c7aB9C4513190B64',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAWETH],
      stakingRewardAddress: '0xdC68FFe4251548af0DDb79E211af8976F8b6b381',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUSDT],
      stakingRewardAddress: '0x1b9794926759DCE8487A9614bB15Dc1767b9854d',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MATUSD],
      stakingRewardAddress: '0x014FF8cb58AeA532bB2Db28D49f2704A691621e5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MADAI],
      stakingRewardAddress: '0x061aD501BFCd276fb0dCe1bb4aB93629581F342e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAAAVE],
      stakingRewardAddress: '0x99b870c615Fb6a5b0fc2514deef6eF2a1d55a015',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, SX],
      stakingRewardAddress: '0x897edc5758E41C1c6470614b2764e21c88897eAA',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, EASY],
      stakingRewardAddress: '0xbdbC9fA5c2f58fF5B108E7312b06eE7EC19c660D',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    

    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x120cCE80Ca4D7CBC2c7A912321Ea1a4c32952938',
      ended: true,
      
      name: 'StkQUICK-GHST',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xF44eA460Da8938227508075f7b3611A809E53042',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, QUICK],
      stakingRewardAddress: '0x5F3dc91D19661940C705B9aC4D1A8C456DC3a56E',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0x776976a62604643fd660bCB23c055d66d86DEc79',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0x1538FEc5f4F3F5717929CF6E07168f831690348F',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xe341C094D391C40c9e1b0dfD3A0Ecf78D414c38e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x99dFae5242b0f1883041356C00262579D07cC06a',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x848E683EeDbaB60Da6a28763318404cc8E625DDB',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, USDC],
      stakingRewardAddress: '0x4a0f78b3e398181871b8BA050c286aFEf6C06837',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x513826BbF9ddcDE925322f7dFCb01A687E393F54',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x516C8CB28d9490Cb3Ca3432828D6495dC61e3D2A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },



    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x7B471EA4Ee31F316B2426fe5559808c32619aCDa',
      ended: true,
      
      name: 'StkQUICK-GHST',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x275d0038398Bf5D45F6E5fdC2435E6e85eA914DB',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, QUICK],
      stakingRewardAddress: '0xDCdFF945Aa9BB7841F56e9b430a859407Ecb87bF',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0xC1BB398b6a937889988FD51956385D29D682F85c',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0x8626Eab301D85D4aF717918b100C2132c870883A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xFEb99caeb4d137AaFdE495df139bcCDF1D2655A4',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x2E5CE665bE8641b38E4113Fec44C85EAf4669265',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x9B4f4A03166bc58Bc8efAd75a35BBfe5C43635DB',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, USDC],
      stakingRewardAddress: '0x1c6B863A5953fb4fA062cA000606605bC0cc5Cf3',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xEAb6b892e106142B1e28eaeb3Cd51580d2607cE0',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xbaf89F2ea0C003cD4aC29Fe93317053C1be6b1c6',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },



    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x1e224b8643b68a4d6b869e9596d979A708B26aB7',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xa78F3cDc2D2aE9d518c2fe60007811e437DEc9CD',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, QUICK],
      stakingRewardAddress: '0x2435361A37AF5a57cB14ba8379b7Cd9dcF9d83aC',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0xf9d375F824D108E91c9B3c0F3c47DB2Db0A7c050',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xAfa27B566D4b077835458Eae0Ee8D1D2DD1d638E',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0x16300c8811C7870260e44dC7ecBCaF854A9aCaED',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xB35Ce61B63994256d263aebDDD1c3eE8447Cab38',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x71a7D3a5e09C21d18FfdF57a7Ad5499B21e587f4',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xbC2710eD5fac42e7b97fc2D3dB37176989c81ddD',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [OM, USDC],
      stakingRewardAddress: '0x663ea801BC5Dfe2430d59Da8c817EfE669D4801A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xeAb039d3E2489766a7df9E2A11Cab8Db9db0fA7F',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x9b19421DE59E8ca04CB194667A3352e143F09f2c',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x7a503862489bA1aD2C519E8A875ec56dBAe0e8F1',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xD9298cBea9d1C2f134c1a70D25071DD143E00F3C',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x9A3EC4Ba0f979A889575754D8A1237804670a18d',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x1975075a30Ef629A5BD480D8098EC2544010f8B9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xa135E326a3C8bc76DECa64e6ff05c98bA1F7600e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x3B46d756c9963555454B70B4F04141605D0d2001',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x4c7026015f187F263b5FfAd194935372FbA07ba3',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xc959b7ED5cfDdF7787793ee2D73f3b6576B5eb0c',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x8d4Ce6785a7c4D063d7E6Fe9a2Ca375263D7b7eF',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xAEc809557Cf6cb2409F402933582aB7E99533086',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x65D3373e2Bd823B7ddA5794b32Fb5b41D97da8D0',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x554AF11c6C9B16132C0A524495080814FE04b478',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x451bd5921e381BFd56D5786C51F46fD49F1eB574',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xDdF1Fb44d0e8db1139138bd8c4f82FF474361744',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x6d8B49a865258CC53DbbAB698c362FcAd6B3FEFA',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x6cbdcfD243FDFd740d173B321420579026Be9742',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xF20a06123a465440263F20Aeef04930eCee8b520',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x5776d886459d7f202545d50377673077F27419b5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x58D1FD497B2FcfA64C862986bCf45d6A7Cfaa6F3',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x58196ED395e8EA60DF69e87655385AAB5B123AAB',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x304ec0c4C85E08308Bc52362801c8AAE5cbb0Abf',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x843Db20345080d718e660bB99613f50D60092a65',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, OM],
      stakingRewardAddress: '0x6eaaF92aaA842e88a9F6A9345aA8c3e7B1D0B52e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xF3331039E0090616D440798EcFcCF83552aDbc7A',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xF8930990505F0d2404f61778D6eC49f95A87dd6f',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x51C8ed98427ED9984836bC4a5371DA24573333c1',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xB72Ed7502150B922667Fd512b82Dc2a62999ab93',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x8B0c71AF620850D32546ba5862995Be07633D9E2',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x7EF2510AAf83E286886b8A1D4BE0b88099308CF0',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xf3bc3ECb14831F36B8dfE67abC51eB23B31839D1',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0xA937169A29b9858fFD98521CEA3023D2e565A987',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x0D1c1cb65893219aD54D3Fe95C9c06f306D2341d',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x78B2455b4cAa92c4a3678D7bFE1BfD18bA3D647c',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xDD86a8516188010A1301Ac79CE8A1D04fEC602a3',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },



    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x92eB672C46ba00CE303878B56A5a6288058954bb',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x1F92A2bd44C52cc94Aa111Ba7557c0FA10bBF428',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0xa4D93BbE0E0C75F94859e1bD0bB2AF7226Af1aF4',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0x3EA879F7fa2285Fde5676E464483dBcC502961eA',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x1b295617072f5065b5112e3aE39420933c985dDF',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0xFc62e4c7f6FeE3d2D70221A1BdB9335aDbf4700e',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x124837e8585b7f2CdF9D0eA643F428696bB4491C',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x398822B15d412344387B8CCF82453A25187203f3',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xb879f4663C0df1a0e735ccA7F723b44a7c0D54e3',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x1bdAf7D03e83580ccAc8c0403212e78FFf69c538',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xFF448d419D52B56aF7c7D78cB504C5da76Ba2D29',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xb99d3f2e5eDA2081fB2A70038589566D33c149c3',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x05748fD0d03780637A85dF5B2293ce857C1Fa309',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0x8dbf46c0f6Db05383Dc870036ad0F7619F7BDc3a',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0xf0f22765B9ea540929c7eC9BBCF7077C9f8E3117',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x73c601264d64d0DCbCa47ddef2dFC97E363E88a4',
      ended: true,

      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x46385DF67DF1A058d0C07420e4B7D9c3a40eACE8',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [IGG, USDC],
      stakingRewardAddress: '0x6d48CeD6521B55F64Bdb5FbFe27e0A19Fb46F1C8',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x9Ad3a1B339A796A5D373f4ec7BD8eC865f1ea5aC',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x5d445F4EDdCaee519F51Bb9AB7fEE0A74c8F37C1',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },


    {
      tokens: [QUICK, DAI],
      stakingRewardAddress: '0xcd7A989C8a21871ff9Da645F74916e23b7b83601',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x7341554a23A89a97186f339597AE365bBB0c4a26',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x7d59413E87dA59552a662103782CcA860Dc3d3c4',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xf91056D1A58a38A783a4F6122A1F995EEE4f60B3',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [ETHER, DAI],
      stakingRewardAddress: '0x88d4D1a7A0E917DB41De09A1AcA437726c1C418a',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [EASY, UNITOKEN],
      stakingRewardAddress: '0xfbEed0206635479BD2Ac204F793BF10E7EEad9df',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },


    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x0cc1c20c8A5640aeFdD41b2aa3E8Dc2c2EdcDDbD',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xE769875f9F0e38b15c9f409F08B583f00d2B14d3',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eUSDC, UNITOKEN],
      stakingRewardAddress: '0x1D43445c82795E4Cc8eF7C3cd735a10C112332A7',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eUSDT, UNITOKEN],
      stakingRewardAddress: '0xD929bbbd983b334D9D638DeC49DF454c3Ee720d9',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eDAI, UNITOKEN],
      stakingRewardAddress: '0xFA190551895cc065EE48E2E36c7cd0F2ae01AED2',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x457d88690e0B543445e69c03b5a760b38Ce07078',
      ended: true,
      name: '',
baseToken: EMPTY,
      lp: ''
      
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },



    {
      tokens: [USDC, MAUSDC],
      stakingRewardAddress: '0xFB5ddc9a2B675E3C13272f1B2Db0ED68340A6141',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0xc7A34b9fB20A195e8F077CF2D4830682FBbc58dA',
      ended: true,
      
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAAAVE],
      stakingRewardAddress: '0x627671bF401A990577063784055c0E758b62Ecc6',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, SWAP],
      stakingRewardAddress: '0x7F1d94D95fAD3200F238256dE8cE4C559a421437',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, SWAP],
      stakingRewardAddress: '0x39D158D8cf47Ed30c3fB8EA64C4CbC0A1155D931',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0xd6875b41EE725E8803407793501c70153eF6Fc23',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [GHST, USDC],
      stakingRewardAddress: '0x59A03B35a1379F498c32018b286250066348061F',
      ended: true,
      
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      baseToken: EMPTY
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xAE2D461aD54e1C98d1495B7424Fc0Cf495276f11',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xcdB04b9F0a134505c3FbE89A310C5C43165885e5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MATIC],
      stakingRewardAddress: '0xA36B18065D77B6F282F9A7dBC999Af23eE80FDf5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, ETHER],
      stakingRewardAddress: '0x088e190FcF2320B63944967854D066856EdAa435',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, ETHER],
      stakingRewardAddress: '0xc7Dc6829E32a511d6be2F93243121932F78719ff',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, MATIC],
      stakingRewardAddress: '0x3d63feCf1045f3E5bd4517e520F66CD6E9378850',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, SX],
      stakingRewardAddress: '0x8Fb8f95628b85E35F2E4B5249F887D074086154C',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xc6fd2B6b27e726A0555574419d1beAa37D75738a',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0xe8595596a85249dd2DEFd925e911d0C227fcc1c5',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, EASY],
      stakingRewardAddress: '0xD8942d42ADf8011C9CC0938729Bd3432cd2a0543',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, SX],
      stakingRewardAddress: '0x4E011A95374377842651fFf882c53fA195759dde',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MALINK],
      stakingRewardAddress: '0xB94747D2a1506c370B4D67F2d52a8439df72d8dD',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUNI],
      stakingRewardAddress: '0x0858f451cBb7F3c5ea2FBa3dC4287578Ad496633',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAYFI],
      stakingRewardAddress: '0x61Dc7A5Ed893304b6A12D022C042Cc99cb4d74a0',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAWETH],
      stakingRewardAddress: '0xCD032679f9eaFa8e4f068280932B4C9a7f021029',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAUSDT],
      stakingRewardAddress: '0xC18Fd4298F1A5abBFF1CD777c590db1776986023',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MATUSD],
      stakingRewardAddress: '0x36d078bfa649cBBd1d0F4cfc5F3d70401d849a71',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MADAI],
      stakingRewardAddress: '0x0eC57767a4dE065bb50429702671942f51A8ab37',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MAUSDC, MAAAVE],
      stakingRewardAddress: '0xf8B210c70b108104aAF9C301367cD575D69E1f6e',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GAME],
      stakingRewardAddress: '0x1090dA8B2EA11DB28cB39B9ebFf9711d285F897A',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, GAME],
      stakingRewardAddress: '0x527C91ad95430a2064637EF6413e9520784568a9',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, HEX],
      stakingRewardAddress: '0x20D06b4E5516111C08a023Aa3cAC8A12e220f51d',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, HEX],
      stakingRewardAddress: '0x1161d9270c60e3A158727C59F4A92C067d664C22',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, DB],
      stakingRewardAddress: '0x6240b9142Ac1087F5f0244413747E1C1cc79a03b',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, DB],
      stakingRewardAddress: '0xA498c012fa5fc5DBEaf4F26bdA42227c22527945',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MRBAL],
      stakingRewardAddress: '0xCD732D7c41753503B7d0311173cf90878bfF8806',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ZUT],
      stakingRewardAddress: '0x3A06DDc718ED7Cd15C1653187A4aB181Ec25E23C',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, SX],
      stakingRewardAddress: '0xca5Da81e08E573D5D92aCDe4Ac9Cc6534c3fAe09',
      ended: true,
      
      name: '',
baseToken: EMPTY,
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    }
  ]
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Date | undefined

  ended: boolean

  name: string

  lp: string

  baseToken: Token
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;

        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

// gets the staking info from the network for the active chain id
export function useVeryOldStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? VERY_OLD_STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;

        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          baseToken: info[index].baseToken,
          getHypotheticalRewardRate
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

export function useOldStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? OLD_STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
              ? true
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load staking rewards info')
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const lp = info[index].lp;

        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          baseToken: info[index].baseToken,
          getHypotheticalRewardRate
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const newStakingInfos = useStakingInfo()
  const oldStakingInfos = useOldStakingInfo();
  const stakingInfos = newStakingInfos.concat(oldStakingInfos);

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}
