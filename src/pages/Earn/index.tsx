import React, {  RefObject, useState, useCallback, useRef, useEffect } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo, useOldStakingInfo, useLairInfo, StakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink} from '../../theme'
import { isMobile } from 'react-device-detect'
import PoolCard from '../../components/earn/PoolCard'
import LairCard from '../../components/QuickLair/LairCard'

import { RowBetween } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'

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
  width: 100%;
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
`


export default function Earn() {

  // pagination
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  const [searchedPools, setPools] = useState<StakingInfo[]>([]);
  const [ empty, setEmpty ] = useState(true);
  
  const[totalRewards, setTotalRewards] = useState<any>(0);
  const[totalFee, setTotalFee] = useState<any>(0);
  const[totalRewardsUSD, setTotalRewardsUSD] = useState<any>(0);

  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()
  const [pools] = useState<StakingInfo[]>(stakingInfos);
  const lairInfo = useLairInfo();
  const oldStakingInfos = useOldStakingInfo();
  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  var poolsToShow = stakingInfos;

  useEffect(() => {

    if(stakingInfos.length > 0) {

     var aTotalRewards:any = stakingInfos?.reduce((sum, current, currentIndex)=>{
        if(currentIndex === 1)
          //@ts-ignore
          return sum.rate + current.rate;
  
        else
          //@ts-ignore
          return sum + current.rate
      })

      setTotalRewards(aTotalRewards);
  
      var atotalFee: any = stakingInfos?.reduce((sum, current, currentIndex)=>{
        if(currentIndex === 1)
          //@ts-ignore
          return sum.oneDayFee + current.oneDayFee;
  
        else
          //@ts-ignore
          return sum + (current.oneDayFee ? current.oneDayFee : 0);
      })
  
      atotalFee = parseInt(atotalFee.toFixed(0)).toLocaleString();
      setTotalFee(atotalFee)
      if(totalRewards > 0) {
        //@ts-ignore
        var atotalRewardsUSD: any = stakingInfos[0].quickPrice * totalRewards;
        atotalRewardsUSD = parseInt(atotalRewardsUSD.toFixed(0)).toLocaleString();
        setTotalRewardsUSD(atotalRewardsUSD);
      }
    }
    
    
    },[stakingInfos]
  )

  
  const inputRef = useRef<HTMLInputElement>()

  if (!empty) {
    poolsToShow = searchedPools;
  }

  //@ts-ignore
  const maxPage = poolsToShow.length <= 10 ? 1 : Math.ceil(poolsToShow.length / 10);
  const ITEMS_PER_PAGE = 10;

  const handleInput = useCallback(event => {
    const input = event.target.value
    setSearchQuery(input)
    if (!input || input.trim() === '') {
      setPools([]);
      setEmpty(true);
      return;
    }
    var searchedPools:any[] = [];
    for(var i = 0; i < pools.length; i++) {
      if (
        pools[i].tokens[0].name?.toLowerCase().includes(input.toLowerCase()) || 
        pools[i].tokens[0].symbol?.toLowerCase().includes(input.toLowerCase()) ||
        pools[i].tokens[1].name?.toLowerCase().includes(input.toLowerCase()) ||
        pools[i].tokens[1].symbol?.toLowerCase().includes(input.toLowerCase())
      )
      {
        searchedPools.push(pools[i]);
      }
    }
    searchedPools?.sort((a,b) => {
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
    setPools(searchedPools);
    setEmpty(false);
  }, [])

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

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


  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Quickswap liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive QUICK, the Quickswap protocol governance token.
                </TYPE.white>
                
              </RowBetween>{' '}
              <RowBetween>
              <ExternalLink id={`old-pools-link`} href={'https://quickswap.exchange/#/archive'} style={{width: isMobile?'50%':'25%'}}>
              
                  <ButtonPrimary padding="8px" borderRadius="8px">
                    Archived Pools
                  </ButtonPrimary>
                  </ExternalLink>
              </RowBetween>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Dragon's Lair</TYPE.mediumHeader>
          
        </DataRow>

        <PoolSection>
        <LairCard lairInfo={lairInfo}/>
        </PoolSection>
      </AutoColumn>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Countdown exactEnd={pools?.[pools.length - 1]?.periodFinish} />
        </DataRow>
        <SearchInput
          type="text"
          id="pools-search-input"
          placeholder='Search name or symbol'
          value={searchQuery}
          ref={inputRef as RefObject<HTMLInputElement>}
          onChange={handleInput}
        />
        <TopSection gap="md">
        <DataCard>
        <CardNoise />
        <StatContainer>
        <RowBetween style={{marginTop: "10px"}}>
          <TYPE.white> Reward Rate</TYPE.white>
          <TYPE.white>
            {totalRewards.toFixed(0)} QUICK / day
          </TYPE.white>
        </RowBetween>
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
        {stakingRewardsExist && oldStakingInfos?.length === 0 ? (
            <div />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            oldStakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} isOld={false}/>
            })
          )}   

          {stakingRewardsExist && poolsToShow?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            poolsToShow?.slice(
              page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
              (page * ITEMS_PER_PAGE) < poolsToShow.length ? (page * ITEMS_PER_PAGE): poolsToShow.length  
            ).map(stakingInfo => {
              // need to sort by added liquidity here
              return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} isOld={false}/>
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
