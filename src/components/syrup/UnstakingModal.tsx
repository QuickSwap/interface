import React, { useState } from 'react'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonError } from '../Button'
import { SyrupInfo } from '../../state/stake/hooks'
import { useStakingContract } from '../../hooks/useContract'
import { SubmittedView, LoadingView } from '../ModalViews'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder } from '../../state/transactions/hooks'
import FormattedCurrencyAmount from '../FormattedCurrencyAmount'
import { useActiveWeb3React } from '../../hooks'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  syrupInfo: SyrupInfo
}

export default function UnstakingModal({ isOpen, onDismiss, syrupInfo }: StakingModalProps) {
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

  const stakingContract = useStakingContract(syrupInfo.stakingRewardAddress)

  async function onWithdraw() {
    if (stakingContract && syrupInfo?.stakedAmount) {
      setAttempting(true)
      await stakingContract
        .exit({ gasLimit: 300000 })
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
  if (!syrupInfo?.stakedAmount) {
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
          {syrupInfo?.stakedAmount && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={syrupInfo.stakedAmount} />}
              </TYPE.body>
              <TYPE.body>Deposited dQUICK:</TYPE.body>
            </AutoColumn>
          )}
          {syrupInfo?.earnedAmount && (
            <AutoColumn justify="center" gap="md">
              <TYPE.body fontWeight={600} fontSize={36}>
                {<FormattedCurrencyAmount currencyAmount={syrupInfo?.earnedAmount} />}
              </TYPE.body>
              <TYPE.body>Unclaimed {syrupInfo?.token.symbol}</TYPE.body>
            </AutoColumn>
          )}
          <TYPE.subHeader style={{ textAlign: 'center' }}>
            When you withdraw, your {syrupInfo?.token.symbol} is claimed and your dQUICK is removed from the syrup pool.
          </TYPE.subHeader>
          <ButtonError disabled={!!error} error={!!error && !!syrupInfo?.stakedAmount} onClick={onWithdraw}>
            {error ?? 'Withdraw & Claim'}
          </ButtonError>
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOndismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>Withdrawing {syrupInfo?.stakedAmount?.toSignificant(4)} dQUICK</TYPE.body>
            <TYPE.body fontSize={20}>Claiming {syrupInfo?.earnedAmount?.toSignificant(4)} {syrupInfo?.token.symbol}</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {hash && (
        <SubmittedView onDismiss={wrappedOndismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Withdrew dQUICK!</TYPE.body>
            <TYPE.body fontSize={20}>Claimed {syrupInfo?.token.symbol}!</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
