import { ChainId, TokenAmount } from '@uniswap/sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { isMobile, isAndroid, isIOS } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state/index'

// @ts-ignore
import transakSDK from '@transak/transak-sdk'
//import { useTransactionAdder } from '../../state/transactions/hooks'

import styled from 'styled-components'
import { addPopup } from '../../state/application/actions'

import Logo from '../../assets/images/QuickSwap_logo.png';
import LogoMobile from '../../assets/images/logo_circle.png';
//import LogoDark from '../../assets/svg/logo_white.svg'
import { useActiveWeb3React } from '../../hooks'
//import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregateUniBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink, LinkStyledButton } from '../../theme'

import { YellowCard } from '../Card'
import Settings from '../Settings'
//import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import usePrevious from '../../hooks/usePrevious'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding: 1rem 0 1rem 1rem;
  justify-content: flex-end;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #0A1647 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledLinkStyledButton = styled(LinkStyledButton).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const NETWORK_LABELS: { [chainId in ChainId]: string | undefined } = {
  
  [ChainId.MUMBAI]: 'Mumbai',
  [ChainId.MATIC]: 'Polygon'
}

export default function Header() {

  const dispatch = useDispatch<AppDispatch>()
  const initiateTransak = (account: any) => {
    
    
    let transak = new transakSDK({
      apiKey: '258960cf-1e17-4419-bf7f-77443282f5da',  // Your API Key
      environment: 'PRODUCTION', // STAGING/PRODUCTION
      defaultCryptoCurrency: 'MATIC',
      disablePaymentMethods: 'credit_debit_card',
      walletAddress: account, // Your customer's wallet address
      themeColor: '2891f9', // App theme color
      redirectURL: 'window.location.origin',
      hostURL: window.location.origin,
      widgetHeight: mobile? '450px' : '600px',
      widgetWidth: mobile? '360px': '450px',
      networks: 'matic'
    });
    
    transak.init();
    
    // To get all the events
    transak.on(transak.TRANSAK_ORDER_FAILED, (data:any) => {
      dispatch(addPopup(
        { key: 'abc', content: { txn: { hash: '', summary: 'Buy order failed', success: false } } }
      ))
      console.log(data)
    });
    
    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData:any) => {
      dispatch(addPopup(
        { key: 'abc', content: { txn: { hash: '', summary: 'Buy '+ orderData.status.cryptoAmount +' '+orderData.status.cryptocurrency+ ' for ' +orderData.status.fiatAmount+ ' ' +orderData.status.fiatCurrency, success: true } } }
      ))
      console.log(orderData);
      transak.close();
    });
  }
  
  const { account, chainId } = useActiveWeb3React()

  /**const ClaimMatic = async(address: string) => {
    const response = await fetch("https://api.easyfi.network/api/claimAllowance?ureq=1608049206867", {
      headers: {
        'Content-Type': 'application/json',
        'address': address
      }
      
    });
    var r = await response.json();
    if(r.success) {
      toast.info("Claim Successful. Please refresh page in couple of minutes");
    }
    else {
      toast.dark(r.message);
    }
    
}*/
  
  const { t } = useTranslation()

  const mobile = isMobile || isAndroid || isIOS;

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  //const [isDark] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  return (
    <HeaderFrame>
      
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href="." >
          <UniIcon>
            {mobile ? (
              <img width={'50px'} src={ LogoMobile } alt="logo" />
            ) : (
              <img width={'150px'} src={ Logo } alt="logo" />
            )}
            
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'} style={{marginLeft: mobile?'12px':'12px', marginRight: mobile?'px':'12px'}}>
            {t('swap')}
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            style={{marginLeft: mobile?'0px':'12px'}}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('pool')}
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`} to={'/quick'} style={{marginLeft: mobile?'0px':'12px'}}>
          Rewards
          </StyledNavLink>
          {/*<StyledNavLink id={`stake-nav-link`} to={'/vote'}>*/}
            {/*Vote*/}
          {/*</StyledNavLink>*/}
          <StyledExternalLink id={`stake-nav-link`} href={'https://info.quickswap.exchange'} style={{marginLeft: mobile?'0px':'12px', marginRight: mobile?'0px':'12px'}}>
            Charts {!mobile && <span style={{ fontSize: '11px' }}>↗</span>}
          </StyledExternalLink>

          {account && <StyledLinkStyledButton id={`stake-nav-link`} onClick={()=>{initiateTransak(account)}} style={{marginLeft: mobile?'0px':'12px', marginRight: mobile?'4px':'12px'}}>
            Buy
          </StyledLinkStyledButton>}

          <StyledExternalLink id={`startido-nav-link`} href={'https://idos.starter.xyz/quickstart'} style={{marginLeft: mobile?'12px':'12px', marginRight: mobile?'4px':'12px'}}>
            IDO {!mobile && <span style={{ fontSize: '11px' }}>↗</span>}
          </StyledExternalLink>
          
          
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
              
            )}
          </HideSmall>
          <HideSmall>
            <StyledExternalLink id={`stake-nav-link`} href={'https://wallet.matic.network/'} style={{marginLeft: mobile?'0px':'12px', marginRight: mobile?'0px':'12px'}}>
                Bridge Assets {!mobile && <span style={{ fontSize: '11px' }}>↗</span>}
              </StyledExternalLink>
          </HideSmall>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? <Dots>Claiming QUICK</Dots> : 'Claim QUICK'}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          {!availableClaim && aggregateBalance && (
            <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                QUICK
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}

          
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && Number(userEthBalance?.toSignificant(4)) > 0 ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} MATIC
              </BalanceText>
            ) : null}
            {/**account && Number(userEthBalance?.toSignificant(4)) === 0 ? (
              <BalanceText onClick ={ () => ClaimMatic(account)} style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                CLAIM MATIC
              </BalanceText>
            ) : null*/}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          {/*<Menu />*/}
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
