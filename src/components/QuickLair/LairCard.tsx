import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE,StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { ButtonPrimary } from '../Button'
import { LairInfo } from '../../state/stake/hooks'
import { useColor } from '../../hooks/useColor'
import {  CardNoise, CardBGImage } from './styled'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { QUICK, DQUICK } from "../../constants/index";

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
export default function LairCard({ lairInfo }: { lairInfo: LairInfo }) {
  

  const currency0 = unwrappedToken(QUICK)
  const currency1 = unwrappedToken(DQUICK)
  const backgroundColor = useColor(QUICK)
  var show = true;


  return (
    show ?
    <Wrapper showBackground={true} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={24} />
        <TYPE.white fontWeight={600} fontSize={24} style={{ marginLeft: '8px' }}>
          QUICK-dQUICK
          
        </TYPE.white>
        <StyledInternalLink to={`/dquick`} style={{ width: '100%' }}>
            <ButtonPrimary padding="8px" borderRadius="8px">
              Manage
            </ButtonPrimary>
          </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white> Total QUICK</TYPE.white>
          <TYPE.white>
            { lairInfo ? lairInfo.totalQuickBalance.toFixed(2, {groupSeparator: ','}): 0 }
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> dQUICK Rate </TYPE.white>
          <TYPE.white>{`${lairInfo.QUICKtodQUICK
            ?.toFixed(4, { groupSeparator: ',' })} dQUICK / QUICK`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> QUICK Rate </TYPE.white>
          <TYPE.white>{`${lairInfo.dQUICKtoQUICK
            ?.toFixed(4, { groupSeparator: ',' })} QUICK / dQUICK`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white>Your dQUICK Balance </TYPE.white>
          <TYPE.white>{`${lairInfo.dQUICKBalance
            ?.toFixed(2, { groupSeparator: ',' })}`}</TYPE.white>
        </RowBetween>
      </StatContainer>
    </Wrapper> : <span style={{width: 0, display: "none"}}></span>
  )
}
