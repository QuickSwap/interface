import React from 'react'
import { GelatoLimitOrderPanel, GelatoLimitOrdersHistoryPanel } from '@gelatonetwork/limit-orders-react'
import { TYPE } from '../../theme'

export default function LimitOrder() {
  return (
    <>
      <GelatoLimitOrderPanel />
      <GelatoLimitOrdersHistoryPanel />
      <TYPE.main style={{ textAlign: 'center', marginTop: 20}} fontSize={16}>
          Disclaimer: Limit orders are powered by Gelato, a third party service. Please use it at your own risk.
        </TYPE.main>
    </>
  )
}
