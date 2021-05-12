import React, { useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo, useOldStakingInfo, useLairInfo } from '../../state/stake/hooks'
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

export default function Earn() {

  // pagination
  const [page, setPage] = useState(1)
  const maxPage = 9;
  const ITEMS_PER_PAGE = 10;

  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()
  const lairInfo = useLairInfo();
  const oldStakingInfos = useOldStakingInfo();
  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  var totalRewards:any = 0;
  var totalFee:any = 0;
  var totalRewardsUSD: any = 0;

  if(stakingInfos.length>0) {
    totalRewards = stakingInfos?.reduce((sum, current, currentIndex)=>{
      if(currentIndex === 1)
        //@ts-ignore
        return sum.rate + current.rate;

      else
        //@ts-ignore
        return sum + current.rate
    })

    totalFee = stakingInfos?.reduce((sum, current, currentIndex)=>{
      if(currentIndex === 1)
        //@ts-ignore
        return sum.oneDayFee + current.oneDayFee;

      else
        //@ts-ignore
        return sum + (current.oneDayFee ? current.oneDayFee : 0);
    })
  }
  
  if(totalRewards > 0) {
    //@ts-ignore
    totalRewardsUSD = stakingInfos[0].quickPrice * totalRewards;
  }

  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  stakingInfos?.sort((a,b) => {
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
              {/*<ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://uniswap.org/blog/uni/"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about QUICK</TYPE.white>
              </ExternalLink>*/}
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
          <Countdown exactEnd={stakingInfos?.[stakingInfos.length - 1]?.periodFinish} />
        </DataRow>
        
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
            ${totalRewardsUSD.toFixed(0)} / day
          </TYPE.white>
        </RowBetween>

        {totalFee > 0 && (
          <RowBetween style={{marginTop: "10px"}}>
          <TYPE.white> Total Fees</TYPE.white>
          <TYPE.white>
            ${totalFee.toFixed(0)} / day
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

          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            stakingInfos?.slice(
              page === 1 ? 0 : (page - 1) * ITEMS_PER_PAGE,
              (page * ITEMS_PER_PAGE) < stakingInfos.length ? (page * ITEMS_PER_PAGE): stakingInfos.length  
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
