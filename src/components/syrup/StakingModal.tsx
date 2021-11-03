import React, { useState, useCallback } from 'react'
import useTransactionDeadline from '../../hooks/useTransactionDeadline'
import Modal from '../Modal'
import { AutoColumn } from '../Column'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE, CloseIcon } from '../../theme'
import { ButtonConfirmed, ButtonError } from '../Button'
import ProgressCircles from '../ProgressSteps'
import CurrencyInputPanel from '../CurrencyInputPanel'
import { TokenAmount } from '@uniswap/sdk'
import { useActiveWeb3React } from '../../hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { useStakingContract } from '../../hooks/useContract'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { SyrupInfo, useDerivedSyrupInfo } from '../../state/stake/hooks'
import { wrappedCurrencyAmount } from '../../utils/wrappedCurrency'
import { TransactionResponse } from '@ethersproject/providers'
import { useTransactionAdder, useTransactionFinalizer } from '../../state/transactions/hooks'
import { LoadingView, SubmittedView } from '../ModalViews'

const HypotheticalRewardRate = styled.div<{ dim: boolean }>`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  padding-left: 20px;

  opacity: ${({ dim }) => (dim ? 0.5 : 1)};
`

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
  padding: 1rem;
`

interface StakingModalProps {
  isOpen: boolean
  onDismiss: () => void
  syrupInfo: SyrupInfo
  userLiquidityUnstaked: TokenAmount | undefined
}

export default function StakingModal({ isOpen, onDismiss, syrupInfo, userLiquidityUnstaked }: StakingModalProps) {
  const { chainId, library } = useActiveWeb3React()

  // track and parse user input
  const [typedValue, setTypedValue] = useState('')
  const { parsedAmount, error } = useDerivedSyrupInfo(typedValue, syrupInfo.stakedAmount.token, userLiquidityUnstaked)
  const parsedAmountWrapped = wrappedCurrencyAmount(parsedAmount, chainId)

  let hypotheticalRewardRate: TokenAmount = new TokenAmount(syrupInfo.rewardRate.token, '0')
  if (parsedAmountWrapped?.greaterThan('0')) {
    hypotheticalRewardRate = syrupInfo.getHypotheticalRewardRate(
      syrupInfo.stakedAmount.add(parsedAmountWrapped),
      syrupInfo.totalStakedAmount.add(parsedAmountWrapped),
      syrupInfo.totalRewardRate
    )
  }

  // state for pending and submitted txn views
  const addTransaction = useTransactionAdder()
  const finalizedTransaction = useTransactionFinalizer()
  const [attempting, setAttempting] = useState<boolean>(false)
  const [hash, setHash] = useState<string | undefined>()
  const wrappedOnDismiss = useCallback(() => {
    setHash(undefined)
    setAttempting(false)
    onDismiss()
  }, [onDismiss])

  // pair contract for this token to be staked

  // approval data for stake
  const deadline = useTransactionDeadline()
  const [signatureData, setSignatureData] = useState<{ v: number; r: string; s: string; deadline: number } | null>(null)
  const [approval, approveCallback] = useApproveCallback(parsedAmount, syrupInfo.stakingRewardAddress)

  const stakingContract = useStakingContract(syrupInfo.stakingRewardAddress)
  async function onStake() {
    setAttempting(true)
    if (stakingContract && parsedAmount && deadline) {
      if (approval === ApprovalState.APPROVED) {
        stakingContract.stake(
          `0x${parsedAmount.raw.toString(16)}`, { gasLimit: 350000 }
        ).then(async(response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Deposit dQUICK`
          })
          setHash(response.hash)
          const receipt = await response.wait();
          finalizedTransaction(receipt,{
            summary: `Deposit dQUICK`
          })
        })
        .catch((error: any) => {
          setAttempting(false)
          console.log(error)
        })
      } else if (signatureData) {
        stakingContract
          .stakeWithPermit(
            `0x${parsedAmount.raw.toString(16)}`,
            signatureData.deadline,
            signatureData.v,
            signatureData.r,
            signatureData.s,
            { gasLimit: 350000 }
          )
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              summary: `Deposit liquidity`
            })
            setHash(response.hash)
            
          })
          .catch((error: any) => {
            setAttempting(false)
            console.log(error)
          })
      } else {
        setAttempting(false)
        throw new Error('Attempting to stake without approval or a signature. Please contact support.')
      }
    }
  }

  // wrapped onUserInput to clear signatures
  const onUserInput = useCallback((typedValue: string) => {
    setSignatureData(null)
    setTypedValue(typedValue)
  }, [])

  // used for max input button
  const maxAmountInput = maxAmountSpend(userLiquidityUnstaked)
  const atMaxAmount = Boolean(maxAmountInput && parsedAmount?.equalTo(maxAmountInput))
  const handleMax = useCallback(() => {
    maxAmountInput && onUserInput(maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  async function onAttemptToApprove() {
    if ( !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmount
    if (!liquidityAmount) throw new Error('missing liquidity amount')
    return approveCallback()
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      {!attempting && !hash && (
        <ContentWrapper gap="lg">
          <RowBetween>
            <TYPE.mediumHeader>Deposit</TYPE.mediumHeader>
            <CloseIcon onClick={wrappedOnDismiss} />
          </RowBetween>
          <CurrencyInputPanel
            value={typedValue}
            onUserInput={onUserInput}
            onMax={handleMax}
            showMaxButton={!atMaxAmount}
            currency={syrupInfo.stakedAmount.token}
            label={''}
            disableCurrencySelect={true}
            customBalanceText={'Available to deposit: '}
            id="stake-liquidity-token"
          />

          <HypotheticalRewardRate dim={!hypotheticalRewardRate.greaterThan('0')}>
            <div>
              <TYPE.black fontWeight={600}>Daily Rewards</TYPE.black>
            </div>

            <TYPE.black>
              {hypotheticalRewardRate.multiply((60 * 60 * 24).toString()).toSignificant(4, { groupSeparator: ',' })}{' '}
              {(syrupInfo.token?.symbol ? syrupInfo.token?.symbol: '')} / day
            </TYPE.black>
          </HypotheticalRewardRate>

          <RowBetween>
            <ButtonConfirmed
              mr="0.5rem"
              onClick={onAttemptToApprove}
              confirmed={approval === ApprovalState.APPROVED || signatureData !== null}
              disabled={approval !== ApprovalState.NOT_APPROVED || signatureData !== null}
            >
              Approve
            </ButtonConfirmed>
            <ButtonError
              disabled={!!error || (approval !== ApprovalState.APPROVED)}
              error={!!error && !!parsedAmount}
              onClick={onStake}
            >
              {error ?? 'Deposit'}
            </ButtonError>
          </RowBetween>
          <ProgressCircles steps={[approval === ApprovalState.APPROVED || signatureData !== null]} disabled={true} />
        </ContentWrapper>
      )}
      {attempting && !hash && (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Depositing tokens</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{parsedAmount?.toSignificant(4)} dQUICK</TYPE.body>
          </AutoColumn>
        </LoadingView>
      )}
      {attempting && hash && (
        <SubmittedView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Transaction Submitted</TYPE.largeHeader>
            <TYPE.body fontSize={20}>Deposited {parsedAmount?.toSignificant(4)} dQUICK</TYPE.body>
          </AutoColumn>
        </SubmittedView>
      )}
    </Modal>
  )
}
