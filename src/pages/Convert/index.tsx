import React, { useCallback, useContext, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { AutoRow, RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import StakeUpdater from '../../state/stake/updater'
import { ArrowWrapper, BottomGrouping, Wrapper } from '../../components/swap/styleds'
import { CONVERTER_ADDRESS, QUICK, QUICKNEW } from '../../constants'
import { ArrowDown } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { ButtonConfirmed, ButtonLight } from '../../components/Button'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useDerivedConversionInfo } from '../../state/stake/hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useConverterContract } from '../../hooks/useContract'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
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



export default function Convert() {  
  const [typedValue, setTypedValue] = useState('')
  const [newQuickValue, setNewQuickValue] = useState('')
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const { ethereum } = window;
  const userBalance = useTokenBalance(account ?? undefined, QUICK)
  const { parsedAmount, } = useDerivedConversionInfo(typedValue, QUICK, userBalance)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, CONVERTER_ADDRESS)
  const converterContract = useConverterContract();
  const [attempting, setAttempting] = useState<boolean>(false)
  const toggleWalletModal = useWalletModalToggle()

    // wrapped onUserInput to clear signatures
    const onUserInput = useCallback((typedValue: string) => {
      setTypedValue(typedValue)

      //@ts-ignore
      setNewQuickValue(typedValue * 1000)
    }, [])

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `
  
  async function onAttemptToApprove() {
    if (!converterContract ) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmount
    if (!liquidityAmount) throw new Error('missing liquidity amount')
    return approveCallback()
  }

  async function onAttemptToConvert() {
    setAttempting(true)
    if (converterContract && parsedAmount) {
      if (approval === ApprovalState.APPROVED) {
      const tx = await converterContract.quickToQuickX(`0x${parsedAmount.raw.toString(16)}`, { gasLimit: 350000 })
      await tx.wait();
      setAttempting(false);
      } else {
        setAttempting(false)
        throw new Error('Attempting to convert without approval.')
      }
    }
  }

  const addMaticToMetamask = () => {
    if(ethereum) {
      // @ts-ignore
      ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          "chainId": "0x89",
          "chainName": "Polygon Mainnet",
          "rpcUrls": ["https://polygon-rpc.com/"],
          "iconUrls": [
            "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png"
          ],
          "blockExplorerUrls" :[
            "https://polygonscan.com/"
          ],
          "nativeCurrency": {
            "name": "Matic Token",
            "symbol": "MATIC",
            "decimals": 18
          }
        }], // you must have access to the specified account
      })
      .then((result:any) => {
      })
      .catch((error:any) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('We can encrypt anything without the key.');
        } else {
          console.error(error);
        }
      });
    }
    
  }
  return (
    <PageWrapper gap="lg" justify="center">
      <StakeUpdater />
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>Convert QUICK</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                Convert your QUICK(OLD) to QUICK(NEW)
                </TYPE.white>
              </RowBetween>{' '}
              <RowBetween>
                <TYPE.white fontSize={14}>
                Conversion Rate: 1 QUICK(OLD) = 1000 QUICK(NEW)
                </TYPE.white>
              </RowBetween>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>
      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Convert QUICK</TYPE.mediumHeader>
          
        </DataRow>

        <Wrapper id="convert-page">

          <AutoColumn gap={'md'}>
            <CurrencyInputPanel
              label={'From'}
              value={typedValue}
              showMaxButton={false}
              currency={QUICK}
              onUserInput={onUserInput}
              disableCurrencySelect={true}
              id="convert-input-QUICK"
            />
            <AutoColumn justify="space-between">
              <AutoRow justify={'center'} style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable={false}>
                  <ArrowDown
                    size="16"
                   
                    color={theme.primary1}
                  />
                </ArrowWrapper>

              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={newQuickValue}
              onUserInput={onUserInput}
              label={'To'}
              showMaxButton={false}
              currency={QUICKNEW}
              disableCurrencySelect={true}
              disabled={true}
              id="convert-input-QUICKNEW"
            />

          </AutoColumn>
          <BottomGrouping>
          {!account ? (
              <ButtonLight onClick={(ethereum && ethereum.isMetaMask && Number(ethereum.chainId) !== 137) ? addMaticToMetamask : toggleWalletModal}>{(ethereum && ethereum.isMetaMask && Number(ethereum?.chainId) !== 137)? 'Switch to Matic': 'Connect Wallet'}</ButtonLight>
            ) : (
              <RowBetween>
            <ButtonConfirmed
              mr="0.5rem"
              onClick={onAttemptToApprove}
              confirmed={approval === ApprovalState.APPROVED}
              disabled={approval !== ApprovalState.NOT_APPROVED}
            >
              Approve
            </ButtonConfirmed>
            <ButtonConfirmed
              mr="0.5rem"
              onClick={onAttemptToConvert}
              confirmed={false}
              disabled={attempting === true || approval !== ApprovalState.APPROVED}
            >
              {'Convert'}
            </ButtonConfirmed>
          </RowBetween>
            )
          }
          </BottomGrouping>
        </Wrapper>
      </AutoColumn>

      
    </PageWrapper>
  )
}
