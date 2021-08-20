import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { StyledInternalLink, TYPE } from '../../theme'
import CurrencyLogo from '../CurrencyLogo'
import { SyrupInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
import {QUICK} from "../../constants/index";
import { currencyId } from '../../utils/currencyId'
import { ButtonPrimary } from '../Button'
import { useState } from 'react'


const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

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

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `};
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const dQUICKAPR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

function thousands_separators(num:any)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts[0]
  }

export default function SyrupCard({ syrupInfo, isOld }: { syrupInfo: SyrupInfo, isOld: Boolean}) {
  const token0 = syrupInfo.token;

  const currency0 = unwrappedToken(token0)
  const baseTokenCurrency = unwrappedToken(syrupInfo.baseToken);

  const isStaking = Boolean(syrupInfo.stakedAmount.greaterThan('0'))
  
  const backgroundColor = useColor(token0)

  const [, stakingTokenPair] = usePair(currency0, baseTokenCurrency);

  const price = stakingTokenPair?.priceOf(token0);

  const USDPriceBaseToken = useUSDCPrice(syrupInfo.baseToken);

  //@ts-ignore
  const priceOfRewardTokenInUSD = price?.toSignificant(6) * USDPriceBaseToken?.toSignificant(6);

  var show = isStaking || !syrupInfo.ended;

  const USDPrice = useUSDCPrice(QUICK)

  //@ts-ignore
  const valueOfTotalStakedAmountInUSDC = syrupInfo.totalStakedAmount.toSignificant(6) * syrupInfo.dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)
  
  //let apy = 0;
  let rewards = 0;
  //apy = ((1 + ((perMonthReturnInRewards) * 12) / 12) ** 12 - 1) * 100 // compounding monthly dQUICKAPY
  //apy = perMonthReturnInRewards/Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6)) * 100;

  //@ts-ignore
  rewards = syrupInfo?.rate * (priceOfRewardTokenInUSD ? priceOfRewardTokenInUSD : 0);

  /**if(syrupInfo?.oneYearFeeAPY && syrupInfo?.oneYearFeeAPY > 0) {
    //@ts-ignore
    apyWithFee = ((1 + ((perMonthReturnInRewards + syrupInfo.oneYearFeeAPY / 12) * 12) / 12) ** 12 - 1) * 100 // compounding monthly dQUICKAPY
    if(apyWithFee > 100000000) {
      apyWithFee = ">100000000"
    }
    else {
      apyWithFee = parseFloat(apyWithFee.toFixed(2)).toLocaleString()
    }
    //@ts-ignore
    //apyWithFee = ((syrupInfo.oneYearFeeAPY) + perMonthReturnInRewards)/Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6)) * 100;
  }*/

  const [time] = useState(() => Math.floor(Date.now() / 1000))

  //@ts-ignore
  const exactEnd = syrupInfo?.periodFinish;

  //@ts-ignore
  var timeRemaining = exactEnd - time

  const days = (timeRemaining - (timeRemaining % DAY)) / DAY
  timeRemaining -= days * DAY
  const hours = (timeRemaining - (timeRemaining % HOUR)) / HOUR
  timeRemaining -= hours * HOUR
  const minutes = (timeRemaining - (timeRemaining % MINUTE)) / MINUTE

  //@ts-ignore
  const dQUICKAPR =(((syrupInfo.oneDayVol * 0.04 * 0.01) / syrupInfo.dQuickTotalSupply.toSignificant(6)) * 365) / (syrupInfo.dQUICKtoQUICK.toSignificant(6) * syrupInfo.quickPrice);
  
  let dQUICKAPY: any = dQUICKAPR ? Math.pow(1 + dQUICKAPR / 365, 365) - 1 : 0;

  //@ts-ignore
  dQUICKAPY = parseFloat(dQUICKAPY).toFixed(4) * 100
  
  let tokenAPR: any = 0;

  if (valueOfTotalStakedAmountInUSDC > 0) {
    
    tokenAPR = (rewards / valueOfTotalStakedAmountInUSDC) * 365 * 100
    tokenAPR = parseFloat(tokenAPR).toFixed(3);

  }

  return (
    show ?
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <CurrencyLogo currency={currency0}/>
        <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '2px' }}>
          {syrupInfo.name && syrupInfo.name !== '' ? syrupInfo.name : (currency0.symbol)}
          
        </TYPE.white>
        {isOld ? (
          <StyledInternalLink to={`/syrup-archive/${currencyId(currency0)}/${syrupInfo.stakingRewardAddress}`} style={{ width: '100%' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
        ) : (
          <StyledInternalLink to={`/syrup/${currencyId(currency0)}/${syrupInfo.stakingRewardAddress}`} style={{ width: '100%' }}>
            <ButtonPrimary padding="8px" borderRadius="8px">
              {isStaking ? 'Manage' : 'Deposit'}
            </ButtonPrimary>
          </StyledInternalLink>
        ) }
        
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> dQUICK Deposits</TYPE.white>
          <TYPE.white>
            {valueOfTotalStakedAmountInUSDC
              ? `$${thousands_separators(valueOfTotalStakedAmountInUSDC)}`
              : `${syrupInfo?.totalStakedAmount?.toSignificant(6, { groupSeparator: ',' }) ?? '-'} dQUICK`}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Token Rewards </TYPE.white>
          <TYPE.white>{`${syrupInfo?.rate + " "+ currency0.symbol}  / day`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Token Rewards Value </TYPE.white>
          <TYPE.white>{`$${ parseInt(rewards.
            toFixed(0)).toLocaleString()} / day`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> {currency0.symbol} APR </TYPE.white>
          <TYPE.white>{tokenAPR} %</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> dQUICK APY </TYPE.white>
          <TYPE.white>{dQUICKAPY} %</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Time remaining </TYPE.white>
          <TYPE.white>{Number.isFinite(timeRemaining) && (
            <code>
              {`${days}:${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`}
            </code>
          )}</TYPE.white>
        </RowBetween>
        {/**<RowBetween>
          <TYPE.white> Rewards dQUICKAPY </TYPE.white>
          <TYPE.white>{`${apy.toFixed(2)} %`}</TYPE.white>
        </RowBetween>*/}
        
        {/**<RowBetween>
          <TYPE.white> Status </TYPE.white>
          <TYPE.white>{!syrupInfo.ended ? 'Running':'Closed'}</TYPE.white>
        </RowBetween>*/}
        {/**<RowBetween>
          <TYPE.white> dQUICKAPR </TYPE.white>
          <TYPE.white>{ap + "%"}</TYPE.white>
        </RowBetween>*/}
      </StatContainer>

      {isStaking && !syrupInfo.ended && (
        <>
          <Break />
          <BottomSection showBackground={true}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>Your rate</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
              <span role="img" aria-label="wizard-icon" style={{ marginRight: '0.5rem' }}>
                ⚡
              </span>
              {`${syrupInfo.rewardRate
                ?.multiply(`${60 * 60 * 24}`)
                ?.toSignificant(4, { groupSeparator: ',' })+' '+currency0?.symbol} / day`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper> : <span style={{width: 0, display: "none"}}></span>
  )
}
