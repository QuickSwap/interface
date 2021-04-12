import React, { useState } from 'react'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonError } from '../Button'
import { LairInfo } from '../../state/stake/hooks'
import { useLairContract } from '../../hooks/useContract'
import { SubmittedView, LoadingView } from '../ModalViews'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import FormattedCurrencyAmount from '../FormattedCurrencyAmount'
import { useActiveWeb3React } from '../../hooks'

import Web3 from "web3";

const web3 = new Web3();

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  lairInfo: LairInfo
}

export default function UnstakingModal({ isOpen, onDismiss, lairInfo }: StakingModalProps) {
  const { account } = useActiveWeb3React()

  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)

  function wrappedOndismiss() {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }

  const lairContract = useLairContract();

  async function onWithdraw() {
    if (lairContract && lairInfo?.dQUICKBalance) {
      setAttempting(true)
      var balanceString = lairInfo?.dQUICKBalance?.toSignificant(4);
      var balance = web3.utils.toWei(balanceString, 'ether');
      await lairContract
        .leave( balance.toString() ,{ gasLimit: 300000 })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Withdraw deposited liquidity`
          })
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          console.log(error)
        })
    }
  }

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!lairInfo?.dQUICKBalance) {
    error = error ?? 'Enter an amount'
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOndismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Withdraw</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOndismiss} />
          </RowBetween>
          {lairInfo?.dQUICKBalance && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={lairInfo?.dQUICKBalance} />}
              </TYPE.body>
              <TYPE.body>dQUICK</TYPE.body>
            </AutoColumn>
          )}
          {lairInfo?.QUICKBalance && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={lairInfo?.QUICKBalance} />}
              </TYPE.body>
              <TYPE.body>Available QUICK</TYPE.body>
            </AutoColumn>
          )}
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            When you withdraw, your QUICK is claimed and your dQUICK tokens are burned.
          </TYPE.subHeader>
          <ButtonError disabled={!!error} error={!!error && !!lairInfo?.dQUICKBalance} onClick={onWithdraw}>
            {error ?? 'Withdraw & Claim'}
          </ButtonError>
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOndismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>Withdrawing {lairInfo?.dQUICKBalance?.toSignificant(4)} dQUICK</TYPE.body>
            <TYPE.body fontSize={20}>Claiming {lairInfo?.QUICKBalance?.toSignificant(4)} QUICK</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && (
        <SubmittedView onDismiss={wrappedOndismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Withdrew QUICK!</TYPE.body>
            
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
