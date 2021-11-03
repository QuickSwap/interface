import React, { useState, useEffect } from 'react'
import { JSBI , TokenAmount } from '@uniswap/sdk'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_DUAL_REWARDS_INFO, useDualStakingInfo, DualStakingInfo } from '../../state/stake/hooks'
import { TYPE } from '../../theme'
import DualPoolCard from '../../components/dualEarn/DualPoolCard'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { useUSDCPrices } from '../../utils/useUSDCPrice'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { EMPTY } from '../../constants'
import { usePairs } from '../../data/Reserves'
import { useTotalSupplys } from '../../data/TotalSupply'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2em;
  margin-bottom: 2em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.primary1};
  padding: 0 20px;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`
const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: none;
`};
`
export const SearchInput = styled.input`
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: calc(100% - 228px);
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.primary1};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

export default function Earn() {

  // pagination
  const [page, setPage] = useState(1)
  
  // const [searchedPools, setPools] = useState<StakingInfo[]>([]);
  // const [ empty, setEmpty ] = useState(true);
    const[totalFee, setTotalFee] = useState<any>(0);
  const[totalRewardsUSD, setTotalRewardsUSD] = useState<any>(0);

  const { chainId } = useActiveWeb3React()
  const stakingInfos = useDualStakingInfo()
  const [pools] = useState<DualStakingInfo[]>(stakingInfos);
  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  var poolsToShow = stakingInfos

  useEffect(() => {

    if(stakingInfos.length > 0) {
      
      var atotalFee:any = 0;
      var aTotalRewardsA:any = 0;
      var aTotalRewardsB:any = 0;

      if (stakingInfos?.length === 1) {
        atotalFee = stakingInfos[0].oneDayFee;
        aTotalRewardsA = stakingInfos[0].rateA;
        aTotalRewardsB = stakingInfos[0].rateB;
      }
      else {
        atotalFee = stakingInfos?.reduce((sum, current, currentIndex)=>{
          if(currentIndex === 1)
            //@ts-ignore
            return sum.oneDayFee + current.oneDayFee;
    
          else
            //@ts-ignore
            return sum + (current.oneDayFee ? current.oneDayFee : 0);
        })

        aTotalRewardsA = stakingInfos?.reduce((sum, current, currentIndex)=>{
          if(currentIndex === 1)
            //@ts-ignore
            return sum.rateA + current.rateA;
    
          else
            //@ts-ignore
            return sum + current.rateA
        })


        aTotalRewardsB = stakingInfos?.reduce((sum, current, currentIndex)=>{
          if(currentIndex === 1)
            //@ts-ignore
            return sum.rateB + current.rateB;
    
          else
            //@ts-ignore
            return sum + current.rateB
        })
      }

      atotalFee = parseInt(atotalFee.toFixed(0)).toLocaleString();
      setTotalFee(atotalFee)
      if(aTotalRewardsA > 0) {
        //@ts-ignore
        var atotalRewardsUSD: any = (stakingInfos[0].quickPrice * aTotalRewardsA) + (stakingInfos[0].maticPrice * aTotalRewardsB);
        atotalRewardsUSD = parseInt(atotalRewardsUSD.toFixed(0)).toLocaleString();
        setTotalRewardsUSD(atotalRewardsUSD);
      }
    }
    
    
    },[stakingInfos]
  )

  // if (!empty) {
  //   poolsToShow = searchedPools;
  // }

  //@ts-ignore
  const maxPage = poolsToShow.length <= 10 ? 1 : Math.ceil(poolsToShow.length / 10);
  const ITEMS_PER_PAGE = 10;

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_DUAL_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  poolsToShow?.sort((a,b) => {
    if(Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
      return 1;
    }
    if(!Boolean(a.stakedAmount.greaterThan('0')) && Boolean(b.stakedAmount.greaterThan('0'))) {
      return 1;
    }
    if(Boolean(a.stakedAmount.greaterThan('0')) && !Boolean(b.stakedAmount.greaterThan('0'))) {
      return -1;
    }
    else {
      return 1;
    }
  })

  const filteredPools = poolsToShow.filter(stakingInfo => {
    const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))
    return isStaking || !stakingInfo.ended
  })

  const baseCurrencies = filteredPools.map(stakingInfo => {
    const token0 = stakingInfo.tokens[0]
    const baseTokenCurrency = unwrappedToken(stakingInfo.baseToken)
    const empty = unwrappedToken(EMPTY)
    return baseTokenCurrency === empty ? token0: stakingInfo.baseToken
  })

  const tokenPairs = usePairs(filteredPools.map(stakingInfo => stakingInfo.tokens))

  const usdPrices = useUSDCPrices(baseCurrencies)

  const totalSupplys = useTotalSupplys(filteredPools.map(stakingInfo => stakingInfo.stakedAmount.token))

  const poolsWithData = filteredPools.map((stakingInfo, index) => {
    const token0 = stakingInfo.tokens[0]

    const baseTokenCurrency = unwrappedToken(stakingInfo.baseToken);
    const empty = unwrappedToken(EMPTY);

    const baseToken = baseTokenCurrency === empty ? token0: stakingInfo.baseToken;
    
    const totalSupplyOfStakingToken = totalSupplys[index]
    const [, stakingTokenPair] = tokenPairs[index]

    // let returnOverMonth: Percent = new Percent('0')
    let valueOfTotalStakedAmountInBaseToken: TokenAmount | undefined
    if (totalSupplyOfStakingToken && stakingTokenPair) {
      // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
      valueOfTotalStakedAmountInBaseToken = new TokenAmount(
        baseToken,
        JSBI.divide(
          JSBI.multiply(
            JSBI.multiply(stakingInfo.totalStakedAmount.raw, stakingTokenPair.reserveOf(baseToken).raw),
            JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
          ),
          totalSupplyOfStakingToken.raw
        )
      )
    }

    // get the USD value of staked WETH
    const USDPrice = usdPrices[index]
    const valueOfTotalStakedAmountInUSDC =
      valueOfTotalStakedAmountInBaseToken && USDPrice?.quote(valueOfTotalStakedAmountInBaseToken)
    const depositValue1 = valueOfTotalStakedAmountInUSDC || valueOfTotalStakedAmountInBaseToken
    const depositValue = depositValue1 ? Number(depositValue1.toSignificant()) : 0
    
    //@ts-ignore
    const perMonthReturnInRewards: any = (stakingInfo?.rate * stakingInfo?.quickPrice * 30) / Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6));
    
    let apyWithFee: any = 0;

    if(stakingInfo?.oneYearFeeAPY && stakingInfo?.oneYearFeeAPY > 0) {
      //@ts-ignore
      apyWithFee = ((1 + ((perMonthReturnInRewards + stakingInfo.oneYearFeeAPY / 12) * 12) / 12) ** 12 - 1) * 100 // compounding monthly APY
    }

    return { ...stakingInfo, apyWithFee, depositValue }
  })

  let refinedPools = poolsWithData

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Quickswap DUAL liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive QUICK and MATIC.
                </TYPE.white>
                
              </RowBetween>{' '}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Countdown exactEnd={pools?.[pools.length - 1]?.periodFinish} />
        </DataRow>
        <TopSection gap="md">
        <DataCard>
        <CardNoise />
        <StatContainer>
        <RowBetween style={{marginTop: "10px"}}>
          <TYPE.white> Total Rewards</TYPE.white>
          <TYPE.white>
            ${totalRewardsUSD} / day
          </TYPE.white>
        </RowBetween>

        {totalFee !== 0 && (
          <RowBetween style={{marginTop: "10px"}}>
          <TYPE.white> Fees (24hr)</TYPE.white>
          <TYPE.white>
            ${totalFee}
          </TYPE.white>
        </RowBetween>
        )}
      </StatContainer>
          </DataCard>
          </TopSection>
        <PoolSection>
        {/* {stakingRewardsExist && oldStakingInfos?.length === 0 ? (
            <div />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            oldStakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} isOld={false}/>
            })
          )}    */}

          {stakingRewardsExist && refinedPools?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            refinedPools?.slice(
              page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
              (page * ITEMS_PER_PAGE) < poolsToShow.length ? (page * ITEMS_PER_PAGE): poolsToShow.length  
            ).map(stakingInfo => {
              // need to sort by added liquidity here
              return <DualPoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} isOld={false}/>
            })
          )}
          <PageButtons>
        <div
          onClick={(e) => {
            setPage(page === 1 ? page : page - 1)
          }}
        >
          <Arrow>←</Arrow>
        </div>
        <TYPE.body>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
        <div
          onClick={(e) => {
            setPage(page === maxPage ? page : page + 1)
          }}
        >
          <Arrow>→</Arrow>
        </div>
      </PageButtons>
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
