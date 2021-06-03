import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { JSBI , TokenAmount } from '@uniswap/sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import { currencyId } from '../../utils/currencyId'
import { Break, CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'
import {EMPTY} from "../../constants/index";

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
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
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

export default function PoolCard({ stakingInfo, isOld }: { stakingInfo: StakingInfo, isOld: Boolean}) {
  const token0 = stakingInfo.tokens[0]
  const token1 = stakingInfo.tokens[1]

  const currency0 = unwrappedToken(token0)
  const currency1 = unwrappedToken(token1)
  const baseTokenCurrency = unwrappedToken(stakingInfo.baseToken);
  const empty = unwrappedToken(EMPTY);

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const baseToken = baseTokenCurrency === empty ? token0: stakingInfo.baseToken;
  const token = baseTokenCurrency === empty ? token1: baseTokenCurrency === currency0 ? token1: token0;
  
  const backgroundColor = useColor(token)

  const totalSupplyOfStakingToken = useTotalSupply(stakingInfo.stakedAmount.token)
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens)

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

  var show = isStaking || !stakingInfo.ended;

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(baseToken)
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInBaseToken && USDPrice?.quote(valueOfTotalStakedAmountInBaseToken)
  
  //@ts-ignore
  const perMonthReturnInRewards: any = (stakingInfo?.rate * stakingInfo?.quickPrice * 30) / Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6));
  

  //let apy = 0;
  let apyWithFee: any = 0;
  let rewards = 0;
  //apy = ((1 + ((perMonthReturnInRewards) * 12) / 12) ** 12 - 1) * 100 // compounding monthly APY
  //apy = perMonthReturnInRewards/Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6)) * 100;

  //@ts-ignore
  rewards = stakingInfo?.rate * stakingInfo?.quickPrice;

  if(stakingInfo?.oneYearFeeAPY && stakingInfo?.oneYearFeeAPY > 0) {
    //@ts-ignore
    apyWithFee = ((1 + ((perMonthReturnInRewards + stakingInfo.oneYearFeeAPY / 12) * 12) / 12) ** 12 - 1) * 100 // compounding monthly APY
    if(apyWithFee > 100000000) {
      apyWithFee = ">100000000"
    }
    else {
      apyWithFee = parseFloat(apyWithFee.toFixed(2)).toLocaleString()
    }
    //@ts-ignore
    //apyWithFee = ((stakingInfo.oneYearFeeAPY) + perMonthReturnInRewards)/Number(valueOfTotalStakedAmountInUSDC?.toSignificant(6)) * 100;
  }

  return (
    show ?
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '8px' }}>
          {stakingInfo.name && stakingInfo.name !== '' ? stakingInfo.name : (currency0.symbol + '-' + currency1.symbol)}
          
        </TYPE.white>
        {isOld ? (
          <StyledInternalLink to={`/archive/${currencyId(currency0)}/${currencyId(currency1)}/${stakingInfo.stakingRewardAddress}`} style={{ width: '100%' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
        ) : (
          <StyledInternalLink to={`/quick/${currencyId(currency0)}/${currencyId(currency1)}/${stakingInfo.stakingRewardAddress}`} style={{ width: '100%' }}>
            <ButtonPrimary padding="8px" borderRadius="8px">
              {isStaking ? 'Manage' : 'Deposit'}
            </ButtonPrimary>
          </StyledInternalLink>
        ) }
        
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> Total deposits</TYPE.white>
          <TYPE.white>
            {valueOfTotalStakedAmountInUSDC
              ? `$${valueOfTotalStakedAmountInUSDC.toFixed(0, { groupSeparator: ',' })}`
              : `${valueOfTotalStakedAmountInBaseToken?.toSignificant(4, { groupSeparator: ',' }) ?? '-'} ETH`}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Total Rewards </TYPE.white>
          <TYPE.white>{`$${ parseInt(rewards.
            toFixed(0)).toLocaleString()} / day`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Pool rate </TYPE.white>
          <TYPE.white>{`${stakingInfo.totalRewardRate
            ?.toFixed(2, { groupSeparator: ',' }).replace(/[.,]00$/, "")} QUICK / day`}</TYPE.white>
        </RowBetween>

        { 
          stakingInfo?.oneYearFeeAPY && stakingInfo?.oneYearFeeAPY > 0 && ( 
          <RowBetween>
          <TYPE.white> Fees (24hr) </TYPE.white>
          <TYPE.white>{`$${parseInt(stakingInfo?.oneDayFee.toFixed(0)).toLocaleString()}`}</TYPE.white>
        </RowBetween>)
        }
        
        { 
          stakingInfo?.oneYearFeeAPY && stakingInfo?.oneYearFeeAPY > 0 && ( 
          <RowBetween>
          <TYPE.white> Rewards + Fee APY </TYPE.white>
          <TYPE.white>{`${apyWithFee}%`}</TYPE.white>
        </RowBetween>)
        }
        {/**<RowBetween>
          <TYPE.white> Rewards APY </TYPE.white>
          <TYPE.white>{`${apy.toFixed(2)} %`}</TYPE.white>
        </RowBetween>*/}
        
        {/**<RowBetween>
          <TYPE.white> Status </TYPE.white>
          <TYPE.white>{!stakingInfo.ended ? 'Running':'Closed'}</TYPE.white>
        </RowBetween>*/}
        {/**<RowBetween>
          <TYPE.white> APR </TYPE.white>
          <TYPE.white>{ap + "%"}</TYPE.white>
        </RowBetween>*/}
      </StatContainer>

      {isStaking && !stakingInfo.ended && (
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
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24}`)
                ?.toSignificant(4, { groupSeparator: ',' })} QUICK / day`}
            </TYPE.black>
          </BottomSection>

          <BottomSection showBackground={true} style={{paddingTop: "0px"}}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>Your fees</span>
            </TYPE.black>

            <TYPE.black style={{ textAlign: 'right' }} color={'white'} fontWeight={500}>
              
              {`$${stakingInfo.accountFee.toFixed(6)} / day`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper> : <span style={{width: 0, display: "none"}}></span>
  )
}
