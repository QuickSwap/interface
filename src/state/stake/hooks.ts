import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@uniswap/sdk'
import { useMemo } from 'react'
import { UNI, EASY, USDC, ETHER, /**eUSDC, eUSDT, eDAI,*/ UNITOKEN, QUICK, DAI, /**IGG,*/ WBTC, /**USDT,*/ MATIC, /**OM,*/ GHST, MAUSDC } from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const STAKING_GENESIS = 1612540800;

export const REWARDS_DURATION_DAYS = 7;

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    index: Number
    name: string
    lp: string
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x120cCE80Ca4D7CBC2c7A912321Ea1a4c32952938',
      ended: false,
      index: 0,
      name: 'StkQUICK-GHST',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f'
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xF44eA460Da8938227508075f7b3611A809E53042',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, QUICK],
      stakingRewardAddress: '0x5F3dc91D19661940C705B9aC4D1A8C456DC3a56E',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0x776976a62604643fd660bCB23c055d66d86DEc79',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0x1538FEc5f4F3F5717929CF6E07168f831690348F',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xe341C094D391C40c9e1b0dfD3A0Ecf78D414c38e',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x99dFae5242b0f1883041356C00262579D07cC06a',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x848E683EeDbaB60Da6a28763318404cc8E625DDB',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, USDC],
      stakingRewardAddress: '0x4a0f78b3e398181871b8BA050c286aFEf6C06837',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x513826BbF9ddcDE925322f7dFCb01A687E393F54',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x516C8CB28d9490Cb3Ca3432828D6495dC61e3D2A',
      ended: false,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },



    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0x7B471EA4Ee31F316B2426fe5559808c32619aCDa',
      ended: true,
      index: 1,
      name: 'StkQUICK-GHST',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f'
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x275d0038398Bf5D45F6E5fdC2435E6e85eA914DB',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, QUICK],
      stakingRewardAddress: '0xDCdFF945Aa9BB7841F56e9b430a859407Ecb87bF',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0xC1BB398b6a937889988FD51956385D29D682F85c',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, MAUSDC],
      stakingRewardAddress: '0x8626Eab301D85D4aF717918b100C2132c870883A',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0xFEb99caeb4d137AaFdE495df139bcCDF1D2655A4',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x2E5CE665bE8641b38E4113Fec44C85EAf4669265',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x9B4f4A03166bc58Bc8efAd75a35BBfe5C43635DB',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [DAI, USDC],
      stakingRewardAddress: '0x1c6B863A5953fb4fA062cA000606605bC0cc5Cf3',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xEAb6b892e106142B1e28eaeb3Cd51580d2607cE0',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xbaf89F2ea0C003cD4aC29Fe93317053C1be6b1c6',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },



    /**{
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x1e224b8643b68a4d6b869e9596d979A708B26aB7',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xa78F3cDc2D2aE9d518c2fe60007811e437DEc9CD',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, QUICK],
      stakingRewardAddress: '0x2435361A37AF5a57cB14ba8379b7Cd9dcF9d83aC',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, GHST],
      stakingRewardAddress: '0xf9d375F824D108E91c9B3c0F3c47DB2Db0A7c050',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xAfa27B566D4b077835458Eae0Ee8D1D2DD1d638E',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, GHST],
      stakingRewardAddress: '0x16300c8811C7870260e44dC7ecBCaF854A9aCaED',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xB35Ce61B63994256d263aebDDD1c3eE8447Cab38',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x71a7D3a5e09C21d18FfdF57a7Ad5499B21e587f4',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xbC2710eD5fac42e7b97fc2D3dB37176989c81ddD',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [OM, USDC],
      stakingRewardAddress: '0x663ea801BC5Dfe2430d59Da8c817EfE669D4801A',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xeAb039d3E2489766a7df9E2A11Cab8Db9db0fA7F',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x9b19421DE59E8ca04CB194667A3352e143F09f2c',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x7a503862489bA1aD2C519E8A875ec56dBAe0e8F1',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xD9298cBea9d1C2f134c1a70D25071DD143E00F3C',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x9A3EC4Ba0f979A889575754D8A1237804670a18d',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x1975075a30Ef629A5BD480D8098EC2544010f8B9',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xa135E326a3C8bc76DECa64e6ff05c98bA1F7600e',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x3B46d756c9963555454B70B4F04141605D0d2001',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x4c7026015f187F263b5FfAd194935372FbA07ba3',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xc959b7ED5cfDdF7787793ee2D73f3b6576B5eb0c',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x8d4Ce6785a7c4D063d7E6Fe9a2Ca375263D7b7eF',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xAEc809557Cf6cb2409F402933582aB7E99533086',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x65D3373e2Bd823B7ddA5794b32Fb5b41D97da8D0',
      ended: true,
      index: 0,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x554AF11c6C9B16132C0A524495080814FE04b478',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x451bd5921e381BFd56D5786C51F46fD49F1eB574',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xDdF1Fb44d0e8db1139138bd8c4f82FF474361744',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x6d8B49a865258CC53DbbAB698c362FcAd6B3FEFA',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x6cbdcfD243FDFd740d173B321420579026Be9742',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xF20a06123a465440263F20Aeef04930eCee8b520',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x5776d886459d7f202545d50377673077F27419b5',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x58D1FD497B2FcfA64C862986bCf45d6A7Cfaa6F3',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x58196ED395e8EA60DF69e87655385AAB5B123AAB',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x304ec0c4C85E08308Bc52362801c8AAE5cbb0Abf',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x843Db20345080d718e660bB99613f50D60092a65',
      ended: true,
      index: 2,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, OM],
      stakingRewardAddress: '0x6eaaF92aaA842e88a9F6A9345aA8c3e7B1D0B52e',
      ended: true,
      index: 1,
      name: '',
      lp: ''
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xF3331039E0090616D440798EcFcCF83552aDbc7A',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xF8930990505F0d2404f61778D6eC49f95A87dd6f',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x51C8ed98427ED9984836bC4a5371DA24573333c1',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xB72Ed7502150B922667Fd512b82Dc2a62999ab93',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x8B0c71AF620850D32546ba5862995Be07633D9E2',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x7EF2510AAf83E286886b8A1D4BE0b88099308CF0',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xf3bc3ECb14831F36B8dfE67abC51eB23B31839D1',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0xA937169A29b9858fFD98521CEA3023D2e565A987',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x0D1c1cb65893219aD54D3Fe95C9c06f306D2341d',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x78B2455b4cAa92c4a3678D7bFE1BfD18bA3D647c',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xDD86a8516188010A1301Ac79CE8A1D04fEC602a3',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0x8A121aECBFFa81A9d4B1eeA6290F20C4487d990D
    },



    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x92eB672C46ba00CE303878B56A5a6288058954bb',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x1F92A2bd44C52cc94Aa111Ba7557c0FA10bBF428',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0xa4D93BbE0E0C75F94859e1bD0bB2AF7226Af1aF4',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0x3EA879F7fa2285Fde5676E464483dBcC502961eA',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x1b295617072f5065b5112e3aE39420933c985dDF',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0xFc62e4c7f6FeE3d2D70221A1BdB9335aDbf4700e',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x124837e8585b7f2CdF9D0eA643F428696bB4491C',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x398822B15d412344387B8CCF82453A25187203f3',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xb879f4663C0df1a0e735ccA7F723b44a7c0D54e3',
      ended: true,
      index: 2
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x1bdAf7D03e83580ccAc8c0403212e78FFf69c538',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0xE8aF51444824b23d71987166b3ECa9d4C28eA4A6
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xFF448d419D52B56aF7c7D78cB504C5da76Ba2D29',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0xb99d3f2e5eDA2081fB2A70038589566D33c149c3',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x05748fD0d03780637A85dF5B2293ce857C1Fa309',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0x8dbf46c0f6Db05383Dc870036ad0F7619F7BDc3a',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0xf0f22765B9ea540929c7eC9BBCF7077C9f8E3117',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x73c601264d64d0DCbCa47ddef2dFC97E363E88a4',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x46385DF67DF1A058d0C07420e4B7D9c3a40eACE8',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [IGG, USDC],
      stakingRewardAddress: '0x6d48CeD6521B55F64Bdb5FbFe27e0A19Fb46F1C8',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0x9Ad3a1B339A796A5D373f4ec7BD8eC865f1ea5aC',
      ended: true,
      index: 3
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x5d445F4EDdCaee519F51Bb9AB7fEE0A74c8F37C1',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x122cfEd20D7C812cbcEC5538BB8DE3e46c94BEf6
    },


    {
      tokens: [QUICK, DAI],
      stakingRewardAddress: '0xcd7A989C8a21871ff9Da645F74916e23b7b83601',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x7341554a23A89a97186f339597AE365bBB0c4a26',
      ended: true,
      index: 5
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x7d59413E87dA59552a662103782CcA860Dc3d3c4',
      ended: true,
      index: 5
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xf91056D1A58a38A783a4F6122A1F995EEE4f60B3',
      ended: true,
      index: 5
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [ETHER, DAI],
      stakingRewardAddress: '0x88d4D1a7A0E917DB41De09A1AcA437726c1C418a',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },
    {
      tokens: [EASY, UNITOKEN],
      stakingRewardAddress: '0xfbEed0206635479BD2Ac204F793BF10E7EEad9df',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x17D0a95553625CfF6A7320c69aD0060969331e39
    },


    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x0cc1c20c8A5640aeFdD41b2aa3E8Dc2c2EdcDDbD',
      ended: true,
      index: 6
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xE769875f9F0e38b15c9f409F08B583f00d2B14d3',
      ended: true,
      index: 4
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eUSDC, UNITOKEN],
      stakingRewardAddress: '0x1D43445c82795E4Cc8eF7C3cd735a10C112332A7',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eUSDT, UNITOKEN],
      stakingRewardAddress: '0xD929bbbd983b334D9D638DeC49DF454c3Ee720d9',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [eDAI, UNITOKEN],
      stakingRewardAddress: '0xFA190551895cc065EE48E2E36c7cd0F2ae01AED2',
      ended: true,
      index: 0
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x457d88690e0B543445e69c03b5a760b38Ce07078',
      ended: true,
      index: 6
      //STAKINGREWARDSFACTORY- 0x80F13018Eb0CbD2579924Eb8039C5d36E467EB49
    }*/
    
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

  index: Number

  name: string

  lp: string
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
              ? false
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
          index: info[index].index,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
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
  const stakingInfos = useStakingInfo()

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
