import React from 'react'
import { GelatoLimitOrderPanel, GelatoLimitOrdersHistoryPanel } from '@gelatonetwork/limit-orders-react'
import { TYPE } from '../../theme'

export default function LimitOrder() {
  return (
    <>
      <GelatoLimitOrderPanel />
      <GelatoLimitOrdersHistoryPanel />
      <TYPE.main style={{ textAlign: 'center', marginTop: 20, maxWidth: 600}} fontSize={16}>
      <p><b>* Disclaimer:</b> Limit Orders on QuickSwap are provided by Gelato, a 3rd party protocol and should be considered in beta. DYOR and use at your own risk. QuickSwap is not responsible. More info can be found <a target="_blank" href="https://www.certik.org/projects/gelato">here.</a></p>
        </TYPE.main>
    </>
  )
}
