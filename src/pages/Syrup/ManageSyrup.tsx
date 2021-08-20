import React, { useCallback, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { JSBI } from '@uniswap/sdk'
import { RouteComponentProps } from 'react-router-dom'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/syrup/styled'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import StakingModal from '../../components/syrup/StakingModal'
import { useSyrupInfo } from '../../state/stake/hooks'
import UnstakingModal from '../../components/syrup/UnstakingModal'
import ClaimRewardModal from '../../components/syrup/ClaimRewardModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useColor } from '../../hooks/useColor'
import { CountUp } from 'use-count-up'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import usePrevious from '../../hooks/usePrevious'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { BIG_INT_ZERO, QUICK } from '../../constants'
import CurrencyLogo from '../../components/CurrencyLogo'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

const StyledDataCard = styled(DataCard)<{ bgColor?: any; showBackground?: any }>`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #1e1a31 0%, #3d51a5 100%);
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%,  ${showBackground ? theme.black : theme.bg5} 100%) `};
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const PoolData = styled(DataCard)`
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`

const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

function thousands_separators(num:any){
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts[0]
}

export default function ManageSyrup({
  match: {
    params: { currencyIdA, rewardsAddress }
  }
}: RouteComponentProps<{ currencyIdA: string; rewardsAddress: string }>) {
  const { account, chainId } = useActiveWeb3React()

  // get currencies and pair
  const currency = useCurrency(currencyIdA)
  const tokenA = wrappedCurrency(currency ?? undefined, chainId)

  const syrupInfos = useSyrupInfo(tokenA)
  
  let syrupInfo = syrupInfos?.reduce<any>((memo, staking) => {
      if(staking.stakingRewardAddress.toLowerCase() === rewardsAddress.toLowerCase()) {
          return staking;
      }
      else {
        return memo;
      }
      
  }, []);

  if(syrupInfo.length == 0) {
    syrupInfo = undefined;
  }

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(account ?? undefined, syrupInfo?.stakedAmount?.token)

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)
  const showAddLiquidityButton = Boolean(syrupInfo?.stakedAmount?.equalTo('0') && userLiquidityUnstaked?.equalTo('0'))

  // fade cards if nothing staked or nothing earned yet
  const disableTop = !syrupInfo?.stakedAmount || syrupInfo.stakedAmount.equalTo(JSBI.BigInt(0))
  
  const backgroundColor = useColor(tokenA)

  // get WETH value of staked LP tokens  
  const countUpAmount = syrupInfo?.earnedAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'
  /**var stakedToken:any = 0;
  if(syrupInfo && syrupInfo.totalStakedAmount){
    let stakedToken09 = JSBI.toNumber(syrupInfo.totalStakedAmount.raw);
    stakedToken09 = Number(stakedToken09)/ Math.pow(10, 18);
    stakedToken = Number(stakedToken09).toFixed(5);
  }*/
  
  
  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(QUICK)
  //@ts-ignore
  const valueOfTotalStakedAmountInUSDC = syrupInfo?.totalStakedAmount.toSignificant(6) * syrupInfo?.dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)
  
  //@ts-ignore
  const valueOfMyStakedAmountInUSDC = syrupInfo?.stakedAmount.toSignificant(6) * syrupInfo?.dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)
  

  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  return (
    <PageWrapper gap="lg" justify="center">
      <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
        {syrupInfo?.name && syrupInfo?.name !== '' ? syrupInfo?.name : ((currency?.symbol ? currency?.symbol : ''))} Syrup
        </TYPE.mediumHeader>
        <CurrencyLogo currency={currency ?? undefined} />
      </RowBetween>

      <DataRow style={{ gap: '24px' }}>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Total deposits</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
            {valueOfTotalStakedAmountInUSDC
                ? `$${thousands_separators(valueOfTotalStakedAmountInUSDC)}`
                : `${syrupInfo?.totalStakedAmount?.toSignificant(6, { groupSeparator: ',' }) ?? '-'} dQUICK`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Pool Rate</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {syrupInfo?.totalRewardRate
                ?.toFixed(2, { groupSeparator: ',' })?.replace(/[.,]00$/, "") ?? '-'}
              {' ' + (currency?.symbol ? currency?.symbol: '')+' / day'}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
      </DataRow>

      {showAddLiquidityButton && (
        <VoteCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
              <TYPE.white fontWeight={600}>Please get dQUICK tokens to participate</TYPE.white>
              </RowBetween>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </VoteCard>
      )}

      {syrupInfo && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            syrupInfo={syrupInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <UnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            syrupInfo={syrupInfo}
          />
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
            syrupInfo={syrupInfo}
          />
        </>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledDataCard disabled={disableTop} bgColor={backgroundColor} showBackground={!showAddLiquidityButton}>
            <CardSection>
              <CardBGImage desaturate />
              <CardNoise />
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white fontWeight={600}>Your deposits</TYPE.white>
                </RowBetween>
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.white fontSize={36} fontWeight={600}>
                  {valueOfMyStakedAmountInUSDC
                ? `$${thousands_separators(valueOfMyStakedAmountInUSDC)}`
                : `${syrupInfo?.stakedAmount?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}`}
                  </TYPE.white>
                  <TYPE.white>
                    dQUICK
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard dim={syrupInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}>
            <CardBGImage desaturate />
            <CardNoise />
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>Your unclaimed {(currency?.symbol ? currency?.symbol: '')}</TYPE.black>
                </div>
                {syrupInfo?.earnedAmount && JSBI.notEqual(BIG_INT_ZERO, syrupInfo?.earnedAmount?.raw) && (
                  <ButtonEmpty
                    padding="8px"
                    borderRadius="8px"
                    width="fit-content"
                    onClick={() => setShowClaimRewardModal(true)}
                  >
                    Claim
                  </ButtonEmpty>
                )}
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
                { !syrupInfo?.ended &&
                <TYPE.black fontSize={16} fontWeight={500}>
                  <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px ' }}>
                    ⚡
                  </span>
                  {syrupInfo?.rewardRate
                    ?.multiply((60 * 60 * 24).toString())
                    ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}
                  {' ' + (currency?.symbol ? currency?.symbol: '') +' / day'}
                </TYPE.black>
              }
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>
        <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
          <span role="img" aria-label="wizard-icon" style={{ marginRight: '8px' }}>
            ⭐️
          </span>
          When you withdraw, the contract will automagically claim {(currency?.symbol ? currency?.symbol: '')} on your behalf!
        </TYPE.main>
        <TYPE.main style={{ textAlign: 'center', marginTop: -12}} fontSize={14}>
          * Incentivised rewards are not an endorsement and you are strongly encouraged to DYOR when providing liquidity.
        </TYPE.main>

        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: '1rem' }}>
            { !syrupInfo?.ended && 
            <ButtonPrimary padding="8px" borderRadius="8px" width="160px" onClick={handleDepositClick}>
              {syrupInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) ? 'Deposit' : syrupInfo  && syrupInfo?.name !== '' ? 'Deposit ' + syrupInfo?.name + " Tokens": 'Deposit dQUICK'}
            </ButtonPrimary>
            } 

            {syrupInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonPrimary>
              </>
            )}
          </DataRow>
        )}
        {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo('0') ? null : (
          <TYPE.main>{userLiquidityUnstaked.toSignificant(6)} {syrupInfo?.name  !== '' ? syrupInfo?.name : 'dQUICK'} tokens available</TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  )
}
