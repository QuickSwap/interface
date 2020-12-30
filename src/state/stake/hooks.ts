import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@uniswap/sdk'
import { useMemo } from 'react'
import { UNI, EASY, USDC, ETHER, eUSDC, eUSDT, eDAI, UNITOKEN, QUICK, DAI, IGG, WBTC, USDT, MATIC, OM } from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const STAKING_GENESIS = 1609516800;

export const REWARDS_DURATION_DAYS = 14;

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    index: Number
  }[]
} = {
  [ChainId.MATIC]: [//TODO: MATIC

    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0xD9298cBea9d1C2f134c1a70D25071DD143E00F3C',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x9A3EC4Ba0f979A889575754D8A1237804670a18d',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x1975075a30Ef629A5BD480D8098EC2544010f8B9',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xa135E326a3C8bc76DECa64e6ff05c98bA1F7600e',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x3B46d756c9963555454B70B4F04141605D0d2001',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x4c7026015f187F263b5FfAd194935372FbA07ba3',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0xc959b7ED5cfDdF7787793ee2D73f3b6576B5eb0c',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x8d4Ce6785a7c4D063d7E6Fe9a2Ca375263D7b7eF',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [EASY, USDC],
      stakingRewardAddress: '0xAEc809557Cf6cb2409F402933582aB7E99533086',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x65D3373e2Bd823B7ddA5794b32Fb5b41D97da8D0',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0x554AF11c6C9B16132C0A524495080814FE04b478',
      ended: false,
      index: 0
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },


    {
      tokens: [QUICK, UNITOKEN],
      stakingRewardAddress: '0x451bd5921e381BFd56D5786C51F46fD49F1eB574',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [UNITOKEN, USDC],
      stakingRewardAddress: '0xDdF1Fb44d0e8db1139138bd8c4f82FF474361744',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, ETHER],
      stakingRewardAddress: '0x6d8B49a865258CC53DbbAB698c362FcAd6B3FEFA',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [QUICK, USDC],
      stakingRewardAddress: '0x6cbdcfD243FDFd740d173B321420579026Be9742',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: '0xF20a06123a465440263F20Aeef04930eCee8b520',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [MATIC, ETHER],
      stakingRewardAddress: '0x5776d886459d7f202545d50377673077F27419b5',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [WBTC, USDC],
      stakingRewardAddress: '0x58D1FD497B2FcfA64C862986bCf45d6A7Cfaa6F3',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDT, USDC],
      stakingRewardAddress: '0x58196ED395e8EA60DF69e87655385AAB5B123AAB',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [ETHER, USDC],
      stakingRewardAddress: '0x304ec0c4C85E08308Bc52362801c8AAE5cbb0Abf',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, DAI],
      stakingRewardAddress: '0x843Db20345080d718e660bB99613f50D60092a65',
      ended: true,
      index: 1
      //STAKINGREWARDSFACTORY- 0xEbA9170fd5c04452Ebd40276515803687fF64162
    },
    {
      tokens: [USDC, OM],
      stakingRewardAddress: '0x6eaaF92aaA842e88a9F6A9345aA8c3e7B1D0B52e',
      ended: true,
      index: 0
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

  index: Number
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

        const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
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
